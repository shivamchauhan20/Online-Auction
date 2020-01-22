import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand} from 'mdbreact';

class TopNavigation extends Component {
    render() {
        return (
            <MDBNavbar className="flexible-navbar top" light expand="md" scrolling>
                <MDBNavbarBrand to="/dashboard">
                    <strong>Impossible is Nothing</strong>
                </MDBNavbarBrand>
            </MDBNavbar>
        );
    }
}

export default TopNavigation;