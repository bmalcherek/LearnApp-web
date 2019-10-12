export const setItem = (key, value) => {
  sessionStorage.setItem(key, value);
};

export const getItem = key => {
  return localStorage.getItem(key);
};
