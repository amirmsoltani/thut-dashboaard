import {put, takeLatest, select, fork, delay, call} from 'redux-saga/effects';
import axios from 'axios';
import {GET_FILES, SET_FILES, SET_STATE_FILE, POST_SET_META, SET_IMAGE} from "../Actions";
import {FILE_URL, PARSA_UPLOAD, DOMAIN, PARSA_REMOTE} from "../service.info";

const types = {'image': 1, 'video': 2, 'url': 3, 'file': 4, 'remote': 5};

function* GetFile(action) {
    try {
        const result = yield axios.get(FILE_URL + `?type=${types[action.key]}&search=${action.search}`);
        yield put({
            type: SET_FILES,
            key: action.key,
            count: result.data.count,
            search: action.search,
            items: result.data.results
        });
    } catch (e) {
        console.log(e);
    }

}

export default takeLatest(GET_FILES, GetFile);

export function* UploadFile(action) {
    const form = new FormData();
    form.append("file", action.file);
    form.append("domain", DOMAIN);

    const CancelToken = axios.CancelToken;
    const source = yield CancelToken.source();


    let percent = 0;
    const onchange = function* () {
        while (percent !== 100 && percent !== "cancel") {
            yield put({type: SET_STATE_FILE, url: action.url, percent: percent, cancel: source.cancel});
            yield delay(1000);
        }
    };


    yield fork(onchange);
    try {
        const token = yield select(state => state.Primary.parsa_token);
        const headers = {'Authorization': token, 'content-type': 'multipart/form-data;'};


        const progress = progressEvent => {
            percent = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
        };


        const result = yield axios.post(PARSA_UPLOAD, form, {
            headers: headers,
            onUploadProgress: progress,
            cancelToken: source.token
        });

        yield put({type: SET_STATE_FILE, url: action.url, percent: percent, link: result.data.downloadLink});
        yield call(CreateFile, {
                url: result.data.downloadLink,
                meta: action.meta,
                description: action.description,
                file_type: "remote"
            }
        );

    } catch (e) {
        if (axios.isCancel(e)) {
            percent = "cancel";
            yield put({type: SET_STATE_FILE, url: action.url, percent: percent});
        } else
            console.log(e);
    }
}

export function* Remote(action) {
    const form = new FormData();
    form.append("url", action.url);
    form.append("domain", DOMAIN);
    let file_name = action.url.split("/");
    if (file_name[file_name.length - 1] === "")
        file_name = file_name[file_name.length - 2];
    else file_name = file_name[file_name.length - 1];

    try {
        const token = yield select(state => state.Primary.parsa_token);
        const headers = {'Authorization': token, 'content-type': 'application/x-www-form-urlencoded'};
        yield axios.post(PARSA_REMOTE, form, {headers: headers});
        yield put({type: SET_STATE_FILE, url: action.url, percent: 100, link: `https://${DOMAIN}/${file_name}`});
        yield call(CreateFile, {
                url: `https://${DOMAIN}/${file_name}`,
                meta: action.meta,
                description: action.description,
                file_type: "remote"
            }
        );
    } catch (e) {
        console.log(e);
    }

}

export function* CreateFile(action) {
    const {description, url, meta, file_type} = action;
    const form = new FormData();
    form.append("url", url);
    form.append("description", description);
    form.append("type", types[file_type]);
    try {
        const result = yield  axios.post(FILE_URL, form);
        yield put({type: POST_SET_META, meta: {key: meta, value: description, file: result.data}, meta_type: "list"});
    } catch (e) {
        console.log(e);
    }
}

export function* GetImage(action) {
    try {
        const result = yield axios.get(FILE_URL + `?search=${action.search}&type=1`);
        yield put({
            type: SET_IMAGE,
            image: {count: result.data.count, items: result.data.results, search: action.search}
        });
    } catch (e) {
        console.log(e);
    }
}

export function* UploadImage(action) {
    const form = new FormData();
    form.append('image',action.image.image);
    form.append('description',action.image.description);
    form.append('type',1);
    try {
        const result = yield axios.post(FILE_URL,form);
        const {items,search,count} = yield select(state=>state.File.image);
        yield put({type:SET_IMAGE,image:{search,count,items:[...items,result.data]}}) ;
    } catch (e) {
        console.log(e);
    }
}