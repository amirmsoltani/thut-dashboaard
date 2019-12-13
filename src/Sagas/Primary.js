import {put} from "redux-saga/effects";
import axios from 'axios';
import {LOGIN_URL} from "../service.info";
import {SET_AUTH} from "../Actions";

export function *Login(action) {
    try
    {
        const result = yield axios.post(LOGIN_URL,{username:action.username,password:action.password});
        localStorage.setItem("Auth", result.data.token);
        yield put({type:SET_AUTH,auth:result.token});
    }catch (e) {
        console.log(e);
    }
}