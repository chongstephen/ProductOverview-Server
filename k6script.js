import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  duration: '30s',
  vus: 1000,
}

export default function () {

  http.get(`http://localhost:3000/products/${Math.floor(Math.random() * (100000 - 1 + 1)) + 1}`);
  sleep(1);
}
