import React from 'react';
export const AddFeedback = (props)=>{
    return(
        <div>
            <div className="form-group">
            <label>Enter Subject</label>
            <input type="text" className="form-control" name="subject" onChange={props.takeInput} placeholder='Enter the subject of your feedback'/>
            </div>
            <div className="form-group">
            <label>Enter Description</label>
            <textarea className="form-control" name="desc" rows="3" onChange={props.takeInput} placeholder='Enter the description of your feedback'></textarea>
            <br/>
            <button className="btn btn-success btn-rounded" onClick={props.addFeedback}><span className="fa fa-plus-square" aria-hidden="true"></span>Submit</button>
            </div>
        </div> 
    )
}