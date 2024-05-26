import {
  GET_LEADERBOARD_DATA,
  SET_FILTERED_DATA,
  SET_RANKS_MAP,
  SET_SEARCH_NAME,
} from '../actionTypes';

export interface GetLeaderboardDataAction {
  type: typeof GET_LEADERBOARD_DATA;
}

export interface SetSearchNameAction {
  type: typeof SET_SEARCH_NAME;
  payload: string;
}

export interface SetRanksMapAction {
  type: typeof SET_RANKS_MAP;
  payload: {[key: string]: number};
}

export interface SetFilteredDataAction {
  type: typeof SET_FILTERED_DATA;
  payload: User[];
}

export interface User {
  uid: string;
  name: string;
  bananas: number;
  lastDayPlayed: string;
  longestStreak: number;
  stars: number;
  subscribed: boolean;
}
export interface CommonState {
  searchName: string;
  filteredData: User[];
  isSorted?: boolean;
  ranksMap: {[key: string]: number};
  leaderboardData: User[];
}
// Interfaces

export const getLeaderboardData = (): GetLeaderboardDataAction => ({
  type: GET_LEADERBOARD_DATA,
});

export const setSearchName = (searchName: string): SetSearchNameAction => ({
  type: SET_SEARCH_NAME,
  payload: searchName,
});

export const setRanksMap = (ranksMap: {
  [key: string]: number;
}): SetRanksMapAction => ({
  type: SET_RANKS_MAP,
  payload: ranksMap,
});

export const setFilteredData = (
  filteredData: User[],
): SetFilteredDataAction => ({
  type: SET_FILTERED_DATA,
  payload: filteredData,
});

export type LeaderBoardActionTypes =
  | GetLeaderboardDataAction
  | SetSearchNameAction
  | SetRanksMapAction
  | SetFilteredDataAction;
