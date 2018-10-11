import { Component } from './Component';
import { CompositeRenderer } from './CompositeRenderer';
import { DOMRenderer } from './DOMRenderer';
import {
  CompositeVNode,
  DomVNode,
  NonTextVNode,
  RendererTrait,
  State,
  VNode,
} from './type';
import { isStringOrNumber } from './util';

interface Update {
  state: State;
  component: Component;
}
const UpdateQueue: Update[] = [];

export function render(vnode: VNode, parent: HTMLElement) {
  parent.appendChild(mount(vnode).getDom());
}

export function enqueueUpdate(partialState: State, component: Component) {
  UpdateQueue.push({ state: partialState, component });
}

export function flushUpdate() {
  UpdateQueue.forEach(({ component }) => {
    component.renderer.patch();
  });
}

export function instantiate(vnode: VNode): RendererTrait {
  return isStringOrNumber(vnode) ||
  typeof (vnode as NonTextVNode).tag === 'string'
    ? new DOMRenderer(vnode as DomVNode)
    : new CompositeRenderer(vnode as CompositeVNode);
}

export function mount(vnode: VNode): RendererTrait {
  const instance = instantiate(vnode);
  instance.mount();
  return instance;
}
