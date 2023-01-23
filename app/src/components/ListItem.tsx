import { GOOGLE_MAPS_API_KEY } from "@env";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const ListItem: React.FC<any> = ({item}: {item: any}) => {
    console.info(`https://maps.googleapis.com/maps/api/place/photo?photo_reference=${item.photo_id}&key=${GOOGLE_MAPS_API_KEY}`)
    return (
        <Pressable>
            <View style={styles.mainCardView}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={styles.subCardView}>
                        <Image
                            source={{uri: `https://maps.googleapis.com/maps/api/place/photo?maxheight=50&photo_reference=${item.photo_id}&key=${GOOGLE_MAPS_API_KEY}`}}
                            resizeMode="contain"
                            style={{
                            borderRadius: 25,
                            height: 50,
                            width: 50,
                            }}
                        />
                    </View>
                    <View style={{marginLeft: 12}}>
                        <Text
                            style={{
                            fontSize: 14,
                            color: Colors.black,
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                            }}>
                            {item.name}
                        </Text>
                        <View
                            style={{
                            marginTop: 4,
                            borderWidth: 0,
                            width: '85%',
                            }}>
                            <Text
                            style={{
                                color: Colors.gray,
                                fontSize: 12,
                            }}>
                            {item.name}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
        
    )
}

const styles = StyleSheet.create({
      mainCardView: {
        height: 90,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.color_fff7d6,
        borderRadius: 15,
        shadowColor: Colors.black,
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 8,
        flexDirection: 'row',
        paddingLeft: 16,
        paddingRight: 14,
        marginTop: 6,
        marginBottom: 6,
        marginLeft: 16,
        marginRight: 16,
      },
      subCardView: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: Colors.history_back,
        borderColor: Colors.color_eeeeee,
        borderWidth: 1,
        borderStyle: 'solid',
        alignItems: 'center',
        justifyContent: 'center',
      },
    container: {
        flex: 1,
        backgroundColor: Colors.color_f1f1e6,
        width: '100%',
        height: 'auto',
        //backgroundColor: '#fff7d6',
        borderColor:'#254d4c',
        borderWidth: 1,
        borderStyle:'solid',
        padding: '5%'
    },
    text: {
        color: '#254d4c'
    }
})

export default ListItem;