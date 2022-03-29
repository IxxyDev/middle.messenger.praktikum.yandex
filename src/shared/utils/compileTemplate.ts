import {Block} from "../Block/Block";
import {REGISTERED_COMPONENTS} from "../registered-components";
import {ElementEvents, Props} from "../global";
import {set} from "./set-values-to-object";
import {getEventName} from "./get-event-name";
import {getPathFromArray} from "./get-path-from-array";
import {componentsState, ComponentState} from "../components-state";

export function compile(
  templatePugFn: (locals: Props) => string,
  props: Props,
  pageEventName: string,
  events: ElementEvents
): DocumentFragment {
  const parser = new DOMParser();
  const template: string = templatePugFn(props);
  let elementBody: HTMLElement;

  try {
    elementBody = parser.parseFromString(template, 'text/html').body;

    Object.keys(REGISTERED_COMPONENTS).forEach(componentName => {
      const childElementTags = elementBody.querySelectorAll(componentName);

      if (!childElementTags.length) {
        return;
      }

      childElementTags.forEach((element: Element) => {
        const dataName = element.getAttribute("data");

        if (!dataName) {
          console.error(`Attribute data was not specified in the markup for the ${element}`);
          return;
        }

        let data = props[dataName] as Props;

        if (data === undefined) {
          console.error(`Property ${dataName} was not specified in the Props for the ${element}`);
          return;
        }

        const path = getPathFromArray([pageEventName, dataName]);

        if (Array.isArray(data)) {
          const childComponents = Object.values(data)
            .map((value: Props) => {
              const component = getComponent(componentName, pageEventName, dataName, value, events);

              set(componentsState, path, component);

              return component;
            });

          setAttributes(element, childComponents);
        } else {
          const childComponent = getComponent(componentName, pageEventName, dataName, data, events);

          set(componentsState, path, childComponent);

          setAttributes(element, [childComponent]);
        }
      })
    });
  } catch (err: unknown) {
    throw new Error(`Template compilation failed due to ${String(err)}`);
  }

  const fragment = document.createDocumentFragment();

  Array.from(elementBody.children).forEach(elem => {
    fragment.appendChild(elem);
  });

  return fragment;
}

function getComponentInstance(componentName: string, props: unknown, eventName: string, events: Events): InstanceType<typeof Block> {
  return new REGISTERED_COMPONENTS[componentName](props, eventName, events);
}

function setAttributes(childElementTag: Element, childComponents: InstanceType<typeof Block>[]): void {
  const attributeNames = childElementTag.getAttributeNames();

  const childElements = childComponents.map(childComponent => {
    const childElement = childComponent.getContent();

    attributeNames.forEach(attrName => {
      const attrValue = childElementTag.getAttribute(attrName);

      if (attrName === 'class') {
        childElement.classList.add(attrValue ?? '');
        return;
      }

      childElement.setAttribute(attrName, attrValue ?? '');
    });

    return childElement as Node;
  });

  childElementTag.replaceWith(...childElements);
}

function getComponent(componentName: string, pageEventName: string, dataName: string, props: Props, events: Events): InstanceType<typeof Block> {
  let component = getValueFromObjectByPath(componentsState, getPathFromArray([pageEventName, dataName]));

  if (component) {
    component.destroy();
  }

  return getComponentInstance(componentName, props, getEventName(pageEventName, dataName), events);
}

function getValueFromObjectByPath(state: ComponentState, path: string): InstanceType<typeof Block> | undefined {
  const pathArray = path.split('.');

  return pathArray.reduce((acc: ComponentState, key: string) => acc && acc[key], state);
}