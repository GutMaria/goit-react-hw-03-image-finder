import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '40504298-48a8820d7aa83aae1666f868d',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
    page: 1,
  },
});

export const searchPhoto = search => {
  return instance.get('/', { params: { q: search } });
};
