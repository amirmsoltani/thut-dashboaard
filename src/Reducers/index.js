import {combineReducers} from 'redux';
import Primary,{primary} from "./PrimaryReducer";
import Posts,{posts} from "./PostsReducer";
import Term,{term} from "./TermReducer";
import File,{file} from "./FileReducer";
import Post,{post} from "./PostReducer";
export const initialState = {Primary:primary,Posts:posts,Term:term,File:file,Post:post};

const Reducer = combineReducers({
    Primary,
    Posts,
    Term,
    File,
    Post,

});

export default Reducer;