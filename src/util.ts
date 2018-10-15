import { NonTextVNode, VNode } from 'type';

export function isStringOrNumber(x: any) {
  return typeof x === 'string' || typeof x === 'number';
}

export function isSameVNodeType(a: VNode, b: VNode): boolean {
  const isAText = isStringOrNumber(a);
  const isBText = isStringOrNumber(b);
  if (isAText && isBText) {
    return true;
  } else if (isAText || isBText) {
    return false;
  } else {
    return (a as NonTextVNode).tag === (b as NonTextVNode).tag;
  }
}
