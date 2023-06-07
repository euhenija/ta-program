import got from 'got';
import { getConfig } from '../../config';

const environment = getConfig(`${process.argv[4]}`) ? process.argv[4] : 'local';
const { baseUrl, apiToken } = getConfig(`${environment}`);

const DEFAULT_OPTIONS = {
  prefixUrl: baseUrl,
  headers: { Authorization: `Bearer ${apiToken}`, 'Content-Type': 'application/json' },
  responseType: 'json',
  throwHttpErrors: false,
};

async function get(url) {
  const options = {
    ...DEFAULT_OPTIONS,
  };
  return got.get(url, options);
}

async function post(url, body) {
  const options = {
    json: body,
    ...DEFAULT_OPTIONS,
  };
  return got.post(url, options);
}

async function put(url, body) {
  const options = {
    json: body,
    ...DEFAULT_OPTIONS,
  };
  return got.put(url, options);
}

async function del(url) {
  const options = {
    ...DEFAULT_OPTIONS,
  };
  return got.delete(url, options);
}

module.exports = { post, put, get, del };
