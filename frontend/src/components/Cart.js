import React, { Component } from 'react'

export default class Cart extends Component {
    render() {
        return (
            this.props.cart.map( product => {
                return (
                    <div className="product" key={product.id} style={
                        {
                            border: '2px solid black'
                        }
                    }>
                        <h3>{product.title}</h3>
                        <h4>Price: {product.price}</h4>
                        <h4>Count: {product.count}</h4>
                    </div>
                )
            })
        )
    }
}
