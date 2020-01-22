import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';
const SideNavigation = (props) =>{
    return (
        <div className="sidebar-fixed position-fixed">
             <img alt="Auction System" className="auctionimage" src='https://cdn.iconscout.com/icon/free/png-256/online-auction-1797403-1527068.png'/>
            <MDBListGroup className="list-group-flush">
                <NavLink  to="/dashboard" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon  icon="home" className="mr-3"/>
                        Dashboard
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/products" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="list" className="mr-3"/>
                        Products
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/addproduct" hidden={localStorage.role==='admin'?true:false} activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="plus-square" className="mr-3"/>
                        Add Product
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/deleteproduct" hidden={localStorage.role==='admin'?true:false} activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="trash" className="mr-3"/>
                        Delete Product
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/addfeedback" hidden={localStorage.role==='admin'?true:false} activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="exclamation" className="mr-3"/>
                        Provide Feedback
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/feedbacks" hidden={localStorage.role==='admin'?false:true} activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="exclamation" className="mr-3"/>
                        View Feedbacks
                    </MDBListGroupItem>
                </NavLink>
                <MDBListGroupItem>
                <button name='/' className='btn-danger' onClick={props.viewChange}><i className="fa fa-sign-out" aria-hidden="true"></i>Sign Out</button>
                    </MDBListGroupItem>
            </MDBListGroup> 
        </div>
    );
}


export default SideNavigation;