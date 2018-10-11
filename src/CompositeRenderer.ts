import { instantiate } from './render';
import { CompositeVNode, RenderedDom, RendererTrait } from './type';

export class CompositeRenderer implements RendererTrait {
  private vnode: CompositeVNode;
  private child: RendererTrait | null;

  constructor(vnode: CompositeVNode) {
    this.vnode = vnode;
  }

  public mount(): RenderedDom {
    // setup
    const { vnode: { tag, props } } = this;
    const component = new tag(props);
    component.renderer = this;

    // mount the vnode
    this.child = instantiate(component.render());
    return this.child.mount();
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
