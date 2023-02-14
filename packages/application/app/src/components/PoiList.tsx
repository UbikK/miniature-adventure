import { FC } from "react";
import {
  FlatList,
  GestureResponderEvent,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { PointOfInterestProps } from "../services/pointOfInterest/api.service";
import ListItem from "./ListItem";
import SearchInput from "./SearchInput";

type ListProps = {
  data: PointOfInterestProps[];
  handleInputChange: Function;
  handleInputBlur?: Function;
  handleItemPress?: (event: GestureResponderEvent, index: number) => void;
};

export const List: FC<ListProps> = (
  { data, handleInputChange, handleInputBlur, handleItemPress },
) => {
  const renderItem = (
    { item, index }: { item: PointOfInterestProps; index: number },
  ) => (
    <ListItem
      item={item}
      index={index}
      onPress={handleItemPress}
    />
  );
  return (
    <FlatList
      ListHeaderComponent={() => (
        <View style={styles.inputContainer}>
          <SearchInput
            handleChange={handleInputChange}
            handleBlur={handleInputBlur}
          />
        </View>
      )}
      ListHeaderComponentStyle={styles.inputContainer}
      style={styles.list}
      data={data ?? []}
      renderItem={renderItem}
      stickyHeaderIndices={[0]}
      ListEmptyComponent={<ErrorTile />}
    />
  );
};

const ErrorTile: FC = () => {
  return (
    <View style={styles.mainCardView}>
      <View style={styles.innerCardView}>
        <View style={styles.infoView}>
          <Text style={styles.name}>Oh oh</Text>
          <Text style={styles.subtitle}>Il n'y a rien à afficher :'(</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  mainCardView: {
    height: 200,
    alignItems: "flex-start",
    justifyContent: "space-between",
    backgroundColor: "#fff7d6",
    borderRadius: 15,
    elevation: 8,
    flexDirection: "row",
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  innerCardView: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  infoView: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  name: {
    color: "#254d4c",
    fontWeight: "bold",
  },
  subtitle: {
    color: "#254d4c",
  },
});
/**
 * showPredictions ? predictions : [{
        name: "Rien",
        address: { street: "Rien a afficher" },
        photoId: "",
        placeId: "",
        tags: [],
      }]
 */
