import { StyleSheet, Text, View } from "react-native";

const ListItem: React.FC<any> = ({item}: {item: any}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>An item</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 'auto',
        backgroundColor: '#fff7d6',
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