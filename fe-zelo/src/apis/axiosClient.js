import axios from "axios";

const axiosClient = axios.create({
  paramsSerializer: (params) => queryString.stringify(params),
});

// Handle request error here
axiosClient.interceptors.request.use(async (config) => {
  config.headers = {
    Authorization: ``,
    Accept: "application/json",
    ...config.headers,
  };
  config.data;

  return config;

});

// Handle response error here
axiosClient.interceptors.response.use(
  (response) => {
    if (response.data && response.status === 200) {
      return response.data;
    }
    throw new Error('Response is not success');
  },
  (error) => {
    console.log(`Error API ${JSON.stringify(error)}`)
    throw new Error('Response is not success');
  }
);

export default axiosClient;