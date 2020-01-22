import React from 'react'
import { MDBCol, MDBRow } from 'mdbreact';

export const DashboardPage = (props) => {
  return (
    <React.Fragment>
    <div>
      <MDBRow>
        <MDBCol md="8">
          {/* <img alt="Welcome" className="img-fluid" hieght="20px" src='https://image.shutterstock.com/image-vector/welcome-poster-spectrum-brush-strokes-260nw-1146069941.jpg'/> */}
          <h2 className="h2-responsive mt-3 mb-2">Welcome {props.msg}</h2>
          <br/>
          <button className="btn btn-warning" name='changepassword' onClick={props.viewChange}><i className="fa fa-pencil-square-o" aria-hidden="true"></i>Change Password</button>
        </MDBCol>
        <MDBCol md="4">
          <img alt="Hello" className="img-fluid" src="https://mdbootstrap.com/img/Others/grafika404-bf.png"/>
        </MDBCol>
      </MDBRow>
    </div>
  </React.Fragment>
  )
}