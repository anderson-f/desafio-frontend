/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const gifApi = axios.create({
  baseURL: 'https://api.giphy.com/v1/gifs',
});

export const mockApi = axios.create({
  baseURL: 'https://60805812a5be5d00176dd874.mockapi.io/api/gifs/',
});
