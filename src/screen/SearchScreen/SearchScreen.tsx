import React, {useState} from 'react';
import SearchContainer from '../../components/SearchContainer';
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Colors from '../../theme/colors';
import Listing from '../../components/leaderBoardList';
import {AppState} from '../../../App';
import {
  setFilteredData,
  setRanksMap,
  setSearchName,
} from '../../actions/commonActions';
import {useDispatch, useSelector} from '../../hooks/hooks';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE_COLOR,
  },
  headerView: {
    backgroundColor: Colors.TERTIORY_GREY_TINT,
    height: 50,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  mainView: {
    flex: 1,
    borderRightWidth: 1,
    justifyContent: 'center',
    paddingLeft: 10,
    height: 45,
    borderColor: Colors.BLACK_COLOR,
  },
  headingText: {
    color: Colors.BLACK_COLOR,
    fontSize: 15,
    fontWeight: '500',
  },
  icon: {
    height: 20,
    width: 20,
    right: 10,
  },
  iconView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainHeaderView: {borderRightWidth: 0},
  fuzzyContainer: {justifyContent: 'center', alignItems: 'center', height: 30},
});
export const LOWEST_RANK = -1;

const SearchScreen: React.FC = () => {
  const dispatch = useDispatch();

  const {leaderboardData, searchName, ranksMap, filteredData} = useSelector(
    (state: AppState) => state.commonReducer,
  );

  const [isSorted, setIsSorted] = useState(false);
  const [isFuzzy, setIsFuzzy] = useState(false);
  const [lowestRank, setLowestRank] = useState(0);

  // Added fuzzy search
  function fuzzySearch(query: string) {
    const lowerCaseQuery = query.toLowerCase();
    return leaderboardData
      .filter(user => user.name.toLowerCase().includes(lowerCaseQuery))
      .sort((a, b) => ranksMap[a.uid] - ranksMap[b.uid])
      .slice(0, 10);
  }

  // all functionality for search
  const handleSearchButton = () => {
    setIsFuzzy(false);
    if (!searchName.trim()) {
      dispatch(setFilteredData([]));
      Alert.alert('Please enter a user name to search.');
      return;
    }
    const sortedByBananas = leaderboardData.sort((a, b) => {
      if (b.bananas === a.bananas) {
        return a.name.localeCompare(b.name);
      }
      return b.bananas - a.bananas;
    });
    const rankMapT: any = {};

    let currentRank = 0;
    let previousBananas = 0;

    sortedByBananas.forEach(user => {
      if (user.bananas > 0) {
        if (user.bananas === previousBananas) {
          rankMapT[user.uid] = currentRank;
        } else {
          currentRank += 1;
          rankMapT[user.uid] = currentRank;
        }
        previousBananas = user.bananas;
      } else {
        rankMapT[user.uid] = LOWEST_RANK;
      }
    });
    setLowestRank(currentRank + 1);

    dispatch(setRanksMap(rankMapT));
    const sliced = sortedByBananas.slice(0, 10);
    const existInTop10 = sliced.find(item => item.name === searchName);
    if (!existInTop10) {
      const searchedItemIndex = leaderboardData.findIndex(
        item => item.name === searchName,
      );
      if (searchedItemIndex === -1) {
        // fuzzy search
        const fuzzyData = fuzzySearch(searchName);
        if (fuzzyData.length) {
          dispatch(setFilteredData(fuzzyData));
          setIsFuzzy(true);
        } else {
          Alert.alert(
            'This user name does not exist! Please specify an existing user name!',
          );
          dispatch(setFilteredData([]));
        }
        return;
      } else {
        sliced.splice(9, 1, leaderboardData[searchedItemIndex]);
      }
    }
    dispatch(setFilteredData(sliced));
  };

  // Sort by name
  const handleSortByName = () => {
    if (!searchName) {
      return;
    }
    if (isSorted) {
      handleSearchButton();
      setIsSorted(false);
    } else {
      const sortedData = [...filteredData].sort((a, b) =>
        a.name.localeCompare(b.name),
      );
      setIsSorted(true);
      dispatch(setFilteredData(sortedData));
    }
  };

  // Sort By Rank
  const handleSortByRank = () => {
    if (!searchName) {
      return;
    }
    if (isSorted) {
      handleSearchButton();
      setIsSorted(false);
    } else {
      leaderboardData.sort((a, b) => {
        if (b.bananas === a.bananas) {
          return a.name.localeCompare(b.name);
        }
        return b.bananas - a.bananas;
      });

      const sortedData = [...leaderboardData].sort((a, b) => {
        if (ranksMap[a.uid] === LOWEST_RANK) {
          ranksMap[a.uid] = lowestRank;
        }
        if (ranksMap[b.uid] === LOWEST_RANK) {
          ranksMap[b.uid] = lowestRank;
        }
        if (ranksMap[b.uid] === ranksMap[a.uid]) {
          return a.name.localeCompare(b.name);
        }
        return ranksMap[b.uid] - ranksMap[a.uid];
      });
      dispatch(setFilteredData(sortedData));
      setIsSorted(true);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <SearchContainer
        handleSearchButton={handleSearchButton}
        value={searchName}
        onChangeText={(e: string) => dispatch(setSearchName(e))}
      />

      <View style={styles.fuzzyContainer}>
        {isFuzzy && <Text>Data from fuzzy search</Text>}
      </View>

      <View style={styles.headerView}>
        <View style={[styles.mainView, styles.iconView]}>
          <Text style={styles.headingText}>Name</Text>
          <TouchableOpacity onPress={handleSortByName}>
            <Image
              source={require('../../assets/images/rightArrow.png')}
              style={[
                styles.icon,
                {transform: [{rotate: !isSorted ? '90deg' : '-90deg'}]},
              ]}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.mainView, styles.iconView]}>
          <Text style={styles.headingText}>Rank</Text>
          <TouchableOpacity onPress={handleSortByRank}>
            <Image
              source={require('../../assets/images/rightArrow.png')}
              style={[
                styles.icon,
                {transform: [{rotate: !isSorted ? '90deg' : '-90deg'}]},
              ]}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.mainView, styles.mainHeaderView]}>
          <Text style={styles.headingText}>Number of bananas</Text>
        </View>
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={item => item?.uid}
        renderItem={({item, index}) => (
          <Listing
            item={item}
            isFirst={index === filteredData.length - 1}
            searchName={searchName}
            lowestRank={lowestRank}
            ranksMap={ranksMap}
          />
        )}
      />
    </SafeAreaView>
  );
};
export default SearchScreen;
