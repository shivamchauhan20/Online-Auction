import React from 'react';
import { MDBNavbar, MDBNavbarBrand} from 'mdbreact';
export const ProductDescription = (props)=>{
return(
    <div>
         <MDBNavbar className="flexible-navbar top" light expand="md" scrolling>
                <MDBNavbarBrand to="/productdescription">
                <button className='btn btn-danger' name='products' onClick={props.redirectToProducts}>Back to Home</button>
                    <strong className='bid'>Product Bid</strong>
                </MDBNavbarBrand>
            </MDBNavbar>
    <div className="container dark-grey-text mt-5"> 
      <div className="row wow fadeIn">
        <div className="col-md-6 mb-4">
          <img src={props.object.image} className="productdescimage" alt='product'/>
        </div>
        <div className="col-md-6 mb-4">
          <div className="p-4">
            <div className="mb-3">
              <span className="badge mr-1">Product Category:{props.object.category}</span><br/>
              <span className="badge mr-1">Product Name:{props.object.pname}</span><br/>
              <span className="badge mr-1">Bid EndDate: {props.object.time}</span><br/>
              <span className="badge mr-1">Minimum Bid Amount: ₹{props.object.amount}</span><br/>
              <span className="badge mr-1">Description:{props.object.pdesc}</span>
            </div>
            <div hidden={localStorage._id===props.object.author?true:false}>
            <span className="lead font-weight-bold">Enter Your Bid Amount(in Rs.)</span>
            <br/>
            <input name='amount' type='number' className='form-control' onChange={props.takeInput}/>
            <div className="note">Note:Your Bid Amount must be more than minimum bid.</div>
            <br/>
            <button className="btn btn-success btn-md my-0 p" onClick={props.addBid}>Place Bid</button>  
            </div>
            <br/>
            <button className="btn btn-info btn-md my-0 p" onClick={()=>props.viewBids(props.object.pid)}>View All Bids for this Product</button>
            {/* <p className="lead font-weight-bold">Product Category:</p><p className="lead">{props.object.category}</p>
            <p className="lead font-weight-bold">Product Name:</p><p className="lead">{props.object.pname}</p>
            <p className="lead font-weight-bold">Bid EndTime:</p><p className="lead">{props.object.time}</p>
            <p className="lead font-weight-bold">Minimum Bid Amount:</p><p className="lead">{props.object.amount}</p>
            <p className="lead font-weight-bold">Description:</p><p className="lead">{props.object.pdesc}</p>
            </div> */}  
          </div>
        </div>
      </div>
      </div>
      </div>
)
}