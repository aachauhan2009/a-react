import { getCurrent, getCurrentIndex, setCurrentIndex } from "./current";
import { rerender } from "./react-dom";


function createFunctionalComponent(fn, props, children) {
  return { tagName: fn, props, children };
}

export const createElement = (tagName, props, ...children) => {
  if(typeof tagName === 'function') {
     return createFunctionalComponent(tagName, props, children);
  }
  return {
    tagName,
    props,
    children
  };
}

export const useState = (initialValue) => {
  const current = getCurrent();
  const currentIndex = getCurrentIndex();
  current.hooks = current.hooks || [];
  current.hooks[currentIndex] = current.hooks[currentIndex] || initialValue;
  setCurrentIndex(currentIndex + 1);
  function setValue(newValue) {
    current.hooks[currentIndex] = newValue;
    rerender(current, current.container)
  }
  const value = current.hooks[currentIndex];
  return [value, setValue];
}

export const useEffect = (effect, deps) => {
  const current = getCurrent();
  const currentIndex = getCurrentIndex();
  current.hooks = current.hooks || [];
  const oldEffect = current.hooks[currentIndex];
  if(oldEffect) {
    const shouldRun = oldEffect.deps.every((d, i) => !Object.is(d, deps[i]));
    if(shouldRun) {
      current.pendingEffects = {...(current.pendingEffects || {}), [currentIndex]: {  ...current.pendingEffects[currentIndex], effect } };
    }
  } else {
    current.pendingEffects = {
      ...(current.pendingEffects || {}),
      [currentIndex]: { effect },
    };
  }
  current.hooks[currentIndex] = {
    effect,
    deps
  }
  setCurrentIndex(currentIndex + 1);
}

export default {
  createElement
}