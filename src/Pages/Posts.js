import React, {Component} from 'react';
import {connect} from 'react-redux';
import "../Assets/Css/Posts.css";
import {GET_POSTS} from "../Actions";
import {ToJalali} from "../Components/Pserian";
import {Link} from 'react-router-dom';
import {types,status} from "../Lib/PostData";

class Posts extends Component {
    componentDidMount() {
        if(this.props.items.length===0)
            this.props.dispatch({type: GET_POSTS})
    }


    render() {
        return (
            <div className="posts">
                {
                    this.props.items.map(i =>
                        (<div className="post_item" key={i.id}>
                            <img src={i.Meta('thumbnail').file.image} alt={i.id} />
                            <i>{i.id}</i>
                            <b>{i.title}</b>
                            <i><ToJalali children={i.release}/></i>
                            <b>{types[i.type]}</b>
                            <b>{status[i.status]}</b>
                            <button>خذف</button>
                            <Link to={`/edit_${types[i.type]}/${i.id}/${i.title}`}>ویرایش</Link>
                        </div>)
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({items: state.Posts.items});
export default connect(mapStateToProps)(Posts);