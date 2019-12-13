import {all, takeEvery,takeLatest} from 'redux-saga/effects';
import GetPosts from './Posts'
import {AddTerm, AddTermTaxonomy, DeleteTermTaxonomy, GetTaxonomy, GetTerm, GetTermTaxonomy,} from './Terms';
import GetFile, {UploadFile, Remote, CreateFile, GetImage, UploadImage} from './Files';
import {CreatePost,UpdatePost,GetPost} from "./Post";
import * as ac from "../Actions";
import {Login} from "./Primary";

function* Saga() {
    yield all([GetPosts, GetFile,
        takeEvery(ac.GET_NEW_TERM,GetTaxonomy),
        takeEvery(ac.UPLOAD_FILE, UploadFile),
        takeEvery(ac.REMOTE_FILE, Remote),
        takeEvery(ac.CREATE_FILE,CreateFile),
        takeLatest(ac.CREATE_POST,CreatePost),
        takeLatest(ac.UPDATE_POST,UpdatePost),
        takeLatest(ac.GET_POST,GetPost),
        takeLatest(ac.GET_TERM,GetTerm),
        takeLatest(ac.TERM_ADD,AddTerm),
        takeLatest(ac.GET_TAXONOMY,GetTermTaxonomy),
        takeLatest(ac.ADD_TAXONOMY,AddTermTaxonomy),
        takeLatest(ac.TAXONOMY_DELETE,DeleteTermTaxonomy),
        takeLatest(ac.GET_IMAGE,GetImage),
        takeLatest(ac.UPLOAD_IMAGE,UploadImage),
        takeLatest(ac.LOGIN,Login),
        ]);
}

export default Saga;