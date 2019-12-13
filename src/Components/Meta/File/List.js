import React from 'react';
import {connect} from "react-redux";

function List({files, options, change}) {

    const cancel = option => {

        if (option.type === "file" && files[option.url][2] !== undefined)
            files[option.url][2]("user upload cancel");


    };

    function del(option) {
        const new_options = [...options];
        options.find((i, index) => {
            if (i.url !== option.url)
                return false;
            new_options.splice(index, 1);
            return true;
        });

        change({options: new_options});
    }

    return (
        <ul className="file-items">
            {
                options.map((option, index) =>
                    (
                        <li className="file-option_item" key={index}>
                            <span>{option.type}</span>
                            <span className="break">{option.url}</span>
                            <span className="break">{option.description}</span>
                            {files[option.url]? <span>{files[option.url][0]}%</span> : ""}
                            {files[option.url]&& files[option.url][0] === "cancel" ? setTimeout(del, 2000, option) : ""}
                            <input type="button" value="delete" onClick={() =>
                                option.type === "file" ? cancel(option) : del(option)}/>
                        </li>
                    )
                )
            }
        </ul>
    )
}

const mapStateToProps = state => ({files: state.File.files,post:state.Post});

export default connect(mapStateToProps)(List)