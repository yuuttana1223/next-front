import { AxiosError } from "axios";
import axios from "axios";

export const fetcher = (url: string) => {
  return axios
    .get(url)
    .then((res) => res.data)
    .catch((error: AxiosError) => {
      throw new Error("エラーが発生したため、データの取得に失敗しました。");
    });
};
