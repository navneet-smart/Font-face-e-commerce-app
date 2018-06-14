import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const ip = "192.168.1.11";
const BaseUrl = "http://"+ip+":4000/products?";
const limit = 20;
let prePage = 1;
class App extends Component {

  constructor(){
    super();
    this.state = {
      products : []
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentWillMount(){
      this.loadProducts(1);
  }

  componentDidMount(){
    window.addEventListener("scroll", this.handleScroll);
  }

  loadProducts(page){
    prePage = page;
    console.log(BaseUrl + "_page=" + page + "&_limit=" + limit)
    fetch(BaseUrl + "_page=" + page + "&_limit=" + limit)
    .then((response)=> {
      return response.json();
    })
    .then((jsondata)=>{
        //if(jsondata.length)
          let newData = this.state.products.concat(jsondata);
          this.setState({products : newData});
    })
    .catch((error)=>console.log(error))
  }

  nextpage(){
    return ((this.state.products.length / limit) + 1);
  }

  handleScroll(event){ 
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
          let page = this.nextpage();
          if(page > prePage)
           this.loadProducts(page);
    } 
    
  }

  render() {
    var self = this;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Font Faces</h1>
        </header>
        <div className = "gridContainer" ref={self.paneDidMount}>
          {
            this.state.products.map((product , index)=>(
              <div className = "grid" key = {index}>
                {product.face}
              </div>

            ))
          }
        </div>
        <div className = "loader" ></div>
      </div>
    );
  }
}

export default App;
