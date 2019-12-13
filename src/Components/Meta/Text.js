import React from 'react';
import {connect} from "react-redux";
import {POST_SET_META} from "../../Actions";

function Text({type, post,dispatch}) {
    const [rtl, setRtl] = React.useState(false);
    return (
        <fieldset className="meta_text">
            <legend>{type} <input type="button" value="rtl" onClick={() => setRtl(!rtl)}/></legend>
            <textarea defaultValue={post.Meta(type).value} className={"meta_text-box" + (rtl ? " rtl" : "")}
                      placeholder={"enter" + type}
                      onBlur={e=>dispatch({type:POST_SET_META,meta:{key:type,value:e.target.value},meta_type:'text'})}
            />
        </fieldset>
    )
}

const mapStateToProps = state => ({post: state.Post});
export default connect(mapStateToProps)(Text);