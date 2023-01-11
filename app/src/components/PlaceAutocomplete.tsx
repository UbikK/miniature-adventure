import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { generateBoxShadowStyle } from '../helpers/CssFunctions';
import {
  getAutocompletePredictions,
  PlacePrediction
} from '../services/GooglePlaceService';



export const PlacesAutocompleteInput: React.FC = () => {
  const [predictions, setPredictions] = useState<PlacePrediction[]>();

  const Item = ({ description, index }: {description: string, index: number}) => (
    <View style={styles.predictionView}>
      <Text style={index >= predictions!.length - 1 ? styles.lastPrediction : styles.prediction}>{description}</Text>
    </View>
  );

  const renderItem = ({ item, index }: {item : PlacePrediction, index: number}) => (
    <Item description={item.description} index={index}/>
  );
  
  const handleChange = async (text: string) => {
    console.info(text)
    if (text.length >= 3) {
      const placesResult = await getAutocompletePredictions(text);
      console.info(placesResult)
      if (typeof placesResult === 'object') {
        // typeof an Array is 'object'🤷
        setPredictions(placesResult);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput onChangeText={(text: string) => handleChange(text)} placeholder="Recherher" placeholderTextColor='#254d4c' style={styles.input} onTouchStart={(e) => e.stopPropagation()}/>
        <Icon name="search" size={20} color="#254d4c" style={styles.searchIcon}/>
      </View>
     {
      predictions ? (
        <SafeAreaView style={styles.predicitionList}>
          <FlatList  data={predictions} renderItem={({item, index}) => renderItem({item, index})} keyExtractor={item => predictions.indexOf(item).toString()}/>
        </SafeAreaView>
          
        
      ) : undefined}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '5%'
  },
  inputContainer: {
    width: '90%',
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle:'solid',
    borderColor: '#254d4c',
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: '#f1f1e6'
  },
  searchIcon: {
    marginRight: '5%'
  },
  input: {
    width: '85%',
    height: 'auto',
    color:'#4b4a54',
    marginBottom: '1%',
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    marginLeft:'5%'
  },
  predicitionList: {
    ... generateBoxShadowStyle(-2, 4, '#171717', 0.2, 3, 4, '#171717'),
    backgroundColor: '#254d4c',
    width: '90%',
    height: 'auto',
    borderRadius: 20,
    borderColor: '#a3cfcd',
    borderWidth:1,
    marginTop: '1%',
    position: 'absolute',
    zIndex: 100,
    top: 70
  },
  prediction: {
    color: '#f1f1e6',
    borderBottomColor:'#f1f1e6',
    borderBottomWidth: 1,
    paddingBottom: '5%'
  },
  predictionView: {
    margin: '2%'
  },
  lastPrediction: {
    color: '#f1f1e6',
    borderBottomWidth: 0,
  }
});
