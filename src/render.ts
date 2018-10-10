import { Descriptor, State } from 'type';
import { Renderer } from 'type';
import { ComponentRenderer } from './ComponentRenderer';
import { ElementRenderer } from './ElementRenderer';

// const mounts = [];
interface Update {
  state: State;
  component: any;
}
const UpdateQueue: Update[] = [];

// render mageElement into the dom node `parent`
export function render(descriptor: Descriptor, parent: HTMLElement) {
  // create a new instance of mageElement
  const instance = mount(descriptor);
  parent.appendChild(instance.getBackingDom());
}

export function enqueueUpdate(partialState, component) {
  UpdateQueue.push({ state: partialState, component });
}

export function flushUpdate() {
  UpdateQueue.forEach(({ component, state }) => {
    component.update(state);
  });
}

export function mount(descriptor): Renderer {
  const instance =
    descriptor && typeof descriptor.type === 'function'
      ? new ComponentRenderer(descriptor)
      : new ElementRenderer(descriptor);
  instance.mount();
  return instance;
}
