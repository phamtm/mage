import { Component } from './Component';
export * from './CompositeRenderer';
export * from './DOMRenderer';

export type VNode = DomVNode | CompositeVNode;

export type DomVNode = null | TextVNode | NonTextVNode;

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

export interface RendererTrait {
  getDom: () => RenderedDom;
  mount(): RenderedDom;
  unmount();
  patch();
}

export interface RenderedState {
  tag: string;
  dom: MageHTMLElement;
  key?: null | string;
  props: Props;
  state?: State;
  children?: RenderedState[] | null;
}

export interface MageHTMLElement extends HTMLElement {
  __rstate: RenderedState;
}
export type RenderedDom = MageHTMLElement | Text;
