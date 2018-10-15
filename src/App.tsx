import { Component, h, render } from '../src/index';

class C extends Component {
  public render() {
    return <h2 style="color:purple">Take care</h2>;
  }
}

class B extends Component {
  public render() {
    return (
      <h1>
        World, <C />
      </h1>
    );
  }
}

class A extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: 'Hello',
      timer: 1,
    };

    setInterval(() => {
      this.setState({ timer: 1 - this.state.timer });
    }, 1000);
  }

  public render() {
    // console.log(this.state);
    return (
      <div className="flex flex-column">
        {this.state.timer}
        <div className="mt1">
          {this.state.timer > 0.5 ? <B /> : 'Not b'}
        </div>
        <input className="mt1" />
      </div>
    );
  }
}

render(<A />, document.getElementById('app'));
