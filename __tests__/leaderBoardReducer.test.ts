import {
  SET_SEARCH_NAME,
  SET_FILTERED_DATA,
  SET_RANKS_MAP,
} from '../src/actionTypes';
import {
  CommonState,
  SetFilteredDataAction,
  SetRanksMapAction,
  SetSearchNameAction,
  User,
} from '../src/actions/commonActions';
import leaderBoardData from '../src/leaderboard.json';
import commonReducer from '../src/reducers/commonReducer';

const initialState: CommonState = {
  searchName: '',
  filteredData: [],
  ranksMap: {},
  leaderboardData: Object.values(leaderBoardData),
};

describe('leaderBoardReducer', () => {
  it('should return the initial state', () => {
    expect(commonReducer(undefined, {} as any)).toEqual(initialState);
  });

  it('should handle SET_SEARCH_NAME', () => {
    const searchName = 'test';
    const action: SetSearchNameAction = {
      type: SET_SEARCH_NAME,
      payload: searchName,
    };
    const expectedState = {
      ...initialState,
      searchName,
    };
    expect(commonReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_FILTERED_DATA', () => {
    const filteredData: User[] = Object.values(leaderBoardData);
    const action: SetFilteredDataAction = {
      type: SET_FILTERED_DATA,
      payload: filteredData,
    };
    const expectedState = {
      ...initialState,
      filteredData,
    };
    expect(commonReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_RANKS_MAP', () => {
    const ranksMap = {
      zOKzuWGBUVWRrTxyEHgTKc4gin32: 8,
      x8RNvUgv5pZqDVatEXb2aYgSflq1: 2,
    };
    const action: SetRanksMapAction = {
      type: SET_RANKS_MAP,
      payload: ranksMap,
    };
    const expectedState = {
      ...initialState,
      ranksMap,
    };
    expect(commonReducer(initialState, action)).toEqual(expectedState);
  });
});
