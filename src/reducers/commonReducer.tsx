import {
  GET_LEADERBOARD_DATA,
  SET_FILTERED_DATA,
  SET_RANKS_MAP,
  SET_SEARCH_NAME,
} from '../actionTypes';
import {CommonState, LeaderBoardActionTypes} from '../actions/commonActions';
import leaderBoardData from '../leaderboard.json';

const initialState: CommonState = {
  leaderboardData: Object.values(leaderBoardData),
  searchName: '',
  ranksMap: {},
  filteredData: [],
};
export default (state = initialState, action: LeaderBoardActionTypes) => {
  switch (action.type) {
    case GET_LEADERBOARD_DATA:
      return {
        ...state,
        leaderboardData: state.leaderboardData,
      };
    case SET_SEARCH_NAME:
      return {
        ...state,
        searchName: action.payload,
      };
    case SET_RANKS_MAP:
      return {
        ...state,
        ranksMap: action.payload,
      };
    case SET_FILTERED_DATA:
      return {
        ...state,
        filteredData: action.payload,
      };
    default:
      return state;
  }
};
