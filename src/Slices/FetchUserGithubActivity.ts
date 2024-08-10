import { useSelector } from "react-redux";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  Activity,
  IDispatcherType,
  IGenralizedInitialState,
  RESPONSE_INITIAL_STATE,
  UserActivity,
  UserGithubActivityResponse,
} from "types";
import { getUserGithubActivity } from "api/services";
import { toast } from "react-toastify";

const getUserGithubActivityThunk = createAsyncThunk(
  "get/userGithubActivity",
  getUserGithubActivity
);

export type initialUserActivityResponseType = UserGithubActivityResponse & {
  users: string[];
  userActivityCount: Record<string, UserActivity>;
};

export const UserGithubActivitySlice = createSlice({
  name: "userGithubActivity",
  initialState: RESPONSE_INITIAL_STATE<initialUserActivityResponseType>(),
  reducers: {
    CLEAR_ERROR: (state) => {
      state.error = "";
    },
    RESET: (state) => Object.assign(state, RESPONSE_INITIAL_STATE()),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserGithubActivityThunk.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(
        getUserGithubActivityThunk.fulfilled,
        (state: ReturnType<typeof RESPONSE_INITIAL_STATE>, action) => {
          state.status = "fetched";
          state.data = {
            ...action.payload,
            users: [
              "All",
              ...action.payload.data.AuthorWorklog.rows.map((e) => e.name),
            ],
            userActivityCount: action.payload.data.AuthorWorklog.rows.reduce(
              (acc: Record<string, UserActivity>, row) => {
                const val = {} as UserActivity;
                action.payload.data.AuthorWorklog.activityMeta.forEach((e) => {
                  val[e.label] =
                    row.totalActivity.find(
                      (activity: Activity) => activity.name === e.label
                    )?.value || "0";
                });
                acc[row.name] = val;
                return acc;
              },
              {}
            ),
          };
        }
      )
      .addCase(
        getUserGithubActivityThunk.rejected,
        (state: ReturnType<typeof RESPONSE_INITIAL_STATE>, action) => {
          state.status = "error";
          state.error = action?.error?.message ?? "something went wrong!";
          toast.error(state.error);
        }
      );
  },
});

interface IStates {
  [UserGithubActivitySlice.name]: ReturnType<
    typeof UserGithubActivitySlice.reducer
  >;
}

export const useUserActivitySelector =
  (): IGenralizedInitialState<initialUserActivityResponseType> =>
    useSelector((state: IStates) => state[UserGithubActivitySlice.name] || {});

export const triggerUserActivityAPI =
  () =>
  async (
    dispatch: IDispatcherType,
    getState: () => IStates
  ): Promise<initialUserActivityResponseType> => {
    await dispatch(getUserGithubActivityThunk());
    return getState()[UserGithubActivitySlice.name]
      .data as initialUserActivityResponseType;
  };

export const resetUserActivityData =
  () =>
  async (dispatch: IDispatcherType): Promise<void> => {
    await dispatch(UserGithubActivitySlice.actions.RESET());
  };
