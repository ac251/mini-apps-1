import React from 'React';

class App extends React.component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  
  render() {
    return (
    <SpecialList name={this.state.name}></SpecialList>
    )
  }
}

