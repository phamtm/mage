import { instantiate } from './render';
import {
  DomVNode,
  MageHTMLElement,
  NonTextVNode,
  RenderedDom,
  RendererTrait,
} from './type';
import { isStringOrNumber } from './util';

export class DOMRenderer implements RendererTrait {
  private vnode: DomVNode;
  private dom: RenderedDom | null;
  private children: RendererTrait[] | null;

  constructor(vnode: DomVNode) {
    this.vnode = vnode;
  }

  public mount(): RenderedDom {
    const { vnode } = this;
    if (isStringOrNumber(vnode)) {
      this.dom = document.createTextNode(vnode + '');
    } else {
      this.dom = this.mountNonText(vnode as NonTextVNode);
    }
    return this.dom;
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
      if (key.startsWith('on')) {
        // TODO: handle event listener
      } else {
        dom.setAttribute(key, props[key]);
      }
    }

    if (Array.isArray(children)) {
      this.children = children.map(instantiate);
      this.children
        .map(child => child.mount())
        .forEach(childNode => dom.appendChild(childNode));
    }
    return dom;
  }
}
