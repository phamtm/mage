# Mage implementation notes

## Problems

Mount:
How to translate a vdom to real dom node
Insert it into the dom tree.
Update: when calling setState, how do you Update
Find out which node to be updated
Update properties
Update children
Add new child
Remove some children
How to remove a component:
Remove existing
Update some child
Event handling
Advance
reuse dom node
reuse component instances
browser compats

Data structures

## LIMITATIONS

- cannot support children props
- don't support functional components

```js
App > Main > div;
div > span > 'hello';
```
