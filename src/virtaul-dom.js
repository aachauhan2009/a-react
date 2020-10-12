let virtualDom = null;

export const setDom = dom => {
  virtualDom = dom;
}

export const getDom = () => virtualDom;