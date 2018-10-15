import { RenderedDom, Renderer, TextVNode } from './type';

export class TextRenderer implements Renderer {
  private text: TextVNode;
  private dom: RenderedDom;

  constructor(text: TextVNode) {
    this.text = text;
  }

  public mount(): RenderedDom {
    this.dom = document.createTextNode(this.text + '');
    return this.dom;
  }

  public patch(text: TextVNode) {
    this.text = text;
    this.dom.nodeValue = text + '';
  }

  public unmount() {
    this.dom.remove();
  }

  public getDom() {
    return this.dom;
  }
}
