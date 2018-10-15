import { enqueueUpdate } from './render';
import { Props, Renderer, State, VNode } from './type';

export class Component {
  public props: Props;
  public state: State;
  public renderer: Renderer;

  constructor(props: Props) {
    this.props = props || {};
    this.state = {};
  }

  /**
   * Return the vnode of the components
   */
  public render(): VNode {
    return null;
  }

  public patch() {
    this.renderer.patch(this.render());
  }

  protected setState(state: State) {
    Object.assign(this.state, state);
    enqueueUpdate(this);
  }
}
