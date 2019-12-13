import React, {Component} from 'react';
import TermControl from "../Components/Term/TermControl";
import TaxonomyControl from "../Components/Term/TaxonomyControl";

class TermManager extends Component {
    render() {
        return (
            <div className="term_manager">
                <TaxonomyControl />
                <TermControl />
            </div>
        );
    }
}

export default TermManager;