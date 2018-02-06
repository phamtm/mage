export default class Component {
  constructor(props) {
    this.props = props || {};
    this.state = {};
  }

  setState(state) {
    console.log('setState');
  }
}