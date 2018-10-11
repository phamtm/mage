import { Component } from './Component';
import { ComponentRenderer } from './ComponentRenderer';
import { ElementRenderer } from './ElementRenderer';
import {
  ComponentVNode,
  ElementVNode,
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

export function mount(vnode: VNode): RendererTrait {
  const instance =
    isStringOrNumber(vnode) || typeof (vnode as NonTextVNode).tag === 'string'
      ? new ElementRenderer(vnode as ElementVNode)
      : new ComponentRenderer(vnode as ComponentVNode);
  instance.mount();
  return instance;
}
