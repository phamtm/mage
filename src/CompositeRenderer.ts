import { Component } from './Component';
import { instantiate } from './render';
import { CompositeVNode, RenderedDom, Renderer } from './type';

export class CompositeRenderer implements Renderer {
  private vnode: CompositeVNode;
  private innerInstance: Renderer;
  private compositeInstance: Component;

  constructor(vnode: CompositeVNode) {
    this.vnode = vnode;
  }

  public mount(): RenderedDom {
    // setup
    const { vnode: { tag, props } } = this;
    const component = new tag(props);
    this.compositeInstance = component;
    component.renderer = this;

    // mount the vnode
    this.innerInstance = instantiate(component.render());
    return this.innerInstance.mount();
  }

  public patch(newVNode: CompositeVNode) {
    // this vnode and vnode are of the same type
    this.compositeInstance.props = newVNode.props;
    this.vnode = newVNode;
    const nextVNode = this.compositeInstance.render();

    // Same type -> patch
    if (this.vnode.tag === newVNode.tag) {
      this.innerInstance.patch(nextVNode);
      return;
    }

    // Different type -> unmount old node and mount new node
    this.innerInstance.unmount();
    const prevDomNode = this.innerInstance.getDom();
    const nextRenderedInstance = instantiate(nextVNode);
    this.innerInstance = nextRenderedInstance;
    prevDomNode.parentNode.replaceChild(
      nextRenderedInstance.mount(),
      prevDomNode
    );
  }

  public unmount() {
    // do something
    this.innerInstance.unmount();
  }

  public getDom() {
    return this.innerInstance.getDom();
  }
}
