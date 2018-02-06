import { appendChildren, instantiateAndMountComponent } from './util';

export default class DomComponent {
  constructor(descriptor) {
    this.descriptor = descriptor;
  }

  mount() {
    console.group('mount');
    const { descriptor } = this;
    this.dom =
      typeof descriptor === 'string'
        ? document.createTextNode(descriptor)
        : document.createElement(descriptor.type);

    const { children, props } = descriptor;
    console.log(descriptor);
    // add props
    for (let key in props) {
      const prop = props[key];
      if (key.startsWith('on')) {
        // TODO: handle event listener
      } else {
        // TODO: handle children and style props
        this.dom.setAttribute(name, prop);
      }
    }

    if (Array.isArray(children)) {
      this.renderedChildren = children.map(descriptor =>
        instantiateAndMountComponent(descriptor)
      );
      console.log('renderedChildren', this.renderedChildren);
      appendChildren(
        this.dom,
        this.renderedChildren.map(child => child.getBackingDom())
      );
    }
    console.groupEnd('mount');
  }

  update() {}

  getBackingDom() {
    return this.dom;
  }
}
