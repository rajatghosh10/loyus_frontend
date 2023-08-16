import axios from "axios";
const API_HOST = process.env.REACT_APP_API_HOST;
console.log(API_HOST);

class AccServices {
  regi(data) {
    return axios({
      method: "post",
      url: API_HOST + "/api/register",
      data: data,
    });
  }

  verifyemail(data) {
    return axios({
      method: "post",
      url: API_HOST + "/api/verify-email",
      data: data,
    });
  }
}

export default new AccServices();
