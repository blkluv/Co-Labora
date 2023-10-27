import { getCookie } from "cookies-next";
import { fetchWrapper } from "./fetch-wrapper";
const apiUri = "https://co-labora-backend.jmanuelc.dev";
const token = getCookie("token");

export const favoritesService = {
  create,
};

const baseUrl = `${apiUri}/favorites`;

function create(body: any) {
  return fetchWrapper.post(baseUrl, body, token);
}
