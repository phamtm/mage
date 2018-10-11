import { mount } from './render';
import { ComponentVNode, RendererTrait } from './type';

export class ComponentRenderer implements RendererTrait {
  private vnode: ComponentVNode;
  private child: RendererTrait | null;

  constructor(vnode: ComponentVNode) {
    this.vnode = vnode;
  }

  public mount() {
    // setup
    const { vnode: { tag, props } } = this;
    const component = new tag(props);
    component.renderer = this;

    // mount the vnode
    this.child = mount(component.render());
  }

  public patch() {
    // console.log('update');
  }

  public unmount() {
    // do something
  }

  public getDom() {
    return this.child.getDom();
  }
}
