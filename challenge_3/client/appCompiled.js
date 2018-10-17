import React from 'React';

class App extends React.component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return React.createElement(SpecialList, {
      name: this.state.name
    });
  }

}
