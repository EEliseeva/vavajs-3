import React from 'react'
import { Link } from 'react-router-dom';

export default class Form extends React.Component {
    constructor(props) {
      super(props);
      this.state = {name: '', email: '', address: '', items: this.props.items};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({[event.target.name]:event.target.value});
    }
  
    handleSubmit(state) {
      console.log('A form was submitted:')
      console.log(state);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state)
      };
      fetch('http://localhost:8000/order', requestOptions)
    }
  
    render() {
      return (
        <form>
          <label>
            Name:
            <input name="name" type="text" value={this.state.name} onChange={this.handleChange} />
          </label>
          <label>
            Email:
            <input name="email" type="email" value={this.state.email} onChange={this.handleChange} />
          </label>
          <label>
            Address:
            <input name="address" type="text" value={this.state.address} onChange={this.handleChange} />
          </label>
          <Link to='/ad' onClick={()=>{
            this.handleSubmit(this.state)
          }}> SUBMIT </Link>
        </form>
      );
    }
  }