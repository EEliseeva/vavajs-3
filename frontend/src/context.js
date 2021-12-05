import React, { Component } from 'react';

const ProductContext = React.createContext();


class ProductProvider extends Component {
    state = {
        products: [],
        cart: []
    }
    componentDidMount(){
        this.setProducts();
    }
    setProducts = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://localhost:8000/products', requestOptions)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                var updated_data = [];
                for (var prod of data){
                    var updated_prod = {};
                    updated_prod['id'] = prod.id;
                    updated_prod['title'] = prod.nazov;
                    updated_prod['img'] = prod.obrazok;
                    updated_prod['price'] = prod.cena;
                    updated_prod['inCart'] = false;
                    updated_prod['count'] = 0;
                    updated_data.push(updated_prod);
                }
                return updated_data
            })
            .then(updated_data => this.setState(() => {
                return {products:updated_data}
            }));
    }

    getItem = (id) => {
        return this.state.products.find(item => item.id === id)
    }

    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return {detailProduct:product}
        })
    }
    addToCart = (id) => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.count += 1;
        product.total = product.count * product.price;
        if (product.inCart === true){
            console.log("ALREADY THERE")
            this.setState(() => {
                return {products:tempProducts, cart:[...this.state.cart]};
            })
            return;
        } 
        product.inCart = true;
        this.setState(() => {
            return {products:tempProducts, cart:[...this.state.cart, product]};
        })
    }

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};