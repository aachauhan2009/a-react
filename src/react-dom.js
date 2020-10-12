// import { setDom } from "./virtaul-dom";
import { setCurrent, setCurrentIndex, getCurrent } from "./current";

const renderElement = (element, container) => {
  if(['string', 'number'].includes(typeof element)) {
    const textNode = document.createTextNode(element);
    container.appendChild(textNode);
    return;
  }

  if (typeof element.tagName === "function") {
    console.log(element);
    setCurrent({ ...element, container });
    const children = element.tagName(element.props);
    const current = getCurrent();
    setCurrent(null);
    setCurrentIndex(0);
    renderElement(children, container);
    console.log({ pendingEffects: current.pendingEffects})
    Object.keys(current.pendingEffects || {}).forEach((index) => {
      const e = current.pendingEffects[index];
      if (e.effect && typeof e.effect === "function") {
        if (e.cleanup && typeof e.cleanup === "function") {
          e.cleanup();
          e.cleanup = null;
        }
        e.cleanup = e.effect();
        e.effect = null;
      }
    });
    return;
  }
  const domElement = document.createElement(element.tagName);
  Object.keys(element.props || []).forEach(prop => {
    domElement[prop] = element.props[prop];
  });
  if(element.children) {
    element.children.forEach(child => {
      if (Array.isArray(child)) {
        child.forEach(c => {
          renderElement(c, domElement);
        })
      } renderElement(child, domElement);
    });
  }
  container.appendChild(domElement);
};

export const render = (element, container) => {
  renderElement(element, container);
}

export const rerender = (element, container) => {
  container.innerHTML = "";
  renderElement(element, container, false);
};

export default {
  render
};