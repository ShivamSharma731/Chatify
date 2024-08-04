import { HOST } from "@/utils/constants";
import axios from "axios";

const apiclient = axios.create({
  baseURL: HOST,
});

export default apiclient;
