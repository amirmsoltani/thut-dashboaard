import {put,takeLatest} from 'redux-saga/effects';
import {POSTS_URL} from "../service.info";
import {GET_POSTS, SET_POSTS} from "../Actions";
import axios from 'axios';



function *GetPosts({page=1})
{
    try {
        const result = yield axios.get(POSTS_URL+"?page="+page);
        yield put({type:SET_POSTS,data:result.data,page:page})
    }
    catch (e) {
        console.log(e);
    }

}
export default takeLatest(GET_POSTS,GetPosts);