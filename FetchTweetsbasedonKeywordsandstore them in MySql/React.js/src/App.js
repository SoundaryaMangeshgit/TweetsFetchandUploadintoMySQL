import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React from 'react';

class App extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state={apiResponse:[],
    search_term:''};

  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { search_term} = this.state;

    const book = {
      search_term
     
    };

    axios
      .post('http://localhost:9000/testAPI', book)
      .then(() => console.log('Book Created'))
      .catch(err => {
        console.error(err);
      });
      this.callAPI();
  };
    
    
    

  callAPI(){
    console.log("i am inside fetch api");
    fetch("http://localhost:9000/testAPI")
    .then(res=> res.text())
    .then(res=> this.setState({apiResponse:res}));
  }
  



render(){
  return (
    <div className="App">
      <form onSubmit={this.handleSubmit}>
            <div style={{ width: '30%' }} className="form-group">
              <input
                type="text"
                className="form-control"
                name="search_term"
                placeholder="search_term "
                onChange={this.handleInputChange}
              />
            </div>
      <header className="App-header">
        
        <p>
          {this.state.apiResponse}
        </p>
       
      </header>
      </form>
    </div>
  );
}
}

export default App;
