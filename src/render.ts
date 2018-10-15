import { __DEV__ } from 'constant';
import { Component } from './Component';
import { CompositeRenderer } from './CompositeRenderer';
import { DOMRenderer } from './DOMRenderer';
import { TextRenderer } from './TextRenderer';
import {
  CompositeVNode,
  NonTextVNode,
  Renderer,
  TextVNode,
  VNode,
} from './type';
import { isStringOrNumber } from './util';

window.mage = { root: null, internal: null };

const UpdateQueue: Component[] = [];

export function render(vnode: VNode, parent: HTMLElement) {
  const renderedInstance = mount(vnode);
  parent.appendChild(renderedInstance.getDom());
  window.mage.root = vnode;
  window.mage.internal = renderedInstance;
}

// export function unmountTree(node: MageHTMLElement) {
//   node.__rstate.
// }

export function enqueueUpdate(component: Component) {
  UpdateQueue.push(component);
  component.patch();
  UpdateQueue.pop();
}

export function instantiate(vnode: VNode): Renderer {
  if (isStringOrNumber(vnode)) {
    return new TextRenderer(vnode as TextVNode);
  }
  if (typeof (vnode as NonTextVNode).tag === 'string') {
    return new DOMRenderer(vnode as NonTextVNode);
  }
  return new CompositeRenderer(vnode as CompositeVNode);
}

export function mount(vnode: VNode): Renderer {
  const instance = instantiate(vnode);
  instance.mount();
  return instance;
}
