import React, {Component} from 'react';
import {connect} from 'react-redux';
import {GET_NEW_TERM,POST_DELETE_TERM,POST_SET_TERM} from "../../Actions";
import "../../Assets/Css/Term.css";

class Index extends Component {
    state = {select: [], selected: [], items: [], search: ""};

    serialize(term, new_search) {
        const {count, search, items} = term;
        const new_items = items.filter(item => (
            item.name.indexOf(new_search) + 1 || item.description.indexOf(new_search) + 1
        ));
        if ((count > 20 && new_items.length < 15) || search.length > new_search.length)
            this.props.dispatch({type: GET_NEW_TERM, term_type: this.props.type, search: new_search});
        this.setState({search: new_search, items: new_items});

    }

    componentDidMount() {
        const term = this.props.post.getTermList(this.props.type);
        this.setState({selected: [...term],select:term.map(i=>i.id)});
        if (this.props.term[this.props.type] === undefined) {
            this.props.dispatch({type: GET_NEW_TERM, term_type: this.props.type, search: ""});
            return null;
        }
        this.serialize(this.props.term[this.props.type], this.state.search);
    }


    UNSAFE_componentWillReceiveProps(nextProps) {
        const {type} = this.props;
        const term = nextProps.term[type];
        if (term)
            this.serialize(term, this.state.search);

    }

    changeSelect(e, value) {
        const {select, selected} = this.state;
        if (e.target.checked) {
            this.setState({select: [...select, value.id], selected: [...selected, value]});
            this.props.dispatch({type:POST_SET_TERM,term:value,term_type:'list'});
        }
        else {
            selected.find((i, index) => {
                if (i.id === value.id) {
                    selected.splice(index, 1);
                    return true;
                }
                return false;
            });
            select.splice(select.indexOf(value.id), 1);
            this.setState({select,selected});
            this.props.dispatch({type:POST_DELETE_TERM,term:value});
        }

    }

    changeSearch(e) {
        const value = e.target.value;
        this.serialize(this.props.term[this.props.type], value);

    }

    render() {
        const {items, selected,select, search} = this.state;
        return (
            <fieldset className="term">
                <legend>{this.props.type}</legend>
                <input type="text" className="term_search" placeholder="search"
                       onChange={this.changeSearch.bind(this)}/>
                <ul className="term_list">
                    {
                        (search === "" && selected.length > 0 ? selected : items).map((item, index) => (
                            <li className="term_list-item" key={index}>
                                <b title={item.description}>{item.name}</b>
                                <input type="checkbox"
                                       value={item.id}
                                       checked={select.includes(item.id)}
                                       onChange={e => this.changeSelect(e, item)}
                                />
                            </li>
                        ))
                    }
                </ul>
            </fieldset>
        );
    }
}

const mapStateToProps = state => ({term: state.Term, post: state.Post});
export default connect(mapStateToProps)(Index);