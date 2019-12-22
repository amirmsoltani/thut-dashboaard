import React, {Component} from 'react';
import {connect} from 'react-redux';
import "../Assets/Css/imageManager.css"
import {GET_IMAGE, UPLOAD_IMAGE} from "../Actions";

class ImageManager extends Component {
    state = {add: false, description: "", file: {}};

    UNSAFE_componentWillMount() {
        if (this.props.image === undefined)
            this.props.dispatch({type: GET_IMAGE, search: ""});
    }

    render() {
        const {add, file, description} = this.state;
        if (this.props.image === undefined)
            return <div className="image_manager"/>;
        const {items} = this.props.image;
        return (
            <div className="image_manager">
                <input type="text" className="image_manager-search" placeholder="search"/>
                {add ?
                    <div className="image_manager-add">
                        <input type="text" placeholder="description"
                               onChange={e => this.setState({description: e.target.value})}/>
                        <input type="file"
                               onChange={e => this.setState({file: {value: e.target.value, file: e.target.files[0]}})}/>
                        <input type="button" value="submit"
                               onClick={() => this.props.dispatch({
                                   type: UPLOAD_IMAGE,
                                   image: {image: file.file, description}
                               }) && this.setState({file: {}, description: "", add: false})}/>
                        <input type="button" value="cancel"
                               onClick={() => this.setState({add: false, description: "", file: {}})}/>
                    </div> : ""

                }
                <ul className="image_manager-list">
                    {
                        items.map(i => (
                            <li className="image_manager-item" key={i.id}>
                                <img src={i.image} alt={i.description} className="manager-item-image"
                                     title={i.description}
                                />
                            </li>
                        ))
                    }
                    <li className="add_button" title="add image" onClick={() => this.setState({add: true})}>+</li>


                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => ({image: state.File.image});
export default connect(mapStateToProps)(ImageManager);