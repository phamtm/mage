import CompositeComponent from './CompositeComponent';
import DomComponent from './DomComponent';

export function appendChildren(node, children) {
  if (Array.isArray(children)) {
    children.forEach(child => node.appendChild(child));
  } else {
    node.appendChild(child);
  }
}

export function instantiateAndMountComponent(descriptor) {
  const instance =
    descriptor && typeof descriptor.type === 'function'
      ? new CompositeComponent(descriptor)
      : new DomComponent(descriptor);
  instance.mount();
  return instance;
}