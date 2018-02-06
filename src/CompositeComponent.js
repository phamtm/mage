import { instantiateAndMountComponent } from './util';

export default class CompositeComponent {
  constructor(descriptor) {
    this.descriptor = descriptor;
  }

  mount() {
    console.group('mount:composite');
    const { descriptor: { type: ctor, props } } = this;
    const instance = new ctor(props);
    const renderDescriptor = instance.render();
    console.log('rd', renderDescriptor);
    const childInstance = instantiateAndMountComponent(renderDescriptor);
    this.childInstance = childInstance;
    console.groupEnd('mount:composite');
  }

  update() {}

  getBackingDom() {
    return this.childInstance.getBackingDom();
  }
}
