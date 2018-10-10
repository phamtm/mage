import { Component } from './Component';
import { ComponentRenderer } from './ComponentRenderer';
import { ElementRenderer } from './ElementRenderer';
export * from './ComponentRenderer';
export * from './ElementRenderer';

export type Descriptor = MageElementDescriptor | MageComponentDescriptor | null;

export type MageElementDescriptor =
  | string // text node
  | number // text node
  | {
      readonly type: string; // html node
      readonly props: Props;
      readonly children: Descriptor[] | null;
    };

export type ComponentType = typeof Component;

export interface MageComponentDescriptor {
  readonly type: ComponentType;
  readonly props: Props;
  readonly children: Descriptor[] | null;
}

export interface Props {
  readonly [key: string]: any;
}
export interface State {
  readonly [key: string]: any;
}

// Renderer related
export type Renderer = ElementRenderer | ComponentRenderer;
export type RenderedNode = HTMLElement | Text;
