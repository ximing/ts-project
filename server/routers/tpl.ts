import axios from "axios";
import { getEnvironment } from "../utils/config";

const home = async function(ctx) {
  if (getEnvironment() === "development") {
    const { data } = await axios.get("http://localhost:8000/", {
      responseType: "stream"
    });
    ctx.body = data;
  } else {
    const { data } = await axios.get("http://xxx");
    ctx.body = data;
  }
  ctx.set("content-type", "text/html");
};

export default function(router) {
  router.get("*", home);
}
