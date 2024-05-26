import {
  SET_SEARCH_NAME,
  SET_FILTERED_DATA,
  SET_RANKS_MAP,
} from '../src/actionTypes';
import {
  setSearchName,
  User,
  setFilteredData,
  setRanksMap,
} from '../src/actions/commonActions';
import leaderBoardData from '../src/leaderboard.json';

describe('leaderBoardActions', () => {
  it('should create an action to set the search name', () => {
    const searchName = 'test';
    const expectedAction = {
      type: SET_SEARCH_NAME,
      payload: searchName,
    };
    expect(setSearchName(searchName)).toEqual(expectedAction);
  });

  it('should create an action to set the filtered data', () => {
    const filteredData: User[] = Object.values(leaderBoardData);
    const expectedAction = {
      type: SET_FILTERED_DATA,
      payload: filteredData,
    };
    expect(setFilteredData(filteredData)).toEqual(expectedAction);
  });

  it('should create an action to set the ranks map', () => {
    const ranksMap = {
      zOKzuWGBUVWRrTxyEHgTKc4gin32: 8,
      x8RNvUgv5pZqDVatEXb2aYgSflq1: 2,
    };
    const expectedAction = {
      type: SET_RANKS_MAP,
      payload: ranksMap,
    };
    expect(setRanksMap(ranksMap)).toEqual(expectedAction);
  });
});
