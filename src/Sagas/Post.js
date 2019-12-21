import {select, put, call} from "redux-saga/effects";
import axios from "axios";
import {POST_URL, POSTS_URL} from "../service.info";
import {SET_POST} from "../Actions";
import {types} from "../Lib/PostData";

export function* GetPost(action) {
    try {
        const result = yield axios.get(POST_URL + action.id + "/" + action.title);
        yield put({type: SET_POST, post: result.data});
    } catch (e) {
        yield console.log(e);
    }
}

export function* CreatePost(action) {
    const post = yield select(state => state.Post);
    const headers = {'Content-Type': 'application/json'};
    try {
        const form = post.getJson(action.post_type, action.status);
        const result = yield axios.post(POSTS_URL, form, {headers});
        yield call(GetPost, {id: result.data.id, title: result.data.title});
        yield action.his.push(`edit_${types[action.type]}/${result.data.id}/${result.data.title}`);
    } catch (e) {
        yield console.log(e);
    }
}

export function* UpdatePost(action) {
    const post = yield select(state => state.Post);
    const headers = {'Content-Type': 'application/json'};
    try {
        const form = post.getJson(action.post_type, action.status);
        yield axios.patch(POSTS_URL+post.id, form, {headers});
    } catch (e) {
        yield console.log(e);
    }
}