import React from 'react';
import DateTimePicker from 'react-datetime-picker';
export const AddProduct = (props)=>{
    return(
 <div>
            <label>Enter Product Name</label><input className="form-control" name='pname' onChange={props.takeInput} type='text' placeholder="Enter the name of product"/>
            <label>Enter Product Description</label><textarea className="form-control" name='pdesc' onChange={props.takeInput} type='text' placeholder="Enter the description of product"/>
            <label>Enter Minimum Bid Amount(in Rs.)</label><input className="form-control" name='amount' onChange={props.takeInput} type='number' placeholder="Enter the minimum bid amount(in Rs.)"/>
            <label>Enter Auction Time(in minutes)</label><br/>
            <DateTimePicker className='form-control' minDate={new Date()} value={props.startDate} onChange={props.handleChange}/>
            <label>Select Category</label>
            <select className='form-control' name='category' onChange={props.takeInput}>
                <option value='Clothing'>Clothing</option>
                <option value='Electronics'>Electronics</option>
                <option value='Furniture'>Furniture</option>
                <option value='Other'>Other</option>
            </select>
            <span>Upload Image</span>
            <br/>
            <input className="btn btn-dark" type="file" name="file" onChange={props.onChangeHandler}/>
            <br/><br/>
            <button className="btn btn-success btn-rounded" onClick={props.addProduct}><span className="fa fa-plus-square" aria-hidden="true"></span>Add</button>
    </div>    
    )
 }