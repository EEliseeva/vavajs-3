import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <nav>
                <Link to='/'>
                    <div>HOME</div>
                </Link>
                <Link to='/cart'>
                    <div>CART</div>
                </Link>
            </nav>
        );
    }
}