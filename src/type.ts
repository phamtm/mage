import { Component } from './Component';
export * from './CompositeRenderer';
export * from './DOMRenderer';

// VDom related type
export type VNode = TextVNode | NonTextVNode | CompositeVNode;
export type TextVNode = string | number;

export interface NonTextVNode {
  readonly tag: string; // html node
  readonly props: Props;
  readonly children: VNode[];
}
export interface CompositeVNode {
  readonly tag: typeof Component;
  readonly props: Props;
  readonly children: VNode[];
}

export interface Props {
  readonly [key: string]: any;
}
export interface State {
  readonly [key: string]: any;
}

// Render related types
export interface MageHTMLElement extends HTMLElement {
  __rstate: RenderedState;
}
export interface RenderedState {
  tag: string;
  dom: MageHTMLElement;
  key?: null | string;
  props: Props;
  state?: State;
  children?: RenderedState[] | null;
}
export type RenderedDom = MageHTMLElement | Text;
export interface Renderer {
  getDom: () => RenderedDom;
  mount(): RenderedDom;
  unmount(): void;
  patch(vnode: VNode): void;
}
