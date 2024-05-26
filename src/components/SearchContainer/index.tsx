import React from 'react';
import {
  View,
  TextInput,
  Image,
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';
import * as Colors from '../../theme/colors';

interface Props {
  value?: string;
  onChangeText?: (text: string) => void;
  handleSearchButton?: () => void;
}

const SearchContainer: React.FC<Props> = ({
  value,
  onChangeText,
  handleSearchButton,
}) => {
  return (
    <View style={styles.mainSearchContainer}>
      <View style={styles.searchView}>
        <Image
          source={require('../../assets/images/search.png')}
          style={styles.searchImage}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Search here..."
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={Colors.BLACK_COLOR} // Add this to set placeholder color
        />
      </View>
      <Pressable style={styles.searchButton} onPress={handleSearchButton}>
        <Text style={styles.buttonText}>Search</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  mainSearchContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },
  searchView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.BODY,
    borderWidth: 1,
    height: 50,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 4,
    paddingLeft: 10,
    width: '70%',
  },
  searchImage: {
    height: 20,
    width: 20,
  },
  inputField: {
    padding: 10,
    color: Colors.BLACK_COLOR,
    flex: 1,
  },
  searchButton: {
    height: 50,
    width: 90,
    borderWidth: 0,
    borderRadius: 4,
    borderColor: Colors.BLACK_COLOR,
    backgroundColor: Colors.PRIMARY,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.WHITE_COLOR,
    fontSize: 15,
  },
});

export default SearchContainer;
