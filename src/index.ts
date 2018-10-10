import { Descriptor, Props } from 'type';
export * from './Component';
export * from './render';

export function h(
  type: any,
  props: Props,
  ...children: Descriptor[]
): Descriptor {
  return {
    type,
    props,
    children,
  };
}
