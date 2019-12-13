import React, {Component} from 'react';
import {connect} from 'react-redux';
import {GET_TAXONOMY, GET_TERM, TERM_ADD} from "../../Actions";

class TermControl extends Component {
    form = React.createRef();
    state = {search: ""};

    UNSAFE_componentWillMount() {
        if (this.props.terms.length === 0)
            this.props.dispatch({type: GET_TERM, search: ""})
    }

    search(e) {
        const search = e.target.value;
        const search_old = this.props.search;
        const count = this.props.count;
        if ((search_old.length <= search.length && count > 20) || search_old.length > search.length)
            this.props.dispatch({type: GET_TERM, search: search});
        this.setState({search})
    }

    add() {
        const name = this.form.current.getElementsByTagName("input")[0].value;
        const slug = this.form.current.getElementsByTagName("input")[1];
        const slug_value = slug.value;
        if (name === "" || slug_value === "") {
            alert("name and slug");
            return 0;
        }
        if (this.props.terms.find(item => item.name === name || slug_value === item.value)) {
            alert("name or slug exist");
            return 0
        }
        this.props.dispatch({type: TERM_ADD, name, slug: slug_value});
        slug.value = "";
    }



    render() {
        const {terms} = this.props;
        const {search} = this.state;
        return (
            <fieldset className="term_control">
                <legend>Term Control</legend>
                <form className="term_options" ref={this.form}>
                    <input type="text" name="name" placeholder="name , default field for search" className="term_name"
                           onChange={this.search.bind(this)}/>
                    <input type="slug" name="slug" placeholder="slug" className="term_slug"/>
                    <input type="button" value="+" className="term_add" title="add" onClick={this.add.bind(this)}/>
                </form>
                <ul className="term_items">
                    {terms.filter(i => (i.name.includes(search) || i.slug.includes(search))).map(item => (
                        <li key={item.slug} className="term_item">
                            <span>{item.name}</span>
                            <span>{item.slug}</span>
                            <div>
                                <input type="button" value="taxonomy"
                                       onClick={() => this.props.dispatch({id:item.id,type: GET_TAXONOMY})}/>
                                <input type="button" value="meta"/>
                                <input type="button" value="delete"/>
                            </div>
                        </li>))
                    }
                </ul>
            </fieldset>
        );
    }
}

const mapStateToProps = state => ({terms: state.Term.terms, search: state.Term.search, count: state.Term.count});
export default connect(mapStateToProps)(TermControl);