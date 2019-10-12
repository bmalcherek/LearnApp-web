import axios from 'axios';

const postData = async (path, data) => {
  const url = `${process.env.REACT_APP_API_URL}${path}`;
  const token = localStorage.getItem('token');
  axios.defaults.headers = {
    'Content-Type': 'application/json',
    Authorization: `Token ${token}`
  };

  return axios.post(url, data);
};

export default postData;
