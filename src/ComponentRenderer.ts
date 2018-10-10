import { mount } from './render';
import { MageComponentDescriptor, Renderer } from './type';

export class ComponentRenderer {
  private descriptor: MageComponentDescriptor;
  private childInstance: Renderer;

  constructor(descriptor) {
    this.descriptor = descriptor;
  }

  public mount() {
    // console.group("mount:composite");

    // setup
    const { descriptor: { type, props } } = this;
    const descInstance = new type(props);
    descInstance.renderer = this;

    // mount
    const renderDescriptor = descInstance.render();
    // console.log("rd", renderDescriptor);
    const childInstance = mount(renderDescriptor);
    this.childInstance = childInstance;

    // console.groupEnd("mount:composite");
  }

  public update() {
    // console.log('update');
  }

  public getBackingDom() {
    return this.childInstance.getBackingDom();
  }
}
