import React from 'react';
import {connect} from "react-redux";
import {LOGIN} from "../Actions";

function Login({dispatch}) {
    const submit = e => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        if(username!==""&&password!=="")
            dispatch({type:LOGIN,username,password});
    };
    return (
        <form className="login_box" onSubmit={submit}>
            <input type="text" placeholder="username" name="username"/>
            <input type="password" placeholder="password" name="password"/>
            <input type="submit" value="login"/>
        </form>
    )
}

export default connect()(Login)