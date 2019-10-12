import axios from 'axios';

const fetchData = async path => {
  const url = `${process.env.REACT_APP_API_URL}api/collections/${path}`;
  const token = localStorage.getItem('token');
  axios.defaults.headers = {
    'Content-Type': 'application/json',
    Authorization: `Token ${token}`
  };

  return axios.get(url);
};

export default fetchData;
