import { UserGithubActivityResponse } from "types";
import { GetAllResponse } from "./apiMethods";
import { API_URL } from "./constants";

export const getUserGithubActivity = (): Promise<UserGithubActivityResponse> =>
  GetAllResponse<UserGithubActivityResponse>(API_URL.githubActivity);
