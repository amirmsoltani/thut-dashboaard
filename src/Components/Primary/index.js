import {connect} from "react-redux";
import React from 'react';
import Header from './Header';
import "../../Assets/Css/Primary.css";
import axios from "axios";
import Login from "../Login";
function Primary({children,auth}) {
    if(auth===null)
        return <Login/>;
    axios.defaults.headers.common['Authorization'] ="JWT "+auth;
    return (<>
        <Header/>
        {children}
    </>)
}
const mapStateToProps= state=>({auth:state.Primary.auth});
export default connect(mapStateToProps)(Primary);