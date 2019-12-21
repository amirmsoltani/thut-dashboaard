import React from 'react';
import {connect} from "react-redux";
import {POST_SET_DATA,SUBMIT_TAG} from "../../Actions";

function Tag({post,dispatch}) {
    const [rtl, setRtl] = React.useState(false);
    const submit = ()=>{
        dispatch({type:SUBMIT_TAG,tags:post.tag})
    };
    return (
        <fieldset className="meta_text">
            <legend>تگ نوشتاری <input type="button" value="rtl" onClick={() => setRtl(!rtl)}/></legend>
            <textarea defaultValue={post.tag} className={"meta_text-box" + (rtl ? " rtl" : "")}
                      placeholder="تگ نوشتاری برای علی کریمی"
                      onBlur={e=>dispatch({type:POST_SET_DATA,key:"tag",value:e.target.value})}
            />
            <input type="button" className="text_tag" onClick={submit} value="ثبت تگ ها"/>
        </fieldset>
    )
}

const mapStateToProps = state => ({post: state.Post});
export default connect(mapStateToProps)(Text);