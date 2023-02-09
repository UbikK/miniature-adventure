import React, { useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import ListItem from "../components/ListItem";
import SearchInput from "../components/SearchInput";
import { getAutocompletePredictions, savePlace } from "../services/ApiService";
import { PointOfInterest } from "../types/domain";

const Search: React.FC = () => {
  const [predictions, setPredictions] = useState<PointOfInterest[]>();
  const [showPredictions, setShowPredictions] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState<
    ReturnType<typeof setTimeout>
  >();

  const handleSelection = (e: any, index: number) => {
    if (predictions) {
      const selected = predictions[index];
      savePlace(selected);
      resetState();
    }
  };

  const resetState = () => {
    setPredictions(undefined);
    setShowPredictions(false);
  };

  const searchUsingGoogle = async (text: string) => {
    const placesResult = await getAutocompletePredictions(text);
    if (typeof placesResult === "object" && placesResult.length > 0) {
      // typeof an Array is 'object'🤷
      setPredictions(placesResult);
      setShowPredictions(true);
    }
  };

  const handleChange = async (text: string) => {
    if (searchTimeout) clearTimeout(searchTimeout);

    if (text.length >= 3) {
      setSearchTimeout(setTimeout(() => {
        searchUsingGoogle(text);
      }, 300));
    } else if (!text.length) {
      resetState();
    }
  };

  const renderItem = (
    { item, index }: { item: PointOfInterest; index: number },
  ) => (
    <ListItem
      item={item}
      index={index}
      onPress={handleSelection}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <SearchInput handleChange={handleChange} />
      </View>

      {showPredictions
        ? (
          <FlatList
            style={styles.list}
            data={predictions}
            renderItem={renderItem}
          />
        )
        : (
          <Text style={[styles.predictionView]}>
            Pas de résultats <Icon name={"frown"} solid />
          </Text>
        )}
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff7d6",
    height: "100%",
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "2%",
  },
  predictionView: {
    margin: "2%",
    color: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    elevation: 2,
    height: "100%",
  },
});
