import  * as ac from "../Actions";
import * as PoPaCo from '../Lib/PoPaCo';
import {local_datetime} from "../Lib/PostData";

export const post = new PoPaCo.Post({release:local_datetime(new Date().toString())});
const Post = (state = post, action) => {
    let new_post = {};
    switch (action.type) {
        case ac.SET_POST:
            action.post.release = local_datetime(action.post.release);
            return new PoPaCo.Post(action.post);
        case ac.POST_SET_DATA:
            new_post = new PoPaCo.Post(state);
            new_post[action.key]=action.value;
            return new_post;
        case ac.POST_SET_META:
            new_post = new PoPaCo.Post(state);
            new_post.addMeta(action.meta,action.meta_type);
            return new_post;
        case ac.POST_SET_TERM:
            new_post = new PoPaCo.Post(state);
            new_post.addTerm(action.term,action.term_type);
            return new_post;
        case ac.POST_DELETE_META:
            new_post = new PoPaCo.Post(state);
            new_post.removeMeta(action.meta);
            return new_post;
        case ac.POST_DELETE_TERM:
            new_post = new PoPaCo.Post(state);
            new_post.removeTerm(action.term);
            return new_post;
        case ac.CLEAR_POST:
            return post;
        default :
            return state;

    }
};

export default Post;