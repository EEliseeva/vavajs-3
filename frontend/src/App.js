import './App.css';
import React, { Component } from 'react';
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import CartController from './components/CartController';
import Default from './components/Default';
import Ad from './components/Ad'

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar></Navbar>
                <Routes>
                    <Route path="/cart" element={ <CartController /> }></Route>
                    <Route path="/" element={ <ProductList />}></Route>
                    <Route path="/ad" element={ <Ad /> }></Route>
                    <Route element={ <Default /> }></Route>
                </Routes>
            </React.Fragment>
        );
    }
}

export default App;
