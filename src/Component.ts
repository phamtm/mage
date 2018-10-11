import { enqueueUpdate } from './render';
import { Props, RendererTrait, State, VNode } from './type';

export class Component {
  public props: Props;
  public state: State;
  public renderer: RendererTrait;

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

  protected setState(state: State) {
    enqueueUpdate(state, this);
  }
}
