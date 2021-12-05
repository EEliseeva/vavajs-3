import React, { Component } from 'react'
import { ProductConsumer } from '../context'
import Cart from './Cart';
import Form from './Form';

export default class CartController extends Component {
    render() {
        return (
            <ProductConsumer>{ value => {
                return (<div> 
                    <Cart cart={value.cart} />
                    <Form items={value.cart} />
                </div>)
            }}</ProductConsumer>
        )
    }
}
