import React from 'react';
import {MDBNavbar,MDBNavbarBrand} from 'mdbreact';  
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Container } from '@material-ui/core';
const useStyles = makeStyles({
    card: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    pos: {
      marginBottom: 12,
    },
  });
export const ChangePassword = (props)=>{
    return(
        <>
        <MDBNavbar className="flexible-navbar top" light expand="md" scrolling>
        <MDBNavbarBrand>
        <button name='dashboard' className='btn btn-danger' onClick={props.redirectToProducts}>Back</button>
            <strong className='bid'>Change Password</strong>
        </MDBNavbarBrand>
    </MDBNavbar>
    <Container maxWidth='sm'>
    <div style={{textAlign: "center"}}>
    <br/>
    <br/>
    <Card className={useStyles.card} >
      <CardContent>
        <TextField
          label="Enter your Old Password"
          name="oldpassword"
          className={useStyles.textField}
          type="password"
          onChange={props.takeInput}
          autoComplete="current-password"
          margin="normal"
        />
         <br/>
        <TextField
          label="Enter your New Password"
          name="newpassword"
          className={useStyles.textField}
          type="password"
          onChange={props.takeInput}
          autoComplete="current-password"
          margin="normal"
        />
        <br/><br/>
      </CardContent>
      <CardActions>
      <Button variant="contained" color="primary" size="small" onClick={props.changePassword}>Update Password</Button>
      </CardActions>
    </Card>
    </div>
    </Container>
    </>
    )
}