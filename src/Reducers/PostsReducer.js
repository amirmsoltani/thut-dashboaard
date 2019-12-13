import {SET_POSTS} from "../Actions";
import {Post} from '../Lib/PoPaCo'

export const posts = {page: 1, items: []};
const Posts = (state = posts, action) => {
    switch (action.type) {
        case SET_POSTS:
            const items = [];
            action.data.results.forEach(i =>
                items.push(new Post(i))
            );
            return {...state, items, page: action.page,count:action.data.count};

        default :
            return state;

    }
};

export default Posts;