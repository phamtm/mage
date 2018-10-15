import { instantiate } from './render';
import { MageHTMLElement, NonTextVNode, Renderer } from './type';
import { isSameVNodeType } from './util';

export class DOMRenderer implements Renderer {
  private vnode: NonTextVNode;
  private dom: MageHTMLElement;
  private subRenderers: Renderer[] | null;

  constructor(vnode: NonTextVNode) {
    this.vnode = vnode;
  }

  public mount(): MageHTMLElement {
    const { children, props } = this.vnode;
    const dom = document.createElement(this.vnode.tag) as MageHTMLElement;

    // add props
    for (const key in props) {
      if (key.startsWith('on')) {
        // TODO: handle event listener
      } else {
        dom.setAttribute(key, props[key]);
      }
    }

    if (Array.isArray(children)) {
      this.subRenderers = children.map(instantiate);
      this.subRenderers
        .map(child => child.mount())
        .forEach(childNode => dom.appendChild(childNode));
    }
    this.dom = dom;
    return dom;
  }

  public patch(newVnode: NonTextVNode) {
    const { dom, vnode: { props: prevProps } } = this;
    const { props: nextProps } = newVnode;

    // patch dom attrs
    for (const k in prevProps) {
      if (!nextProps.hasOwnProperty(k)) {
        dom.removeAttribute(k);
      }
    }
    for (const k in nextProps) {
      dom.setAttribute(k, nextProps[k]);
    }

    // patch children
    const prevChildrenVnodes = this.vnode.children;
    const nextChildrenVnodes = newVnode.children;
    this.vnode = newVnode;

    // const updates: UpdateOp[] = [];
    // console.log('patch', prevChildrenVnodes, nextChildrenVnodes);

    for (let i = 0; i < prevChildrenVnodes.length; i++) {
      const prevChildNode = prevChildrenVnodes[i];
      if (i > nextChildrenVnodes.length) {
        // updates.push({ type: 'REMOVE', vnode: prevChildNode });
        const prevChildRenderer = this.subRenderers[i];
        prevChildRenderer.unmount();
        prevChildRenderer.getDom().remove();
        this.subRenderers.splice(i, 1);
      } else {
        const nextChildVnode = nextChildrenVnodes[i];
        if (isSameVNodeType(prevChildNode, nextChildVnode)) {
          this.subRenderers[i].patch(nextChildVnode);
        } else {
          // unmount prev node
          const prevChildRenderer = this.subRenderers[i];

          // mount new node (replace old one)
          const nextChildRenderer = instantiate(nextChildVnode);
          this.dom.replaceChild(
            nextChildRenderer.mount(),
            prevChildRenderer.getDom()
          );
          this.subRenderers[i] = nextChildRenderer;
          prevChildRenderer.unmount();
          prevChildRenderer.getDom().remove();
        }
      }
    }

    // Add the remaining new vnodes
    for (
      let i = prevChildrenVnodes.length;
      i < nextChildrenVnodes.length;
      i++
    ) {
      const subRenderer = instantiate(nextChildrenVnodes[i]);
      this.dom.appendChild(subRenderer.mount());
      this.subRenderers.push(subRenderer);
    }
  }

  public unmount() {
    // do something
    if (this.subRenderers) {
      this.subRenderers.map(child => child.unmount());
    }
    // this.dom.remove();
  }

  public getDom() {
    return this.dom;
  }
}
