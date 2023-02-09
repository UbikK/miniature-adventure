import { GOOGLE_MAPS_API_KEY } from "@env";
import { PointOfInterestDto } from "@miniature_adventure/domain";
import {
  GestureResponderEvent,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const ListItem: React.FC<any> = (
  { item, onPress }: {
    item: PointOfInterestDto;
    onPress: (event: GestureResponderEvent) => void;
  },
) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.mainCardView}>
        <View style={styles.innerCardView}>
          {item.photo_id
            ? (
              <View style={styles.pic}>
                <Image
                  source={{
                    uri:
                      `https://maps.googleapis.com/maps/api/place/photo?maxheight=1000&maxwidth=1000&photo_reference=${item.photo_id}&key=${GOOGLE_MAPS_API_KEY}`,
                  }}
                  resizeMode="cover"
                  style={{
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    height: 100,
                    width: "100%",
                  }}
                />
              </View>
            )
            : undefined}
          <View style={styles.infoView}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.subtitle}>{item.name}</Text>
          </View>
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
  pic: {
    width: "100%",
    height: "50%",
  },
  infoView: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    color: "#254d4c",
    fontWeight: "bold",
  },
  subtitle: {
    color: "#254d4c",
  },
});

export default ListItem;
