import axios from "axios";
export function registerUser(body) {
  return axios
    .post("https://hssc-exam.ru/test/getTestData.php", body, {
      headers: { origin: "Referer: http://127.0.0.1:5173/" },
    })
    .then((response) => {
      return response;
    })
    .catch((e) => {
      return e.response;
    });
}
