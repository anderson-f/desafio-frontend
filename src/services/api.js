/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const gifApi = axios.create({
  baseURL: 'https://api.giphy.com/v1/gifs',
});
