export function addClass(_element: any, props: any) {
  if(Array.isArray(props.classNames)) {
    return _element.classList.add(...props.classNames);
  } else {
    return _element.classList.add(props.classNames);
  }
}