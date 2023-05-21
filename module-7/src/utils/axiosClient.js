import axios from 'axios';
import { getConfig } from '../../config';
const environment = getConfig(`${process.argv[4]}`) ? process.argv[4] : 'local';

const { baseUrl, apiToken } = getConfig(`${environment}`);

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: { Authorization: `Bearer ${apiToken}`, 'Content-Type': 'application/json' },
  resolveBodyOnly: true,
  validateStatus: function (status) {
    return status >= 200 && status < 500;
  },
});

export default axiosInstance;
