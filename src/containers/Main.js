import React from 'react';
import {Switch,Route,withRouter} from 'react-router-dom';
import Login from '../components/Login';
import { Config } from '../utils/Config';
import Register from '../components/Register';
import SideNavigation from '../components/sideNavigation';
import Routes from '../components/Routes';
import { productActionCreator } from '../models/actioncreators/productactioncreator';
import { store } from '../models/store';
import TopNavigation from '../components/topNavigation';
import { ProductDescription } from '../components/ProductDescription';
import {BidList} from '../components/BidList';
import { ChangePassword } from '../components/ChangePassword';
class Main extends React.Component{
constructor(props){
    super(props);
    this.inputs = {};
    this.obj = {};
    this.bidList = [];
    this.feedbackList = [];
    this.state = {isLoggedIn:false,isChange:false};
}
UNSAFE_componentWillMount(){
    console.log('Component Will Mount Call');
    this.props.history.push('/');
    this.fetchProducts();
}
takeInput(event){
    this.inputs[event.target.name] = event.target.value;
}
viewChange(event){
    console.log('View Change Call ',event.target.name);
    if(event.target.name==='/'){
        this.inputs = {};
        this.setState({isLoggedIn:false});
    }
    if(event.target.name==='changepassword'){
        this.setState({isChange:!this.state.isChange});
    }
    this.props.history.push(event.target.name);
}
fetchProducts(){
    console.log('Fetch Product Call');
    fetch(Config.BASEURL+Config.FETCHPRODUCTS,{method:'POST',headers: {
        'Content-Type': 'application/json'
    }}).then(response=>response.json()
    .then(products=>{
        var productList = products.products;
        console.log('Product List is ',productList); 
        for(var product of productList){
        var action = productActionCreator(product._id,product.author,product.pname,product.pdesc,product.amount,product.time,product.category,product.image,'add');
        store.dispatch(action);
        }
    })
    .catch(err=>console.log('Json Error is ',err)))
    .catch(e=>console.log('Server Error is ',e));   
}
login(){
    console.log('Login Call');
    var userObject = {"userid":this.inputs['userid'],"password":this.inputs['password']};
    console.log('UserObject is ',userObject);
    fetch(Config.BASEURL+Config.LOGIN,{method:'POST',headers: {
        'Content-Type': 'application/json'
    },body:JSON.stringify(userObject)}).then(response=>response.json()
    .then(data=>{
        console.log('Data is ',data); 
            if(data.isLoggedIn==='true'){
            if(this.inputs['userid']==='admin'){
                localStorage.role='admin';
                this.fetchFeedbacks();
            }
            else{
                localStorage.role='user';
            }    
            this.inputs['msg'] = data.msg;
            localStorage._id = data.userObject._id; 
            this.props.history.push('dashboard');
            this.setState({isLoggedIn:true});
            }
            else{
                alert(data.msg);
            }
    })
    .catch(err=>console.log('Json Error is ',err)))
    .catch(e=>console.log('Server Error is ',e));
}
register(){
    console.log('Register Call');
    var userObject = {"userid":this.inputs['userid'],"password":this.inputs['password'],"name":this.inputs['firstName']+' '+this.inputs['lastName'],"email":this.inputs['email']};
    console.log('UserObject is ',userObject);
    fetch(Config.BASEURL+Config.REGISTER,{method:'POST',headers: {
        'Content-Type': 'application/json'
    },body:JSON.stringify(userObject)}).then(response=>response.json()
    .then(data=>{
        console.log('Data is ',data); 
                alert(data.msg);
                this.props.history.push('/');
    })
    .catch(err=>console.log('Json Error is ',err)))
    .catch(e=>console.log('Server Error is ',e));
}
redirectToProductDescription(productObject){
    this.obj = productObject;
    this.props.history.push('productdescription');
    this.setState({isChange:!this.state.isChange});
}
redirectToProducts(event){
    this.setState({isChange:!this.state.isChange});
    this.props.history.push(event.target.name);
}
addBid(){
    console.log('Add Bid Call');
    console.log('Object is ',this.obj);
    var bidObject = {"_id":localStorage._id,"pid":this.obj.pid,"amount":this.inputs['amount']}
    console.log('BidObject is ',bidObject);
    if(parseInt(bidObject.amount)<parseInt(this.obj.amount)){
        alert('Please read the note carefully');
    }
    else{
    fetch(Config.BASEURL+Config.ADDBID,{method:'POST',headers: {
        'Content-Type': 'application/json'
    },body:JSON.stringify(bidObject)}).then(response=>response.json()
    .then(data=>{
        console.log('Data is ',data); 
                alert(data.msg);
    })  
    .catch(err=>console.log('Json Error is ',err)))
    .catch(e=>console.log('Server Error is ',e));
}
}
viewBids(pid){
    console.log('Fetch Bids Call');
    var productObject = {"pid":pid}
    console.log('Product Id is ',pid);
    fetch(Config.BASEURL+Config.FETCHBIDS,{method:'POST',headers: {
        'Content-Type': 'application/json'
    },body:JSON.stringify(productObject)}).then(response=>response.json()
    .then(data=>{
        console.log('Data is ',data.bidList);
        this.bidList = data.bidList;
        this.props.history.push('/bids');
    })
    .catch(err=>console.log('Json Error is ',err)))
    .catch(e=>console.log('Server Error is ',e));    
}
fetchFeedbacks(){
    console.log('Fetch FeedBacks Call');
    fetch(Config.BASEURL+Config.FETCHFEEDBACKS,{method:'POST',headers: {
        'Content-Type': 'application/json'
    }}).then(response=>response.json()
    .then(data=>{
        this.feedbackList = data.feedbacks;
        console.log('Feedback List is ',this.feedbackList); 
    })
    .catch(err=>console.log('Json Error is ',err)))
    .catch(e=>console.log('Server Error is ',e));       
}
changePassword(){
    console.log('Change Password Call');
    var userObject = {"_id":localStorage._id,"oldpassword":this.inputs['oldpassword'],"newpassword":this.inputs['newpassword']};
    console.log('UserObject is ',userObject);
    fetch(Config.BASEURL+Config.CHANGEPASSWORD,{method:'POST',headers: {
        'Content-Type': 'application/json'
    },body:JSON.stringify(userObject)}).then(response=>response.json()
    .then(data=>{
        console.log('Data is ',data); 
        alert(data.msg);
    })
    .catch(err=>console.log('Json Error is ',err)))
    .catch(e=>console.log('Server Error is ',e));  
}    
render(){
    if(!this.state.isLoggedIn){
    return(
        <div>
            <Switch>
                <Route exact path='/' render={()=><Login takeInput={this.takeInput.bind(this)} login={this.login.bind(this)} viewChange={this.viewChange.bind(this)}/>}/>
                <Route path='/register' render={()=><Register takeInput={this.takeInput.bind(this)} register={this.register.bind(this)} viewChange={this.viewChange.bind(this)}/>}/>
            </Switch>
        </div>
    )
    }
    else{
        if(!this.state.isChange)
        return (
            <div className="flexible-content">
                <TopNavigation/>
                 <SideNavigation viewChange={this.viewChange.bind(this)}/>
              <main className="route">
                <Routes msg={this.inputs['msg']} viewChange={this.viewChange.bind(this)} feedbackList={this.feedbackList} redirectToProductDescription={this.redirectToProductDescription.bind(this)}/>
              </main>
            </div>
        );
        else{
            return(
            <div>
                <Switch>
                <Route path='/productdescription' render={()=><ProductDescription object={this.obj} takeInput={this.takeInput.bind(this)} redirectToProducts={this.redirectToProducts.bind(this)} addBid={this.addBid.bind(this)} viewBids={this.viewBids.bind(this)}/>}/>
                <Route path='/bids' render={()=><BidList bidList={this.bidList} viewChange={this.viewChange.bind(this)} redirectToProducts={this.redirectToProducts.bind(this)}/>}/>
                <Route path='/changepassword' render={()=><ChangePassword takeInput={this.takeInput.bind(this)} redirectToProducts={this.redirectToProducts.bind(this)} changePassword={this.changePassword.bind(this)}/>}/>
                </Switch>
            </div>
            )
        }
    }
}
}
export default withRouter(Main);
