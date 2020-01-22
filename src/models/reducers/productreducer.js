export const productReducer = (initState={productList:[]},action)=>{
console.log('Action is ',action);
if(action.type==='add'){
    var products = [...initState.productList];
    products.push(action.payload);
    console.log('Product List is ',products);
    return initState = {productList:products};
} 
if(action.type==='delete'){
    var product = initState.productList.map(y=>y);
    var index = product.findIndex(p=>p.pid===action.payload.pid);
    product.splice(index,1);
    return initState={productList:product};
}   
return initState;
};