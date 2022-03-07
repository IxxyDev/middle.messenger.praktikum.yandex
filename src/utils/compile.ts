import Block, {Props} from "../components/Block";

export function compile(tmpl: (ctx: Record<string, any>) => string, props: any): DocumentFragment {
  const fragment = document.createElement('template');
  const components: Record<string, Block<Props>> = {};

  Object.entries(props).forEach(([name, value]) => {
    // Определяем, какие из переменных контекста — компоненты. Можно так не запариваться и просто передавать их отдельным параметром функции
    if (value instanceof Block) {
      components[value.id] = value; // сохраняем компонент
      props[name] = `<div id="id-${value.id}"></div>`; // делаем заглушку
    }
    if (Array.isArray(value)) {
      props[name] = value.map(item => {
        if (item instanceof Block) {
          components[item.id] = item;
          return `<div id="id-${item.id}"></div>`;
        }

        return item;
      });
    }
  });

  fragment.innerHTML = tmpl(props); // или Handlebars.compile(tmpl, context), если tmpl — строка

  Object.entries(components).forEach(([id, component]) => {
    const stub = fragment.content.querySelector(`#id-${id}`);

    if(!stub) {
      return;
    }

    stub.replaceWith(component.getContent()); // render должен вернуть HTMLElement
  });

  return fragment.content;
}
