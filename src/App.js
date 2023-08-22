import { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from 'axios'



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      message: ''
    }
  }
  handleSubmit(e){
    e.preventDefault();
    axios({
      method: "POST",
      url:"http://localhost:3002/send",
      data:  this.state
    }).then((response)=>{
      if (response.data.status === 'success') {
        alert("Message Sent.");
        this.resetForm()
      } else if (response.data.status === 'fail') {
        alert("Message failed to send.")
      }
    })
  }
  resetForm(){
    this.setState({ email: "" , message: ""})
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
           Fill the form to make a complain on Nursultan Begenov
          </p>
        <Form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
          <Form.Group className="mb-3" controlId="formBasicEmail" value={this.state.email} onChange={this.onEmailChange.bind(this)}>
            <Form.Label htmlFor="exampleInputEmail1">Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
        
          <Form.Group className="mb-3" controlId="text" value={this.state.message} onChange={this.onMessageChange.bind(this)}>
            <Form.Label htmlFor="message">We'll never share your complain with anyone else.</Form.Label>
            <Form.Control type="text" placeholder="What's wrong with Nursultan?" />
          </Form.Group>
          <Button variant='primary' type="submit" >Send</Button>
        </Form>
        
        </header>
      </div>
  );
}
  onEmailChange(event) {
    this.setState({email: event.target.value})
}
  onMessageChange(event) {
    this.setState({message: event.target.value})
}
}
export default App;
