import React from 'react';
import ProductList from './ProductList';
export const Products = (props)=>{
    return(
        <div>
            <React.Fragment>
                <ProductList productDescription={props.productDescription} deleteProduct={props.deleteProduct}/>
            </React.Fragment>
          </div>
    )
}
export default Products;