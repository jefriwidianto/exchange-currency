import React, { Component } from 'react';
import logo from './logo.svg';
import {Table, Col, Row, FormGroup, FormControl} from 'react-bootstrap';
import './App.css';

class App extends Component {

constructor(props) {
    super(props);
    this.deleteRow = this.deleteRow.bind(this);
    this.state = {
      error: null,
      isLoaded: false,
      items: {},
      currency: {},
      country:{},
      formatter:{},
      value_amount: 10000,
    };
  }

  componentDidMount() {
    fetch("https://exchangeratesapi.io/api/latest?base=USD")
      .then(res => res.json())
      .then(
         (result) => {
          var getCurrency = require('country-currency-map').getCurrency;
          var getCountry = require('country-currency-map').getCountry;
          var formatter = new Intl.NumberFormat('en-US', {
          currency: 'IDR',
          minimumFractionDigits: 2,
          });
          this.setState({
            isLoaded: true,
            items: result,
            currency: getCurrency,
            country: getCountry,
            formatter: formatter,
          });//console.log(this.state.items.rates);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  AddItemInList()
    {
      var list1 = document.getElementById('demo');
      var list =  document.getElementById('formControlsSelect');
      var val = list.options[list.selectedIndex].value;
      var value_amount = document.getElementById('test1').innerHTML;

      fetch("https://exchangeratesapi.io/api/latest?base=USD&symbols=" +val+"")
      .then(res => res.json())
      .then(
         (result) => {
          var getCurrency = require('country-currency-map').getCurrency;

          var amount = result.rates[val] * value_amount;
          var formatter = new Intl.NumberFormat('en-US', {
          currency: 'IDR',
          minimumFractionDigits: 2,
          });

          var row = list1.insertRow(-1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);

          cell1.innerHTML = "<div class='row'><div class='col-md-push-6 col-sm-2'><h4>" + val + "</h4></div><div class='col-md-pull-10 col-sm-10' ><h4>" + formatter.format(amount) + "</h4></div></div><h6 style='text-align:left;'><b><i>" + val + " - " + getCurrency(val).name + "</i></b></h6><h6 style='text-align:left;'><i> 1" + result.base + " = " + formatter.format(result.rates[val]) + "</i></h6>";
          cell2.innerHTML = "<p onclick={document.getElementById('demo').deleteRow(-1)}>(-)</p>";
          
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        });

         
    }

    deleteRow(r) {
      var i = r.target.parentNode.rowIndex;
      document.getElementById("demo").deleteRow(i);
    }


  render() {
          const { error, isLoaded, items, currency, country, formatter, value_amount} = this.state;
          if (error) {
            return <div>Error: {error.message}</div>;
          } else if (!isLoaded) {
            return <Row style={{
              flex: 2,
              flexDirection:'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}><img src={logo} className="App-logo" alt="logo" /></Row>;
          } else {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">USD-United State Dolars</h1>
        <Row className="show-grid">
          <Col sm={6} mdPush={6}>
            <code><h1>USD</h1></code>
          </Col>
          <Col sm={6} mdPull={6}>
            <code><h1 id="test1">{value_amount}</h1></code>
          </Col>
        </Row>
      </header><br />
      <Row>
        <Col md={4}></Col>
        <Col md={4}>
          <p id="test"></p>
          <Table striped bordered condensed hover id="demo">
            <tbody>
              <tr>
                <td>
                  <Row>
                    <Col sm={2} mdPush={6}>
                    <h4>{country('Indonesia').currency}</h4>
                    </Col>
                    <Col sm={10} mdPull={10}>
                    <h4>{formatter.format(items.rates['IDR'] * value_amount)}</h4>
                    </Col>
                  </Row>
                  <h6 style={{textAlign:'left', fontWeight: "bold", fontStyle: 'italic'}}>{country('Indonesia').currency} - {currency("IDR").name}</h6>
                  <h6 style={{textAlign:'left', fontStyle: 'italic'}}>1 {items.base} = {formatter.format(items.rates['IDR'])}</h6>
                </td>
                <td onClick={this.deleteRow}>(-)</td>
              </tr>
              <tr>
                <td>
                  <Row>
                    <Col sm={2} mdPush={6}>
                    <h4>EUR</h4>
                    </Col>
                    <Col sm={10} mdPull={10}>
                    <h4>{formatter.format(items.rates['EUR'] * value_amount)}</h4>
                    </Col>
                  </Row>
                  <h6 style={{textAlign:'left', fontWeight: "bold", fontStyle: 'italic'}}>EUR - {currency("EUR").name}</h6>
                  <h6 style={{textAlign:'left', fontStyle: 'italic'}}>1 {items.base} = {formatter.format(items.rates['EUR'])}</h6>
                </td>
                <td onClick={this.deleteRow}>(-)</td>
              </tr>
              <tr>
                <td>
                  <Row>
                    <Col sm={2} mdPush={6}>
                    <h4>{country('United Kingdom').currency}</h4>
                    </Col>
                    <Col sm={10} mdPull={10}>
                    <h4>{formatter.format(items.rates['GBP'] * value_amount)}</h4>
                    </Col>
                  </Row>
                  <h6 style={{textAlign:'left', fontWeight: "bold", fontStyle: 'italic'}}>{country('United Kingdom').currency} - {currency("GBP").name}</h6>
                  <h6 style={{textAlign:'left', fontStyle: 'italic'}}>1 {items.base} = {formatter.format(items.rates['GBP'])}</h6>
                </td>
                <td onClick={this.deleteRow}>(-)</td>
              </tr>
              <tr>
                <td>
                  <Row>
                    <Col sm={2} mdPush={6}>
                    <h4>{country('Singapore').currency}</h4>
                    </Col>
                    <Col sm={10} mdPull={10}>
                    <h4>{formatter.format(items.rates['SGD'] * value_amount)}</h4>
                    </Col>
                  </Row>
                  <h6 style={{textAlign:'left', fontWeight: "bold", fontStyle: 'italic'}}>{country('Singapore').currency} - {currency("SGD").name}</h6>
                  <h6 style={{textAlign:'left', fontStyle: 'italic'}}>1 {items.base} = {formatter.format(items.rates['SGD'])}</h6>
                </td>
                <td onClick={this.deleteRow}>(-)</td>
              </tr>
            </tbody>
          </Table>
          <FormGroup controlId="formControlsSelect" >
            <FormControl componentClass="select" placeholder="select">
              <option value="select">select</option>
              <option value="USD">USD</option>
              <option value="CAD">CAD</option>
              <option value="IDR">IDR</option>
              <option value="GBP">GBP</option>
              <option value="CHF">CHF</option>
              <option value="SGD">SGD</option>
              <option value="INR">INR</option>
              <option value="MYR">MYR</option>
              <option value="JPY">JPY</option>
              <option value="KRW">KRW</option>
            </FormControl>
          </FormGroup>
          <input id="Button1" type="button" value="Submit"  onClick={this.AddItemInList}/>
        </Col>
        <Col xsHidden md={4}></Col>
      </Row>
  </div> 
    );
    }
  }
}

export default App;


