//import React from 'React';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.userId = undefined;
    this.state = {
      userdata: {
        name: '',
        password: '',
        email: 'nope@nope.com'
      },
      address: {
        line1: '',
        line2: '',
        city: '',
        state: '',
        zip: undefined
      },
      billing: {
        cardNo: '',
        expMM: '',
        expYY: '',
        CVV: '',
        billzip: undefined
      },
      currentForm: 0
    };
  }

  changeFormValue(e, category, fieldName) {
    this.setState({
      [category]: Object.assign({}, this.state[category], {
        [fieldName]: e.target.value
      })
    }); //setTimeout(() => console.log(this.state), 100);
  }

  submit(category) {
    let dataToSend = {
      userId: this.userId,
      data: this.state[category]
    };
    fetchIt('http://localhost:3000/updatecheckout', dataToSend, responseData => {
      console.log(typeof responseData, responseData);
      this.userId = this.userId || responseData.userId;
      console.log(this.userId);
      this.setState({
        currentForm: this.state.currentForm + 1
      });
    });
  }

  render() {
    switch (this.state.currentForm % 3) {
      case 0:
        return React.createElement(FormOne, {
          update: (e, field) => this.changeFormValue(e, 'userdata', field),
          submit: () => this.submit('userdata')
        });

      case 1:
        return React.createElement(FormTwo, {
          update: (e, field) => this.changeFormValue(e, 'address', field),
          submit: () => this.submit('address')
        });

      case 2:
        return React.createElement(FormThree, {
          update: (e, field) => this.changeFormValue(e, 'billing', field),
          submit: () => this.submit('billing')
        });

      default:
        return React.createElement(FormOne, {
          update: (e, field) => this.changeFormValue(e, 'userdata', field),
          submit: () => this.submit('userdata')
        });
    }
  }

}

const FormOne = props => React.createElement("div", null, React.createElement("div", null, "name: ", React.createElement("input", {
  type: "text",
  onChange: e => props.update(e, 'name')
})), React.createElement("div", null, "password: ", React.createElement("input", {
  type: "password",
  onChange: e => props.update(e, 'password')
})), React.createElement("div", null, "email: ", React.createElement("input", {
  type: "text",
  onChange: e => props.update(e, 'email')
})), React.createElement("button", {
  onClick: props.submit
}, "next"));

const FormTwo = props => React.createElement("div", null, React.createElement("div", null, "address: ", React.createElement("input", {
  type: "text",
  onChange: e => props.update(e, 'line1')
}), " ", React.createElement("br", null), React.createElement("input", {
  type: "text",
  onChange: e => props.update(e, 'line2')
})), React.createElement("div", null, "city: ", React.createElement("input", {
  type: "text",
  onChange: e => props.update(e, 'city')
})), React.createElement("div", null, "state: ", React.createElement("input", {
  type: "text",
  onChange: e => props.update(e, 'state')
})), React.createElement("div", null, "zip code: ", React.createElement("input", {
  type: "text",
  onChange: e => props.update(e, 'zip')
})), React.createElement("button", {
  onClick: props.submit
}, "next"));

const FormThree = props => React.createElement("div", null, React.createElement("div", null, "card number: ", React.createElement("input", {
  type: "text",
  onChange: e => props.update(e, 'cardNo')
})), React.createElement("div", null, "expiration date MM/YY: ", React.createElement("input", {
  type: "text",
  onChange: e => props.update(e, 'expMM')
}), React.createElement("input", {
  type: "text",
  onChange: e => props.update(e, 'expYY')
})), React.createElement("div", null, "CVV: ", React.createElement("input", {
  type: "password",
  onChange: e => props.update(e, 'CVV')
})), React.createElement("div", null, "billing zip: ", React.createElement("input", {
  type: "text",
  onChange: e => props.update(e, 'billzip')
})), React.createElement("button", {
  onClick: props.submit
}, "buy"));

const fetchIt = (url, data, cb) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => res.json()).then(data => cb(data));
};

let app = document.getElementById('app');
ReactDOM.render(React.createElement(App, null), app);
