import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 60,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.05']
  }
};

export default function () {
  const res = http.get('http://host.docker.internal:3000/api/hello');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'body has success': (r) => r.json().status === 'success'
  });
  sleep(1);
}
