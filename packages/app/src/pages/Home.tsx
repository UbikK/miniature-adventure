import { useHookstate } from "@hookstate/core";
import { PointOfInterest } from "@miniature_adventure/domain";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { ParamListBase } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ListItem from "../components/ListItem";
import SearchInput from "../components/SearchInput";
import { globalstate } from "../helpers/state";
import { getAllPlacesForUser } from "../services/ApiService";

const Home: React.FC<{ navigation: BottomTabNavigationProp<ParamListBase> }> = (
  { navigation },
) => {
  const [places, setPlaces] = useState<PointOfInterest[] | undefined>();
  const [filteredPlaces, setFilteredPlaces] = useState<
    PointOfInterest[] | undefined
  >();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const state = useHookstate(globalstate);

  const getAllPlaces = async () => {
    if (state.userInfos?.get()?.id) {
      const dbPlaces = await getAllPlacesForUser(state.userInfos?.get()?.id!);
      setPlaces(dbPlaces);
    }
  };

  useEffect(() => {
    navigation.addListener("focus", handleRefresh);
  }, [navigation]);

  useEffect(() => {
    getAllPlaces().catch((e) => console.error(e));
  }, []);

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <ListItem item={item} key={index} />
  );

  const handleChange = (text: string) => {
    if (places) {
      setFilteredPlaces(places.filter((p) => p.name?.includes(text)));
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await getAllPlaces();
    console.info(places);
    setIsRefreshing(false);
  };

  if (state.promised) {
    return <Text>Loading</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <SearchInput handleChange={handleChange} />
      </View>

      <SafeAreaView style={styles.listContainer}>
        {((!places || places.length === 0) ||
            (filteredPlaces && filteredPlaces.length === 0))
          ? (
            <View style={styles.noResultsView}>
              <Text style={styles.noResultsText}>Rien à afficher :'(</Text>
            </View>
          )
          : (
            <FlatList
              data={filteredPlaces ?? places}
              renderItem={renderItem}
              onRefresh={handleRefresh}
              refreshing={isRefreshing}
            />
          )}
      </SafeAreaView>
    </View>
  );
};
export default Home;

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
  listContainer: {
    marginTop: "2%",
  },
  noResultsView: {
    alignItems: "center",
    justifyItems: "center",
  },
  noResultsText: {
    color: "#4b4a54",
  },
});
