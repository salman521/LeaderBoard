/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import * as Colors from '../../theme/colors';
import {LOWEST_RANK} from '../../screen/SearchScreen/SearchScreen';

interface ListingProps {
  item: any;
  isFirst: boolean;
  searchName: string;
  ranksMap: any;
  lowestRank: number;
}

export const customStyles = {
  nameView: {borderRightWidth: 0},
};

const Listing: React.FC<ListingProps> = ({
  item,
  isFirst,
  searchName,
  ranksMap,
  lowestRank,
}) => {
  return (
    <View style={[styles.listView, {borderBottomWidth: isFirst ? 1 : 0}]}>
      <View style={styles.nameView}>
        <Text
          numberOfLines={1}
          style={[
            styles.title,
            {
              color:
                searchName === item?.name ? Colors.PRIMARY : Colors.BLACK_COLOR,
            },
          ]}>
          {item?.name || 'N/A'}
        </Text>
      </View>
      <View style={styles.nameView}>
        <Text style={styles.title} numberOfLines={1}>
          {ranksMap?.[item.uid] === LOWEST_RANK
            ? lowestRank
            : ranksMap?.[item.uid]}
        </Text>
      </View>
      <View style={[styles.nameView, customStyles?.nameView]}>
        <Text style={styles.title} numberOfLines={1}>
          {item?.bananas}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: Colors.BLACK_COLOR,
    fontSize: 14,
    fontWeight: '500',
  },
  listView: {
    color: Colors.BLACK_COLOR,
    backgroundColor: Colors.WHITE_COLOR,
    height: 50,
    alignItems: 'center',
    borderColor: Colors.PRIMARY,
    borderWidth: 1,
    flexDirection: 'row',
    marginHorizontal: 20,
    borderTopWidth: 1,
  },
  nameView: {
    backgroundColor: Colors.WHITE_COLOR,
    flex: 1,
    borderRightWidth: 1,
    justifyContent: 'center',
    paddingLeft: 10,
    height: 45,
    borderColor: Colors.BODY,
  },
});

export default Listing;
