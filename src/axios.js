import axios from "axios";

const instance = axios.create({
  baseURL: "https://food-village-d560f.web.app/",
});

export default instance;