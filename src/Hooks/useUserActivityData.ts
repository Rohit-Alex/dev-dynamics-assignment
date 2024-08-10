import {
  DashboardTabContext,
  DashboardTabContextType,
} from "Context/tabSelected";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  initialUserActivityResponseType,
  triggerUserActivityAPI,
  useUserActivitySelector,
} from "Slices/FetchUserGithubActivity";

type UseUserActivityReturnType = {
  status: "loading" | "fetched" | "error" | "uninitialized";
  data: initialUserActivityResponseType | undefined;
  isLoading: boolean;
};

export const useUserActivityData = (
  stopApiCall: boolean = true
): UseUserActivityReturnType => {
  const dispatch = useDispatch();
  const { status, data } = useUserActivitySelector();
  const { handleUserChange } = useContext(
    DashboardTabContext
  ) as DashboardTabContextType;

  const apiCall = async () => {
    if (status !== "fetched" && !stopApiCall) {
      const data = await dispatch(triggerUserActivityAPI() as any);
      handleUserChange(data?.users?.[0]);
      // dispatch(triggerApplicationListAPI() as any);
    }
  };

  useEffect(() => {
    apiCall();
  }, []);

  const isLoading = ["uninitialized", "loading"].includes(status);

  return {
    status,
    data,
    isLoading,
  };
};
