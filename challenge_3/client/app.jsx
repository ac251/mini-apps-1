//import React from 'React';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.userId = undefined;
    this.state = {
      
        userdata: {
          name: '',
          password: '',
          email: 'nope@nope.com',
        },
        address: {
          line1: '',
          line2: '',
          city: '',
          state: '',
          zip: undefined,
        },
        billing: {
          cardNo: '',
          expMM: '',
          expYY: '',
          CVV: '',
          billzip: undefined,
        },
        
      
      currentForm: 0
    }
    
  }
  
  changeFormValue(e, category, fieldName) {
    this.setState({[category]: Object.assign({}, this.state[category], {[fieldName]: e.target.value})});
    //setTimeout(() => console.log(this.state), 100);
  }
  
 
  submit(category) {
    let dataToSend = {userId: this.userId, data: this.state[category]};
    fetchIt('http://localhost:3000/updatecheckout', dataToSend, (responseData) => {
      console.log(typeof responseData, responseData);
      this.userId = this.userId || responseData.userId;
      console.log(this.userId);
      this.setState({currentForm: this.state.currentForm + 1});
    });
    
  }
  
  
  render() {
    
    switch(this.state.currentForm % 3) {
      case 0: 
        return (<FormOne update={(e, field) => this.changeFormValue(e, 'userdata', field)}
          submit={() => this.submit('userdata')}
          />);
      case 1:
        return (<FormTwo update={(e, field) => this.changeFormValue(e, 'address', field)}
          submit={() => this.submit('address')}
          />);
      case 2:
        return (<FormThree update={(e, field) => this.changeFormValue(e, 'billing', field)}
          submit={() => this.submit('billing')}
          />);
      default:
        return (<FormOne update={(e, field) => this.changeFormValue(e, 'userdata', field)}
          submit={() => this.submit('userdata')}
          />);
        
    }
    
  }
}

const FormOne = (props) => (
  <div>
    <div>
      name: <input type="text" onChange={(e) => props.update(e, 'name')}/>
    </div>
    <div>
      password: <input type="password" onChange={(e) => props.update(e, 'password')}/>
    </div>
    <div>
      email: <input type="text" onChange={(e) => props.update(e, 'email')}/>
    </div>
    <button onClick={props.submit}>next</button>
  </div> 
);

const FormTwo = (props) => (
  <div>
    <div>
    address: <input type="text" onChange={e => props.update(e, 'line1')}/> <br/>
    <input type="text" onChange={e => props.update(e, 'line2')}/>
    </div>
    <div>
      city: <input type="text" onChange={e => props.update(e, 'city')}/>
    </div>
    <div>
      state: <input type="text" onChange={e => props.update(e, 'state')}/>
    </div>
    <div>
      zip code: <input type="text" onChange={e => props.update(e, 'zip')}/>
    </div>
    <button onClick={props.submit}>next</button>
  </div>
);

const FormThree = (props) => (
  <div>
    <div>
      card number: <input type="text" onChange={e => props.update(e, 'cardNo')}/>
    </div>
    <div>
      expiration date MM/YY: <input type="text" onChange={e => props.update(e, 'expMM')}/>
      <input type="text" onChange={e => props.update(e, 'expYY')}/>
    </div>
    <div>
      CVV: <input type="password" onChange={e => props.update(e, 'CVV')}/>
    </div>
    <div>
      billing zip: <input type="text" onChange={e => props.update(e, 'billzip')}/>
    </div>
    <button onClick={props.submit}>buy</button>
  </div>
);

const fetchIt = (url, data, cb) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {'content-type': 'application/json'}
  })
  .then(res => res.json())
  .then(data => cb(data));
  
};


let app = document.getElementById('app');
ReactDOM.render(<App/>, app);