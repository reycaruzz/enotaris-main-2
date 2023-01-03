// import { apiClient } from 'app/services/client';
// import ApiConfig from 'app/config/api-config';
import { apiUrl } from 'app/core/apiUrl';

export default function loginUser(username: string, password: string) {
  // console.log(username, password);
  var loginData = new FormData();
  loginData.append('username', username);
  loginData.append('password', password);
  return fetch(apiUrl.api + 'login', {
    method: 'POST',
    body: loginData,
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => console.error(error));
}
