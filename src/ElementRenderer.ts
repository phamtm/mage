import { mount } from './render';
import { MageElementDescriptor, RenderedNode, Renderer } from './type';
import { mountChildren } from './util';

export class ElementRenderer {
  private descriptor: MageElementDescriptor;
  private dom: RenderedNode;
  private renderedChildren: Renderer[];

  constructor(descriptor) {
    this.descriptor = descriptor;
  }

  public mount() {
    // console.group('mount');
    const { descriptor } = this;
    this.dom =
      typeof descriptor === 'string' || typeof descriptor === 'number'
        ? document.createTextNode(descriptor + '')
        : document.createElement(descriptor.type);

    if (typeof descriptor === 'string' || typeof descriptor === 'number') {
      return;
    }

    const { children, props } = descriptor;
    // console.log(descriptor);
    // add props
    for (const key in props) {
      if (props.hasOwnProperty(key)) {
        const prop = props[key];
        if (key.startsWith('on')) {
          // TODO: handle event listener
        } else {
          // TODO: handle children and style props
          (this.dom as HTMLElement).setAttribute(name, prop);
        }
      }
    }

    // console.log('children', children);
    if (Array.isArray(children)) {
      this.renderedChildren = children.map(child => mount(child));
      // console.log('renderedChildren', this.renderedChildren);
      mountChildren(
        this.dom,
        this.renderedChildren.map(child => child.getBackingDom())
      );
    }
    // console.groupEnd('mount');
  }

  public update() {
    if (
      typeof this.descriptor === 'string' ||
      typeof this.descriptor === 'number'
    ) {
      return;
    }
    const { props } = this.descriptor;

    // update dom attrs
    for (const k in props) {
      if (props.hasOwnProperty(k)) {
        (this.dom as HTMLElement).setAttribute(k, props[k]);
      }
    }

    // update children
    // if (children) {
    // }
  }

  public getBackingDom() {
    return this.dom;
  }
}
