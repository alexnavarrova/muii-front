import axios from 'src/utils/axios';
import { API_BASE_URL } from 'src/config';

class AxiosService {
  // eslint-disable-next-line class-methods-use-this
  headers() {
    const header = {
      Authorization: axios.defaults.headers.common.Authorization,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };

    return {
      ...header
    };
  }

  get(route, responseType) {
    return new Promise((resolve, reject) => {
      const responseTypeValue = responseType !== undefined ? responseType : 'application/json';
      axios
        .get(`${API_BASE_URL}${route}`, {
          headers: this.headers(),
          responseType: responseTypeValue,
        })
        .then(this.successCallback(resolve), this.rejectCallback(reject));
    });
  }

  post(route, data, responseType) {
    return new Promise((resolve, reject) => {
      const responseTypeValue = responseType !== undefined ? responseType : 'application/json';
      axios
        .post(`${API_BASE_URL}${route}`, data, {
          headers: this.headers(),
          responseType: responseTypeValue
        })
        .then(this.successCallback(resolve), this.rejectCallback(reject));
    });
  }

  put(route, data) {
    return new Promise((resolve, reject) => {
      axios
        .put(`${API_BASE_URL}${route}`, data, { headers: this.headers() })
        .then(this.successCallback(resolve), this.rejectCallback(reject));
    });
  }

  delete(route) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${API_BASE_URL}${route}`, { headers: this.headers() })
        .then(this.successCallback(resolve), this.rejectCallback(reject));
    });
  }

  successCallback = (resolve) => (response) => {
    if (response.data) resolve(response.data);
    resolve(response);
  };

  rejectCallback = (reject) => (error) => {
    reject(error);
  };
}

const axiosService = new AxiosService();
export default axiosService;
