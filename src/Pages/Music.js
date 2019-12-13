import React, {Component} from 'react';
import {connect} from 'react-redux';
import "../Assets/Css/Music.css";
import {SelectTaxonomy} from "../Components/Term";
import {Image, File, Text} from '../Components/Meta';
import {POST_SET_DATA, CREATE_POST, UPDATE_POST, GET_POST, CLEAR_POST} from "../Actions";

class Music extends Component {
    setData(event) {
        const tar = event.target;
        this.props.dispatch({type: POST_SET_DATA, key: tar.name, value: tar.value});
    }

    submit(status) {
        if (this.props.match.path.includes("edit"))
            this.props.dispatch({type: UPDATE_POST, status, post_type: 5, his: this.props.history});
        else
            this.props.dispatch({type: CREATE_POST, status, post_type: 5, his: this.props.history});
    }



    UNSAFE_componentWillMount() {
        const {id, title} = this.props.match.params;
        if (id!== undefined && this.props.post.id !== id)
            this.props.dispatch({type: GET_POST, id, title});
        else if (this.props.post.id !== undefined && id === undefined)
            this.props.dispatch({type: CLEAR_POST});
    }



    render() {
        const post = this.props.post;
        if (this.props.match.params.id !== post.id)
            return (<></>);
        return (
            <div className="music">
                <form className="music_form">
                    <input placeholder="name" type="text" className="form-title" defaultValue={post.title}
                           onBlur={this.setData.bind(this)}
                           name="title"
                    />
                    <input placeholder="release" type="datetime-local" className="form-datetime"
                           defaultValue={post.release} onBlur={this.setData.bind(this)}
                           name="release"
                    />
                    <textarea placeholder="Describe yourself here..." rows="10" cols="2" defaultValue={post.context}
                              className="form-textarea" onBlur={this.setData.bind(this)}
                              name="context"
                    />
                    <SelectTaxonomy type="artist"/>
                    <SelectTaxonomy type="tag"/>
                    <Image type='thumbnail'/>
                    <Image type='slider_image'/>
                    <File type="download_link"/>
                    <Text type="persian_name" />
                    <Text type="poetry" />
                    <Text type="music" />
                    <Text type="arrangement" />
                    <Text type="description" />
                    <Text type="mix" />
                    {
                        this.props.match.path.includes("edit") ?
                            <input type="button" value="update" onClick={() => this.submit("1")}/> :
                            <input type="button" value="publish" onClick={() => this.submit("1")}/>
                    }
                    <input type="button" value="draft" onClick={() => this.submit("2")}/>
                </form>

            </div>
        );
    }
}

const mapPropsToState = state => ({post: state.Post});
export default connect(mapPropsToState)(Music);