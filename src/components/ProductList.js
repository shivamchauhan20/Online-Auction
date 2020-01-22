import React from 'react';
import { MDBCard, MDBCardBody,MDBRow, MDBCol,Button } from 'mdbreact';
import {connect} from 'react-redux';
const ProductList = (props) => {
  if(props.result.length===0){
    return(
      <div>
        <MDBRow>
        <MDBCol md="8">
          <h2 className="h2-responsive mt-3 mb-2">No Products!!!</h2>
        </MDBCol>
        <MDBCol md="4">
          <img alt="Hello" className="img-fluid" src="https://mdbootstrap.com/img/Others/grafika404-bf.png"/>
        </MDBCol>
      </MDBRow>
      </div>
    )
  }
  else{
  return (
      <div>
    {props.result.map((singleProduct,index)=>(
    <MDBRow key={index} className="mb-4 productcardrow">
              <MDBCol xl="3" md="6" className="mb-r">
              <MDBCard className="cascading-admin-card productcard">
                  <div className="admin-up">
                  <img alt='Product' src={singleProduct.image} className="productimage"/>
                    <div className="data">
                      <h4>{singleProduct.category}</h4>
                      <h4>{singleProduct.pname}</h4>
                      <h4>Minimum Bid Amount: <strong>₹{singleProduct.amount}</strong></h4>
                      <h4>Bid EndDate: {singleProduct.time}</h4>
                    </div>
                  </div>
                  <MDBCardBody>
                   <Button  className='btn btn-warning' hidden={localStorage.role==='admin'?true:false} onClick={()=>{props.productDescription(singleProduct)}}>View Full Details</Button>
                   <button size="small" className='btn btn-danger btn-rounded' hidden={localStorage.role==='admin'?false:true} onClick={()=>{props.deleteProduct(singleProduct,1)}}>Delete</button>
                  </MDBCardBody>
                </MDBCard>
            </MDBCol>
            </MDBRow>
        ))}
      </div>
      )
    }
}
const mapStateToProps = (state)=>{
    return {
        result:state.productList
    }
}
const fn = connect(mapStateToProps);
export default fn(ProductList);