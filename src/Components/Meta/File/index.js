import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CREATE_FILE, REMOTE_FILE, UPLOAD_FILE} from "../../../Actions";
import List from "./List";
import Options from "./Options";
const types = {3:"url",4:"file",5:"remote"};
class File extends Component {

    form = React.createRef();

    constructor(props) {
        super(props);
        const meta = props.post.getMetaList(props.type);
        const options = meta.map(({file:{url,description,type}})=>({url,description,type:types[type]}));
        this.state = {
            option_type: "file",
            option_data: {},
            option_description: "",
            options
        };
    }

    options_clear() {
        this.setState({option_data: {}, option_description: {}});
        this.form.current.getElementsByTagName("input")[0].value = "";
        this.form.current.getElementsByTagName("textarea")[0].value = "";
    }

    optionAdd() {
        const {option_data, option_description, option_type, options} = this.state;

        if (option_type === "file")
            this.props.dispatch({
                type: UPLOAD_FILE,
                file: option_data.file,
                url: option_data.value,
                description: option_description,
                meta: this.props.type
            });
        else if (option_type === "remote")
            this.props.dispatch({
                type: REMOTE_FILE,
                url: option_data.value,
                description: option_description,
                meta: this.props.type
            });

        options.push({type: option_type, url: option_data.value, description: option_description});
        this.setState({options, option_data: {}});
        if (option_type === "url") {
            this.props.dispatch({
                type: CREATE_FILE,
                url: option_data.value,
                file_type: "url",
                meta: this.props.type,
                description: option_description
            });
        }
        this.options_clear();
    }


    render() {
        const {type} = this.props;
        const {option_type, options} = this.state;
        return (
            <fieldset className="meta_file">
                <legend>{type}</legend>
                <Options add={this.optionAdd.bind(this)} type={option_type}
                         change={(data) => this.setState(data)}
                         ref={this.form}
                />
                <List options={options}
                      change={(data) => this.setState(data)}/>

            </fieldset>
        );
    }
}

const mapPropToState = state => ({post: state.Post});
export default connect(mapPropToState)(File);