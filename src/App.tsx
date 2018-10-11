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
    // setTimeout(
    //   () => this.setState({ msg: "Xin chao", timer: this.state.timer }),
    //   2000
    // );
    setInterval(() => this.setState({ timer: this.state.timer + 1 }), 1000);
  }

  public render() {
    // console.log(this.state);
    return (
      <div>
        yo
        {this.state.timer}
        <B />
        <B />
      </div>
    );
  }
}

render(<A />, document.getElementById('app'));
