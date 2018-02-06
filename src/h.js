/*
nodeName: string | function
*/
export default function h(type, props, ...children) {
  return {
    type,
    props,
    children,
  };
}
