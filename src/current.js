let current = null;
let currentIndex = 0;
export const setCurrent = c => {
  current = c;
}

export const getCurrent = () => current;

export const setCurrentIndex = i => {
  currentIndex = i;
};

export const getCurrentIndex = () => currentIndex;