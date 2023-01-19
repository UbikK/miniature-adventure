import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ListItem from '../components/ListItem';
import SearchInput from '../components/SearchInput';
import ApiService from '../services/ApiService';

const List = () => {
  const [places, setPlaces] = useState<any[] | undefined>();
  const [filteredPlaces, setFilteredPlaces] = useState<any[] | undefined>();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getAllPlaces = async () => {
    const dbPlaces = await ApiService.getInstance().getAll();
    setPlaces(dbPlaces);
  }

  useEffect(() => {
    getAllPlaces().catch(e => console.error(e));
  }, [])

  const renderItem = ({ item, index }: {item : any, index: number}) => (
    <ListItem item={item} key={index}/>
  );

  const handleChange = (text: string) => {
    if (places) {
      setFilteredPlaces(places.filter(p => p.name.includes(text)));
    } 
  }

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await getAllPlaces();
    console.info(places)
    setIsRefreshing(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <SearchInput handleChange={handleChange}/>
      </View>
      
      <SafeAreaView style={styles.listContainer}>
        <FlatList data={filteredPlaces ?? places} renderItem={renderItem} onRefresh={handleRefresh} refreshing={isRefreshing}></FlatList>
      </SafeAreaView>
     
    </View>
  );
};
export default List;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff7d6',
    height: '100%',
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '2%'
  },
  listContainer: {
    marginTop: '2%'
  }
})