import {put, select, delay} from "redux-saga/effects";
import axios from 'axios';
import {SET_TERM, SET_NEW_TERM, SET_TAXONOMY, TERM_SELECT} from "../Actions";
import {TAXONOMY_URL, TERM_URL} from "../service.info";

export function* GetTaxonomy({term_type, search}) {
    try {
        const result = yield axios.get(TAXONOMY_URL + `?type=${term_type}&search=${search}`);
        yield put({type: SET_NEW_TERM, items: result.data.results, count: result.data.count, search, term_type});
    } catch (e) {
        console.log(e);
    }
}

export function* GetTerm(action) {
    try {
        delay(100);
        const result = yield axios.get(TERM_URL + "?search=" + action.search);
        const data = result.data;
        yield put({type: SET_TERM, count: data.count, terms: data.results, search: action.search});
    } catch (e) {
        console.log(e);
    }
}

export function* AddTerm(action) {
    const form = new FormData();
    form.append("name", action.name);
    form.append("slug", action.slug);
    try {
        const result = yield axios.post(TERM_URL, form);
        const {terms, count, search} = yield select(state => state.Term);
        yield put({type: SET_TERM, count, search, terms: [...terms, result.data]});
    } catch (e) {
        console.log(e);
    }
}

export function* GetTermTaxonomy(action) {
    try {
        const result = yield  axios.get(TERM_URL + action.id + `/taxonomy`);
        yield  put({type: SET_TAXONOMY, taxonomy: result.data.results});
        yield put({type: TERM_SELECT, select: {id: action.id, type: 'taxonomy'}});
    } catch (e) {
        console.log(e);
    }

}

export function* AddTermTaxonomy(action) {

    const id = yield select(state => state.Term.select.id);
    const form = {
        term: id,
        description: action.taxonomy.description,
        type: action.taxonomy.type,
        parent: action.taxonomy.parent
    };
    const headers = {'Content-Type': 'application/json'};
    try {
        const result = yield axios.post(TAXONOMY_URL, form, {headers});
        const taxonomy = yield select(state => state.Term.taxonomy);
        yield put({type: SET_TAXONOMY, taxonomy: [...taxonomy, result.data]})
    } catch (e) {
        console.log(e.text)
    }
}

export function* DeleteTermTaxonomy(action) {
    try {
        yield axios.delete(TAXONOMY_URL + action.id + "/");
        const taxonomy = [...yield select(state => state.Term.taxonomy)];
        taxonomy.find((i, index) => {
            if (i.id === action.id) {
                taxonomy.splice(index, 1);
                return true;
            }
            return false;
        });
        yield put({type:SET_TAXONOMY,taxonomy});

    } catch (e) {

    }
}