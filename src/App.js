import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const ip = "192.168.1.11";
const BaseUrl = "http://"+ip+":4000/products?";
const limit = 20;
const currenncy = '$';
const sortOrders = [{name : "Size" , value : "size"} , {name : "Price" , value : "price"} , {name : "Id" , value : "id"}];
let prePage = 1;

class App extends Component {

  constructor(){
    super();
    this.state = {
      products : []
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.handleOrderChange = this.handleOrderChange.bind(this);
    this.loadProducts = this.loadProducts.bind(this);
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
          let newData = this.state.products.concat(jsondata),
          sortKey = this.state.selectedOrder;
          if(sortKey)
            newData = newData.sort((a , b)=>{ return a[sortKey] - b[sortKey]});
          console.log(sortKey)
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

  handleOrderChange(changeEvent){
    let order = changeEvent.target.value;
    console.log(order)
    this.setState({
      selectedOrder: order,
      products:[]
    },()=>this.loadProducts(1));
    
  }

  renderProducts(){
    return(
      <div className = "gridContainer">
          {
            this.state.products.map((product , index)=>(
              <div className = "grid" key = {index}>
                {product.face}
                <div>{currenncy} {product.price}</div>
                <div>Size: {product.size}</div>
              </div>

            ))
          }
        </div>
    )
  }

  renderMenu(){
    return(
      <div>
        <h3>Sort By: </h3>
        {
          sortOrders.map((order , index)=>(
          <div key = {index} className = "item">
            <label>
              <input type = "radio" name = "sort" value = {order.value} checked={this.state.selectedOrder === order.value}  onChange={this.handleOrderChange} />
              {order.name}
            </label>
          </div>
        ))}
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Font Faces</h1>
        </header>
        <div className = "row">
          <div className = "col col-20">
            {this.renderMenu()}
          </div>
          <div className = "col col-80">
            {this.renderProducts()}
          </div>
        </div>
        <div className = "loader" ></div>
      </div>
    );
  }
}

export default App;
