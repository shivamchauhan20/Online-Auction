import React from 'react';
import { connect } from 'react-redux';
import { MDBCard,MDBRow, MDBCol} from 'mdbreact';
import CardActions from '@material-ui/core/CardActions';
export const DeleteProduct = (props)=>{
   if(props.result.length===0){
      return(
    <div>
      <MDBRow>
        <MDBCol md="8">
          {/* <img alt="Welcome" className="img-fluid" hieght="20px" src='https://image.shutterstock.com/image-vector/welcome-poster-spectrum-brush-strokes-260nw-1146069941.jpg'/> */}
          <h2 className="h2-responsive mt-3 mb-2">Nothing to Delete!!!</h2>
        </MDBCol>
        <MDBCol md="4">
          <img alt="Hello" className="img-fluid" src="https://mdbootstrap.com/img/Others/grafika404-bf.png"/>
        </MDBCol>
      </MDBRow>
    </div>
  )
 }
   else{
    return(
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
                      <h4><strong>${singleProduct.amount}</strong></h4>
                      <h4>Bid EndTime : {singleProduct.time}</h4>
                    </div>
                  </div>
                  <CardActions>
        <button size="small" className='btn btn-danger btn-rounded' onClick={()=>{props.deleteProduct(singleProduct,1)}}>Delete</button>
      </CardActions>
                </MDBCard>
            </MDBCol>
            </MDBRow>
        ))}
        </div>
        )
     }         
}
const mapStateToProps=(state)=>{
var products = [];
for(var product of state.productList){
    console.log('Product is ',product);
    if(product.author===localStorage._id){
        products.push(product);
    }
}
return{
    result:products
    }
}
const fn = connect(mapStateToProps);
export default fn(DeleteProduct);