# Mage

This is an implementation of React as noted [here](https://reactjs.org/docs/implementation-notes.html)

## Features

- [x] Reconciliation
- [x] Mount a single react tree
- [ ] Unmount a react tree at a node
- [ ] Lifecycle
- [ ] SVG
- [ ] Event handling
- [ ] Functional component
- [ ] Batched update
- [ ] Object style `style` attribute (currently a string)

## Example

- Modify `App.tsx`
- Run `npm start`


## Implementation Notes
Mage implementation notes

Features
- setState
- props
- eventHandling

Data structures
- Descriptor (virtual dom): Composite or Simple. 
- Mounted dom.__vnode = descriptor + rendering state

Mechanisms
- Mount -> Update
- Update(self) = Unmount + Mount new | Update-atrtibute + Update-children
    - Update-attribute = Add | Replace | Remove
    - Update-children = for each child -> Update(child)

How to find the differences between each render
- 

VDom structure

Prevtree
Current tree

VNode = {
	nodeName: string
	props: {}
	dom: Element
	parent?: VNode
}

Each vdom node is either a pure vnode or component 
1 VNode               
      VNode
   vnode(‘div’, {}, vnode)

2 VNode
      Component

3 Component
      VNode

Reconciliation = reconcile props + reconcile children

Reconcile props

Reconcile children
VNode:  
       O              O
     /       ->      /
  A                 B     

       O              O
     /       ->     
  A                 

       O              O
            ->      /
                   B     

       O              O
     /       ->      /
  A,B             A | ABC | BA | 


  different nodeName => rerender. 
      parentDom = oldVNode.dom.parent
      parentDom.replaceChild(render(newVNode),oldVNode.dom)
  same node: patched(dom, newVNode) how to maintain the previous node?
Component
  different nodeName => 

