import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { generateBoxShadowStyle } from '../helpers/CssFunctions';
import ApiService from '../services/ApiService';
import {
  getAutocompletePredictions,
  PlacePrediction
} from '../services/GooglePlaceService';
import SearchInput from './SearchInput';



export const PlacesAutocompleteInput: React.FC = () => {
  const [predictions, setPredictions] = useState<PlacePrediction[]>();
  const [showPredictions, setShowPredictions] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState<ReturnType<typeof setTimeout>>();
  
  const handleSelection = (e: any, index: number) => {
    if (predictions) {
      const selected = predictions[index];
      ApiService.getInstance().save(selected);
      resetState();
    }
  }

  const resetState = () => {
    setPredictions(undefined);
    setShowPredictions(false);
  }

  const Item = ({ description, index }: {description: string, index: number}) => (
    <Pressable style={styles.predictionView} onTouchEnd={(e) => handleSelection(e, index)}>
      <Text style={index >= predictions!.length - 1 ? styles.lastPrediction : styles.prediction}>{description}</Text>
    </Pressable>
  );

  const renderItem = ({ item, index }: {item : PlacePrediction, index: number}) => (
    <Item description={item.description} index={index}/>
  );

  const searchUsingGoogle = async (text: string) => {
      const placesResult = await getAutocompletePredictions(text);
      if (typeof placesResult === 'object' && placesResult.length > 0) {
        // typeof an Array is 'object'🤷
        setPredictions(placesResult);
        setShowPredictions(true);
      } 
  }
  
  const handleChange = async (text: string) => {
    if(searchTimeout) clearTimeout(searchTimeout);

    if (text.length >= 3) {
      setSearchTimeout(setTimeout(() => {
        searchUsingGoogle(text);
      }, 300))
    } else if (!text.length) {
      resetState()
    } 
  };

  return (
    <View style={styles.container}>
      <SearchInput handleChange={handleChange} handleBlur={resetState}/>
      {
        showPredictions ? (
          <SafeAreaView style={styles.predicitionList}>
            {
              predictions ? 
                <FlatList  data={predictions} renderItem={({item, index}) => renderItem({item, index})} keyExtractor={item => predictions!.indexOf(item).toString()}/> 
              : <Text style={[styles.lastPrediction, styles.predictionView]}>Pas de résultats <Icon name={'frown'} color="#f1f1e6" solid/></Text>
            }
          </SafeAreaView>
        ) : undefined
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '5%'
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
    top: 70,
    display:'flex'
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
