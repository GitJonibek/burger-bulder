import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://react-my-burger-7ff50.firebaseio.com/'
});

export default instance;
