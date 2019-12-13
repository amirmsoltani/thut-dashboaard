import * as ac from "../Actions";
import {TERM_SELECT} from "../Actions";

export const term = {terms:[],taxonomy:[],meta:[],select:{},search:"",count:0};
const Term = (state = term, action) => {
    switch (action.type) {
        case ac.SET_TERM:
            return {...state,terms:action.terms,count:action.count,search:action.search};
        case ac.SET_TAXONOMY:
            return {...state,taxonomy:action.taxonomy};
        case ac.SET_TERM_META:
            return {...state,meta:action.meta};
        case TERM_SELECT:
            return {...state,select:action.select};
        case ac.SET_NEW_TERM:
            const new_state = {...state};
            new_state[action.term_type] = {items:action.items
                ,search:action.search,count:action.count};
            return new_state;
        default :
            return state;

    }
};

export default Term;