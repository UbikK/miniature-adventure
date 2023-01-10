import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {getAutocompletePredictions} from '../services/GooglePlaceService';

const PlaceAutocompleteInput: React.FC = () => {
  const [predictions, setPredictions] = useState<PlacePrediction[]>();
  const handleChange = async (text: string) => {
    if (text.length >= 3) {
      const placesResult = await getAutocompletePredictions(text);

      if (typeof placesResult === 'object') {
        // typeof an Array is 'object'...
        setPredictions(placesResult);
      }
    }
  };

  return (
    <View>
      <TextInput onChangeText={handleChange} />
      {predictions ? (
        <View>
          {predictions.map(p => {
            return <Text>{p.description}</Text>;
          })}
        </View>
      ) : undefined}
    </View>
  );
};

export default PlaceAutocompleteInput;
