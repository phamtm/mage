import { enqueueUpdate } from './render';
import { Descriptor, Props, Renderer, State } from './type';

export class Component {
  public props: Props;
  public state: State;
  public renderer: Renderer;

  constructor(props) {
    this.props = props || {};
    this.state = {};
  }

  public render(): Descriptor {
    return null;
  }

  protected setState(state: State) {
    enqueueUpdate(state, this);
    this.renderer.update();
  }
}
