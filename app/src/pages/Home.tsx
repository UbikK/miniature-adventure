import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ListItem from '../components/ListItem';
import { PlacesAutocompleteInput } from '../components/PlaceAutocomplete';

const List = () => {
  const [places, setPlaces] = useState([1]);

  const renderItem = ({ item, index }: {item : any, index: number}) => (
    <ListItem item={item}/>
  );

  return (
    <View style={styles.container}>
      <PlacesAutocompleteInput />
      <SafeAreaView style={styles.listContainer}>
        <FlatList data={places} renderItem={renderItem}></FlatList>
      </SafeAreaView>
     
    </View>
  );
};
export default List;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff7d6',
    height: '100%'
  },
  listContainer: {
    marginTop: '2%'
  }
})