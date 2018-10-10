import { RenderedNode } from 'type';

export function mountChildren(
  node: RenderedNode,
  children: RenderedNode | RenderedNode[]
) {
  if (Array.isArray(children)) {
    children.forEach(child => node.appendChild(child));
  } else {
    node.appendChild(children);
  }
}
