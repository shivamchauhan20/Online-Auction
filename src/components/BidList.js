import React from 'react';
import {MDBNavbar,MDBNavbarBrand,MDBRow,MDBCol} from 'mdbreact';  
export const BidList = (props)=>{
    return(
    <>      
        <MDBNavbar className="flexible-navbar top" light expand="md" scrolling>
                <MDBNavbarBrand to="/productdescription">
                <button className='btn btn-danger' onClick={props.redirectToProducts}>Back to Home</button>
                &nbsp;&nbsp;
                <button className='btn btn-light' name='productdescription' onClick={props.viewChange}>Back to Product Bid</button>
                    <strong className='bid'>Bids List</strong>
                </MDBNavbarBrand>
            </MDBNavbar>
      <div  hidden={props.bidList.length===0?false:true}>
        <MDBRow>
        <MDBCol md="8">
          <h2 className="h2-responsive mt-3 mb-2">No Bids for this Product!!!</h2>
        </MDBCol>
        <MDBCol md="4">
          <img alt="Hello" className="img-fluid" src="https://mdbootstrap.com/img/Others/grafika404-bf.png"/>
        </MDBCol>
      </MDBRow>
      </div>        
  <table hidden={props.bidList.length===0?true:false} className="table"> 
     <thead className="table-success"> 
              <tr>
                <th scope="row">S.No</th>
                <th scope="row">Bid By</th>
                <th scope="row">Bid Amount</th>
              </tr>
            </thead>
            <tbody className="p-3 mb-2 bg-light text-dark">
              {props.bidList.map((singleBid,index) => (
                  <tr key={index}>
                  <td>{index+1}</td>
                  <td>{singleBid.name}</td>
                  <td>{singleBid.bidamount}</td>
                 </tr>
              ))}
            </tbody>       
    </table>
        </>
    )
}
