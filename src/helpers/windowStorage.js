const stayAuth = localStorage.getItem('stayAuth');

export const setItem = (key, value) => {
  stayAuth
    ? localStorage.setItem(key, value)
    : sessionStorage.setItem(key, value);
};

export const getItem = key => {
  let item;
  stayAuth
    ? (item = localStorage.getItem(key))
    : (item = sessionStorage.getItem(key));
  return item;
};
