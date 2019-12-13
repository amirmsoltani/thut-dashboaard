import React, {Component} from 'react';
import {connect} from "react-redux";
import {TERM_SELECT, TAXONOMY_DELETE, ADD_TAXONOMY} from "../../Actions";

class TaxonomyControl extends Component {
    state = {add: false, description: "", type: "", parent: null, update: false};
    form = React.createRef();
    render() {
        const {taxonomy, select} = this.props;
        const {add, description, type, parent, update} = this.state;
        if (select.type !== 'taxonomy')
            return <div className="taxonomy"/>;
        return (
            <div className="taxonomy">
                {add ?
                    <div className="taxonomy_add-box">
                        <input type="text" placeholder="type"
                               onChange={e => this.setState({type: e.target.value})}/>
                        <textarea  maxLength={250}
                                  onChange={e => this.setState({description: e.target.value})}/>
                        <input type="button"
                               onClick={() => (this.props.dispatch({
                                       type: ADD_TAXONOMY,
                                       taxonomy: {description, type, update, parent}
                                   }) &&
                                   this.setState({add: false, update: false,description:"",parent:null,type:""}))
                               }
                               value="submit"
                        />
                        <input type="button" value="close" onClick={() => this.setState({update: false, add: false})}/>
                    </div> : ""
                }
                <input type="button" value="X" className="taxonomy_close"
                       onClick={() => this.props.dispatch({type: TERM_SELECT, select: {}})}
                />
                <ul className="taxonomy_list">
                    {
                        taxonomy.map(i => (
                            <div className="taxonomy_item" key={i.id}>
                                <span>type:</span><span>{i.type}</span>
                                <span>description:</span><span>{i.description}</span>
                                <span>parent:</span><span>{i.parent}</span>
                                <input type="button" value="delete"
                                       onClick={() => this.props.dispatch({type: TAXONOMY_DELETE, id: i.id})}/>
                            </div>
                        ))
                    }
                    <div className="taxonomy_add" title="add taxonomy" onClick={() => this.setState({add: true})}>
                        +
                    </div>
                </ul>
            </div>
        );
    }
}

const mapPropsToState = state => ({select: state.Term.select, taxonomy: state.Term.taxonomy});
export default connect(mapPropsToState)(TaxonomyControl);