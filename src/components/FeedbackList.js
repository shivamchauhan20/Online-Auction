import React from 'react';
import {MDBRow,MDBCol} from 'mdbreact';  
export const FeedbackList = (props)=>{
    return(
    <>   
      <div  hidden={props.feedbackList.length===0?false:true}>
        <MDBRow>
        <MDBCol md="8">
          <h2 className="h2-responsive mt-3 mb-2">No FeedBacks!!!</h2>
        </MDBCol>
        <MDBCol md="4">
          <img alt="Hello" className="img-fluid" src="https://mdbootstrap.com/img/Others/grafika404-bf.png"/>
        </MDBCol>
      </MDBRow>
      </div> 
  <table hidden={props.feedbackList.length===0?true:false} className="table table-striped table-dark"> 
     <thead>
              <tr>
                <th scope="row">S.No</th>
                <th scope="row">Name</th>
                <th scope="row">Subject</th>
                <th scope="row">Description</th>
              </tr>
            </thead>
            <tbody>
              {props.feedbackList.map((singleFeedback,index) => (
                  <tr key={index}>
                  <td>{index+1}</td>
                  <td>{singleFeedback.name}</td>
                  <td>{singleFeedback.subject}</td>
                  <td>{singleFeedback.desc}</td>
                  {/* <td> <button className="btn btn-outline-warning" onClick={()=>{props.edit(singleUser)}}><i className="fa fa-pencil-square" aria-hidden="true"></i>Edit</button></td>
                  <td> <button className="btn btn-outline-warning"  onClick={()=>{props.deleteUser(singleUser)}}><i className="fa fa-trash" aria-hidden="true"></i>Delete</button></td> */}
                </tr>
              ))}
            </tbody>       
    </table>
        </>
    )
}