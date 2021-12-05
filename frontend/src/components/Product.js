import React, { Component } from 'react'
import { ProductConsumer, ProductProvider } from '../context'

export default class Product extends Component {
    render() {
        const {id, title, price, count, img} = this.props.product;
        return (
            <ProductConsumer>
                {(value) => {
                    // console.log(value.detailProduct)
                    return(
                    <div>
                        <div className="product" style={
                            {
                                border: '2px solid black'
                            }
                        }>
                            <h3>{title}</h3>
                            <img src={img} height="500" width="500"/>
                            <h4>Price: {price}</h4>
                            <button className="cart-btn" onClick={()=>{
                                value.addToCart(id);
                                console.log("Added to the cart");
                            }}>Add to cart</button>
                            <h4>In cart: {count}</h4>
                        </div>
                    </div>)
                }}
            </ProductConsumer>
        )
    }
}
