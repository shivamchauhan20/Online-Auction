import React from 'react';
import { Route,Switch,withRouter} from 'react-router-dom';
import { DashboardPage } from './DashboardPage';
import { AddProduct } from './AddProduct';
import  DeleteProduct  from './DeleteProduct';
import { AddFeedback } from './AddFeedback';
import  Products  from './Products';
import {Config} from '../utils/Config';
import { productActionCreator } from '../models/actioncreators/productactioncreator';
import { store } from '../models/store';
import { FeedbackList } from './FeedbackList';
class Routes extends React.Component {
constructor(props){
    super(props);
    this.inputs={};
    this.obj = {};
    this.state={selectedFile:null,file:null,startDate:new Date()};
}  
takeInput(event){
    this.inputs[event.target.name] = event.target.value;
}  
onChangeHandler(event){
    console.log('File is ',event.target.files[0]);
    this.inputs['filename'] = event.target.files[0].name;
    const file    = event.target.files[0];
    const reader  = new FileReader();
    reader.onloadend = () => {
        this.setState({
            file: reader.result
        })
    }
    if (file) {
        reader.readAsDataURL(file);
        this.setState({
            file :reader.result
        })
    } 
    else {
        this.setState({
            file: ""
        })
    }
    this.setState({...this.state,selectedFile:event.target.files[0]});
}
handleChange(date){
    console.log('Date is ',date);
    this.setState({
      startDate:date
    });
};
addProduct(){
    console.log('Add product Call');
    if(this.inputs['category']===undefined){
        this.inputs['category'] = 'Clothing';
    }
    var date = this.state.startDate.getDate()+'/'+this.state.startDate.getMonth()+1+'/'+this.state.startDate.getFullYear()+' Time: '+this.state.startDate.getHours()+(this.state.startDate.getMinutes()<10?':0'+this.state.startDate.getMinutes():':'+this.state.startDate.getMinutes());
    var productObject = {"_id":localStorage._id,"pname":this.inputs['pname'],"pdesc":this.inputs['pdesc'],"amount":this.inputs['amount'],"time":date,"category":this.inputs['category'],"image":this.state.file};
    console.log('Product Object is ',productObject);
    var diff = this.state.startDate.getTime() - new Date().getTime();
    console.log('Difference is ',diff);
    if(diff>0){ 
    fetch(Config.BASEURL+Config.ADDPRODUCT,{method:'POST',headers: {
        'Content-Type': 'application/json'
    },body:JSON.stringify(productObject)}).then(response=>response.json()
    .then(data=>{
        console.log('Data is ',data);           
        var action = productActionCreator(data.pid,productObject._id,productObject.pname,productObject.pdesc,productObject.amount,productObject.time,productObject.category,productObject.image,'add');
        store.dispatch(action);
        alert(data.msg);
        setTimeout(()=>{
            console.log('Set Timeout Call for product',productObject.pname);
            this.endAuction(data.pid);
        },diff);
    })
    .catch(err=>console.log('Json Error is ',err)))
    .catch(e=>console.log('Server Error is ',e));
    }
    else{
            alert('Select Minimum Auction Time Properly!!!!')
        }
}
endAuction(pid){
console.log('End Auction Call');
var productObj = {"pid":pid};
fetch(Config.BASEURL+Config.ENDAUCTION,{method:'POST',headers: {
        'Content-Type': 'application/json'
    },body:JSON.stringify(productObj)}).then(response=>response.json()
    .then(data=>{
        console.log('Data is ',data);
        if(data.status==='fail'){
            console.log(data.msg);
        }
        else{
            this.deleteProduct(data.product,2);
            // var productObject = data.product;
            // var action = productActionCreator(pid,productObject.author,productObject.pname,productObject.pdesc,productObject.amount,productObject.time,productObject.category,productObject.image,'delete');
            // store.dispatch(action);  
            // console.log(data.msg);  
        }
    })
    .catch(err=>console.log('Json Error is ',err)))
    .catch(e=>console.log('Server Error is ',e));        
}
deleteProduct(productObject,type){
console.log('Delete Product Call');
console.log('Product Object is ',productObject);
var productObj;
if(type===1){
 productObj = {"pid":productObject.pid};
}
else{
 productObj = {"pid":productObject._id};
}
fetch(Config.BASEURL+Config.DELETEPRODUCT,{method:'POST',headers: {
        'Content-Type': 'application/json'
    },body:JSON.stringify(productObj)}).then(response=>response.json()
    .then(data=>{
        console.log('Data is ',data);
        var action = productActionCreator(productObj.pid,productObject.author,productObject.pname,productObject.pdesc,productObject.amount,productObject.time,productObject.category,productObject.image,'delete');
        store.dispatch(action);
        //alert(data.msg);
    })
    .catch(err=>console.log('Json Error is ',err)))
    .catch(e=>console.log('Server Error is ',e));
}
productDescription(productObject){
    this.obj = productObject;
    console.log('Object is ',this.obj);
    this.props.redirectToProductDescription(this.obj);
}
addFeedback(){
    console.log('Add Feedback Call');
    var d = new Date();
    var date = d.getDate()+'/'+d.getMonth()+1+'/'+d.getFullYear()+'  '+d.getHours()+(d.getMinutes()<10?':0'+d.getMinutes():':'+d.getMinutes());
    var feedObject = {'name':this.props.msg,'subject':this.inputs['subject'],'desc':this.inputs['desc'],'date':date};
    console.log('Feedback object is ',feedObject);
    fetch(Config.BASEURL+Config.ADDFEEDBACK,{method:'POST',headers: {
        'Content-Type': 'application/json'
    },body:JSON.stringify(feedObject)}).then(response=>response.json()
    .then(data=>{
        console.log('Data is ',data);
        alert(data.msg);
    })
    .catch(err=>console.log('Json Error is ',err)))
    .catch(e=>console.log('Server Error is ',e));
}
render() {
    return(
    <div>
      <Switch>
        <Route path='/dashboard' render={()=><DashboardPage viewChange={this.props.viewChange} msg={this.props.msg}/>}/>
        <Route path='/products' render={()=><Products productDescription={this.productDescription.bind(this)} deleteProduct={this.deleteProduct.bind(this)}/>}/>
        <Route path='/addproduct' render={()=><AddProduct startDate={this.state.startDate} takeInput={this.takeInput.bind(this)} handleChange={this.handleChange.bind(this)} onChangeHandler={this.onChangeHandler.bind(this)} addProduct={this.addProduct.bind(this)}/>}/>
        <Route path='/deleteproduct' render={()=><DeleteProduct deleteProduct={this.deleteProduct.bind(this)}/>}/>
        <Route path='/addfeedback' render={()=><AddFeedback takeInput={this.takeInput.bind(this)} addFeedback={this.addFeedback.bind(this)}/>}/>
        <Route path='/feedbacks' render={()=><FeedbackList feedbackList={this.props.feedbackList}/>}/>
      </Switch>
      </div>
    );
  }
}
export default withRouter(Routes);