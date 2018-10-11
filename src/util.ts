import { RenderedDom } from 'type';

export function mountChildren(
  node: RenderedDom,
  children: RenderedDom | RenderedDom[]
) {
  if (Array.isArray(children)) {
    children.forEach(child => node.appendChild(child));
  } else {
    node.appendChild(children);
  }
}

export function isStringOrNumber(x: any) {
  return typeof x === 'string' || typeof x === 'number';
}
