import { Component } from 'Component';
import { CompositeVNode, NonTextVNode, Props, VNode } from 'type';
export * from './Component';
export * from './render';

export function h(
  tag: string | typeof Component,
  props: Props,
  ...children: VNode[]
): NonTextVNode | CompositeVNode {
  return {
    tag,
    props,
    children,
  } as NonTextVNode | CompositeVNode;
}
