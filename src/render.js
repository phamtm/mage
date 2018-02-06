import DomComponent from './DomComponent';
import CompositeComponent from './CompositeComponent';
import { instantiateAndMountComponent } from './util';

const mounts = [];

// render mageElement into the dom node `parent`
export default function render(descriptor, parent) {
  // create a new instance of mageElement
  const instance = instantiateAndMountComponent(descriptor);
  parent.appendChild(instance.getBackingDom());
}
