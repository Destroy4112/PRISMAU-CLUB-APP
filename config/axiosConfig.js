import axios from "axios";
import { URL_BACK } from "../models/endpoints/endpoints.model";

export const api = axios.create({ baseURL: `${URL_BACK}/api/` });