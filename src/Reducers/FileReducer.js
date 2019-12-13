import {SET_FILES, SET_IMAGE, SET_STATE_FILE} from "../Actions";

export const file = {files: {}};
const File = (state = file, action) => {
    switch (action.type) {
        case SET_IMAGE:
            return {...state, image: action.image};
        case SET_FILES:
            const {key, search, items, count} = action;
            const new_state = {...state};
            new_state[key] = {items, search, count};
            return new_state;
        case SET_STATE_FILE:
            const new_file = {};
            new_file[action.url] = [action.percent, action.link, action.cancel];
            return {...state, files: {...state.files, ...new_file}};
        default :
            return state;

    }
};

export default File;