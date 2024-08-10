import { AxiosResponse } from "axios";
import { IGetParams } from "types";
import { apiCall } from "./apiCall";

const extractor = <T>(response: AxiosResponse<T>) => {
  const { status, data, statusText } = response;
  if (status !== 200) throw new Error(statusText);
  if (!data) throw new Error(statusText);
  return data;
};

export const GetAllResponse = <T>(
  path: string,
  params?: Partial<IGetParams>
): Promise<T> => apiCall<T>({ path, params }).then(extractor);

export const PostAllResponse = <T>(path: string, body: unknown): Promise<T> =>
  apiCall<T>({ path, body }).then(extractor);
