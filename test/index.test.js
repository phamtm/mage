import { h, render, Component } from '../src/index';

class B extends Component {
  render() {
    return <h2>Take care</h2>;
  }
}

class A extends Component {
  render() {
    return <h1>World, <B/></h1>;
  }
}

class C extends Component {
  render() {
    return (
      <div>
        Hello <A />
      </div>
    );
  }
}

render(
  <C />,
  document.getElementById('app')
);
