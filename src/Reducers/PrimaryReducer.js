import {SET_AUTH} from "../Actions";

export const primary = {
    nav: [{text: "پست ها", slug: "/posts"}, {text: "موزیک", slug: "/new_music"}, {text: "مقررات", slug: "/term"},{text: "عکس", slug: "/image"}],
    parsa_token: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1bmlxdWVfbmFtZSI6ImFtaXJzb2x0YW5pazc4QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdXNlcmRhdGEiOiIzMTI2NiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjIiLCJpc3MiOiJodHRwOi8vYXBpLnBhcnNhc3BhY2UuY29tLyIsImF1ZCI6IkFueSIsImV4cCI6MTYwNjU4NDQ4MywibmJmIjoxNTc1MDQ4NDgzfQ.vZiBn64QuW0GQyX6YMHbrJQ3gFIQlSjK5DrwCFNa0R4",
    auth:localStorage.getItem("Auth")
};
const Primary = (state = primary, action) => {
    if(action.type===SET_AUTH)
        return {...state,auth:action.auth};
    return state;
};

export default Primary;