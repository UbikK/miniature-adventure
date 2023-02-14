import { useHookstate } from "@hookstate/core";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { List } from "../components/PoiList";
import { globalstate } from "../helpers/state";
import {
  getAutocompletePredictions,
  PointOfInterestProps,
  savePlace,
} from "../services/pointOfInterest/api.service";

const Search: React.FC = () => {
  const [predictions, setPredictions] = useState<PointOfInterestProps[]>();
  const [showPredictions, setShowPredictions] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState<
    ReturnType<typeof setTimeout>
  >();
  const state = useHookstate(globalstate);

  const handleSelection = (e: any, index: number) => {
    console.info(e);

    if (predictions) {
      console.info(index);
      const selected = predictions[index];

      console.info("selected", selected);
      savePlace({ ...selected, UserId: state.userInfos.get()?.id });
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
    }
  };

  const handleChange = async (text: string) => {
    if (searchTimeout) clearTimeout(searchTimeout);

    if (text.length >= 3) {
      setSearchTimeout(setTimeout(() => {
        searchUsingGoogle(text);
        setShowPredictions(true);
      }, 300));
    } else if (!text.length) {
      resetState();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <List
        data={predictions && showPredictions ? predictions : []}
        handleInputChange={handleChange}
        handleItemPress={handleSelection}
      />
      {
        /* <FlatList
        ListHeaderComponent={() => (
          <View style={styles.inputContainer}>
            <SearchInput handleChange={handleChange} />
          </View>
        )}
        ListHeaderComponentStyle={styles.inputContainer}
        style={styles.list}
        data={}
        renderItem={renderItem}
        stickyHeaderIndices={[0]}
      /> */
      }
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "255	247	214 0",
    height: "100%",
    backgroundColor: "rgba(255, 247, 214, 1)",
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "2%",
    marginBottom: "2%",
    backgroundColor: "rgba(255, 247, 214, 0)",
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
