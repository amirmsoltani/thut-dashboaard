import React, {Component} from 'react';
import {connect} from "react-redux";
import {GET_FILES, POST_DELETE_META, POST_SET_META} from "../../Actions";

class Image extends Component {

    constructor(props) {
        super(props);
        const meta = props.post.Meta(this.props.type);
        this.state = {
            select: meta.file,
            description: meta.value,
            items: [],
            search: "",
            active: false,
        };
        if (props.image === undefined)
            props.dispatch({type: GET_FILES, key: 'image', search: ""});
    }





    select(item) {
        this.setState({active: false, select: item});
        this.props.dispatch({
            type: POST_SET_META,
            meta: {file: item, value: this.state.description, key: this.props.type}, meta_type: "text"
        });

    }

    changeSearch(e) {
        const value = e.target.value;
        if(this.props.image.count > 20 ||this.props.image.search.length>value.length)
            this.props.dispatch({type: GET_FILES, key: 'image', search: value});
        this.setState({search:value})
    }

    clear() {
        this.setState({select: {}, description: ""});
        this.props.dispatch({type: POST_DELETE_META, meta: {key: this.props.type}});
    }

    image = React.createRef();

    render() {
        const { select, description, active, search} = this.state;


        return (
            <fieldset className={"meta_image" + (active ? " meta_image-active" : "")}>

                <legend>
                    <>
                        {this.props.type}
                        <input className="images-close" title="close"
                               type="button"
                               onClick={() => this.setState({active: false})} value="X"/>
                    </>
                </legend>
                <input onChange={this.changeSearch.bind(this)} type="text" className="image-search"
                       placeholder="search"
                       onFocus={() => {
                           this.setState({active: true})
                       }}
                />
                {
                    select.image ? <>
                        <img src={select.image} alt={select.description} className="image-select"/>
                        <input type="text" defaultValue={description}
                               onChange={e => this.setState({description: e.target.value})}
                               className="image-description"
                               placeholder="description"
                               onBlur={() => this.select(select)}
                        />
                        <input type="button"
                               onClick={this.clear.bind(this)}
                               className="image-clear"
                               value="clear"
                        />
                    </> : ""
                }
                <div className="image-images">
                    {
                        this.props.image === undefined?"":
                        this.props.image.items.filter(i => i.description.includes(search)).map((item, index) => (
                            <img alt={item.description}
                                 src={item.image}
                                 key={index}
                                 className="image-image"
                                 onClick={() => this.select(item)}

                            />
                        ))
                    }
                </div>
            </fieldset>
        );
    }
}

const mapStateToProps = state => ({image: state.File.image, post: state.Post});
export default connect(mapStateToProps)(Image);