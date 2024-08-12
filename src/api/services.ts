import { UserGithubActivityResponse } from "types";
import { GetAllResponse } from "./apiMethods";
import { API_URL, mockedData } from "./constants";

// export const getUserGithubActivity =
//   async (): Promise<UserGithubActivityResponse> => {
//     GetAllResponse<UserGithubActivityResponse>(API_URL.githubActivity);

//   };

export const getUserGithubActivity =
  async (): Promise<UserGithubActivityResponse> => {
    const res = await new Promise<UserGithubActivityResponse>((resolve) => {
      setTimeout(() => resolve(mockedData as UserGithubActivityResponse), 2000);
    });

    return res;
  };
