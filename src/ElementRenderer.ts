import { mount } from './render';
import {
  ElementVNode,
  MageHTMLElement,
  NonTextVNode,
  RenderedDom,
  RendererTrait,
} from './type';
import { isStringOrNumber, mountChildren } from './util';

export class ElementRenderer implements RendererTrait {
  private vnode: ElementVNode;
  private dom: RenderedDom;
  private children: RendererTrait[] | null;

  constructor(vnode: ElementVNode) {
    this.vnode = vnode;
  }

  public mount() {
    const { vnode } = this;
    if (isStringOrNumber(vnode)) {
      this.dom = document.createTextNode(vnode + '');
    } else {
      this.dom = this.mountNonText(vnode as NonTextVNode);
    }
  }

  public patch() {
    if (isStringOrNumber(this.vnode)) {
      return;
    }
    const { props } = this.vnode as NonTextVNode;

    // update dom attrs
    for (const k in props) {
      (this.dom as MageHTMLElement).setAttribute(k, props[k]);
    }

    // update children
    // if (children) {
    // }
  }

  public unmount() {
    // do something
  }

  public getDom() {
    return this.dom;
  }

  private mountNonText(vnode: NonTextVNode): MageHTMLElement {
    const { children, props } = vnode;
    const dom = document.createElement(vnode.tag) as MageHTMLElement;
    dom.__rstate = {
      tag: vnode.tag,
      dom,
      props,
      children: null,
    };

    // console.log(descriptor);
    // add props
    for (const key in props) {
      const prop = props[key];
      if (key.startsWith('on')) {
        // TODO: handle event listener
      } else {
        // TODO: handle children and style props
        dom.setAttribute(name, prop);
      }
    }

    // console.log('children', children);
    if (Array.isArray(children)) {
      this.children = children.map(child => mount(child));
      mountChildren(dom, this.children.map(child => child.getDom()));
    }
    return dom;
  }
}
