import React from "react";

 const Options=React.forwardRef(({add,type,change},form)=>
{

    return(
        <div className="file-options" ref={form}>
            <select className="file-option_type"
                    defaultValue={type}
                    onChange={e => change({option_type: e.target.value})}
            >
                <option value="file" children="file"/>
                <option value="remote" children="remote"/>
                <option value="url" children="url"/>
            </select>


            <input type={type === 'remote' ? "url" : type}
                   className="file-option_value"
                   placeholder="enter link here"
                   onChange={e=>change({option_data: {file: e.target.files?e.target.files[0]:null, value: e.target.value}})}
            />

            <textarea
                className="file-option_description"
                placeholder="enter description here"
                maxLength={250}
                onChange={e => change({option_description: e.target.value})}
            />

            <input type="button" value="add" onClick={()=>{add()}}/>
        </div>
    )
});

export default Options;