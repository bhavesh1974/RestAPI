import axios from "../axios";

const api = {
  post: (url, data) => {
    return axios.post(url, data);
  },
  put: (url, data) => {
    return axios.put(url, data);
  },
  get: (url, headers) => {
    return axios.get(url);
  },
  delete: (url, headers) => {
    return axios.delete(url);
  },
  getImage: (url, headers) => {
    return axios.get(url, { headers: headers });
  }
};

export default api;
