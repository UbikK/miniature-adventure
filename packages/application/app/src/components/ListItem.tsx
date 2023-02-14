import { GOOGLE_MAPS_API_KEY } from "@env";
import {
  FlatList,
  GestureResponderEvent,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PointOfInterestProps } from "../services/pointOfInterest/api.service";

type ListItemProps = {
  item: PointOfInterestProps;
  onPress?: (event: GestureResponderEvent, index: number) => void;
  index: number;
};

const ListItem: React.FC<ListItemProps> = (
  { item, onPress, index },
) => {
  const Pill = (tag: string) => {
    return (
      <View style={styles.pill}>
        <Text style={styles.pillContent}>{tag}</Text>
      </View>
    );
  };
  return (
    <Pressable onPress={(e) => onPress && onPress(e, index)}>
      <View style={styles.mainCardView}>
        <View style={styles.innerCardView}>
          {item.photoId
            ? (
              <View style={styles.picView}>
                <Image
                  source={{
                    uri:
                      `https://maps.googleapis.com/maps/api/place/photo?maxheight=1000&maxwidth=1000&photo_reference=${item.photoId}&key=${GOOGLE_MAPS_API_KEY}`,
                  }}
                  resizeMode="cover"
                  style={styles.pic}
                />
              </View>
            )
            : undefined}
          <View style={styles.infoView}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.subtitle}>{item.address.street}</Text>
          </View>

          <SafeAreaView style={styles.pillListView}>
            <FlatList
              style={styles.pillList}
              horizontal
              data={item.tags}
              renderItem={({ item }) => Pill(item!)}
            />
          </SafeAreaView>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
  picView: {
    width: "100%",
    height: "50%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  pic: {
    height: 100,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: "100%",
    backgroundColor: "#fff7d6",
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
  pillListView: {
    height: 40,
    width: "95%",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
  },
  pillList: {
    overflow: "hidden",
  },
  pill: {
    backgroundColor: "#254d4c",
    borderRadius: 25,
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    minWidth: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  pillContent: {
    color: "#f1f1e6",
  },
});

export default ListItem;
