import React, { Component } from 'react';
import { products } from '../products';
import SearchBox from '../components/SearchBox';
import './App.css';
import CardList from "../components/CardList";
import WhatsappIcon from "../components/WhatsappIcon";
import Footer from '../components/Footer'
// import MainNavDiv from '../components/MainNavDiv'


class App extends Component {
    constructor() {
        super();
        this.state = {
            products: products,
            searchfield: ''
        }
    }

    componentDidMount() {
        this.setState({ products: products });
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value });
    }

    render() {
        const { products, searchfield } = this.state;
        const filteredProducts = products.filter((product) => {
            return product.name.toLowerCase().includes(searchfield.toLowerCase());

        });

        return (
            <div className="tc">
                <SearchBox searchChange={this.onSearchChange}/>
                <CardList products={filteredProducts}/>
                <WhatsappIcon />
                <Footer />
            </div>
        );
    }

}

export default App;