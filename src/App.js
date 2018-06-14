import React, { Component } from 'react';
import './App.css';
//console.log(process.env)
const ip = process.env.REACT_APP_IP;
const BaseUrl = "http://"+ip+":4000/products?";
const limit = 20;
const currenncy = process.env.REACT_APP_CURRENCY || '$';
const sortOrders = [{name : "Size" , value : "size"} , {name : "Price" , value : "price"} , {name : "Date" , value : "date"} , {name : "ID" , value : "id"}];
let prePage = 1;
let preloaded = [];
class App extends Component {

  constructor(){
    super();
    this.state = {
      products : [],
      noMore : false
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.handleOrderChange = this.handleOrderChange.bind(this);
  }

  componentWillMount(){
     this.init();
  }

  componentDidMount(){
    window.addEventListener("scroll", this.handleScroll);
  }

  init(){
    this.loadPage(1)
     .then((products)=>{
      this.updateProducts(products);
      this.preloadProducts(2);
     });
  }

  updateProducts(products){
    let noMore = products.length == 0;
    if(noMore){
      this.setState({noMore});
    }
    else{
      let newData = this.state.products.concat(products),
        sortKey = this.state.selectedOrder;
        if(sortKey)
          newData = newData.sort((a , b)=>{ return sortKey === 'date' ? new Date(a[sortKey]) - new Date(b[sortKey]) : a[sortKey] - b[sortKey]});
        this.setState({products : newData});
    }
   }

  preloadProducts(page){
    this.loadPage(page)
    .then((products)=>{
      preloaded = products;
      console.log(preloaded);
    })
  }

  getPreloadedProducts(page){
    this.updateProducts(preloaded);
    this.preloadProducts(page);
  }

  loadPage(page){
    console.log(BaseUrl + "_page=" + page + "&_limit=" + limit)
    return fetch(BaseUrl + "_page=" + page + "&_limit=" + limit)
    .then((response)=> {
      return response.json();
    })
    .catch((error)=> {return error})
  }

  nextpage(){
    return ((this.state.products.length / limit) + 2);
  }

  handleScroll(event){ 
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
          let page = this.nextpage();
          if(page > prePage && !this.state.noMore)
           this.getPreloadedProducts(page);
    } 
    
  }

  handleOrderChange(changeEvent){
    let order = changeEvent.target.value;
    console.log(order)
    this.setState({
      selectedOrder: order,
      products:[],
      noMore:false
    },()=>this.init());
  }

  dateFormatter(date){
    let from = new Date(date).getTime(),
    now = new Date().getTime(),
    msInDay = 24 * 60 * 60 * 1000,
    differenceInMs = Math.abs(from - now),
    daysAgo = Math.round(differenceInMs/msInDay);
    let formatedDate;
    if(daysAgo < 7){
      formatedDate =  daysAgo + 'days ago';
    }
    else{
      let d = new Date(from);
      const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
      formatedDate =  d.getDate() +" "+ monthList[d.getMonth()] +" "+ d.getFullYear();
    }

    return formatedDate;

  }

  priceFormatter(price){
    return Number(price/100).toFixed(2);
  }

  renderProducts(){
    return(
      <div className = "gridContainer">
          {
            this.state.products.map((product , index)=>(
              <div className = "grid" key = {index}>
                <div className = "fontface" style = {{fontSize : product.size}} >{product.face}</div>
                <div className = "bottomsheet" >
                <div className = "pricetag">{currenncy} {this.priceFormatter(product.price)}</div>
                <div className = "sizetag" >Size: {product.size} Pixels</div>
                <div className = "datetag" >Uploaded {this.dateFormatter(product.date)}</div>
                </div>
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
              <span className = "radiolabel" >{order.name}</span>
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
            {this.state.noMore ? <div className = "nomoretag" >~ End of catalogue ~</div> : <div className = "loader" ></div>}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
