import axios from "axios";
import { TOKEN_KEY, URL } from "@/global";

export default function ApiManager(
  method,
  path,
  params = {},
  _header = "application/json",
  basUrl = true
) {
  const TOKEN = localStorage.getItem(TOKEN_KEY) || "";
  let HEADER = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": _header,
      "ngrok-skip-browser-warning": "69420",
    },
  };

  try {
    return new Promise(function (myResolve, myReject) {
      if (method === "post"|| method === "patch") {
        axios[method](URL + path, params, HEADER)
          .then((response) => {
            myResolve(response);
          })
          .catch((err) => {
            myReject(err);
          });
        return;
      }
      axios[method](URL + path, HEADER)
        .then((response) => {
          myResolve(response);
        })
        .catch((err) => {
          myReject(err);
        });
    });
  } catch (err) {
    console.log("axios.js >> TOKEN_NOT_FOUND-----------", err);
  }
}
