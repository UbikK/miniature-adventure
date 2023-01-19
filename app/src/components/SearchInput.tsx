import React from 'react';
import { StyleSheet, TextInput, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

const SearchInput: React.FC<{handleChange: Function, handleBlur?: Function}> = ({handleChange, handleBlur}) => {
    return (  
        <View style={styles.inputContainer}>
            <TextInput 
            onChangeText={(text: string) => handleChange(text)} 
            placeholder="Recherher" 
            placeholderTextColor='#254d4c' 
            style={styles.input} 
            onTouchStart={(e) => e.stopPropagation()} 
            onBlur={handleBlur ? () => handleBlur(): undefined}
            />
            <Icon name={'search'} size={20} color="#254d4c" solid style={styles.searchIcon}/>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        width: '90%',
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle:'solid',
        borderColor: '#254d4c',
        borderRadius: 50,
        borderWidth: 1,
        backgroundColor: '#f1f1e6'
    },
    searchIcon: {
        marginRight: '5%'
    },
    input: {
        width: '85%',
        height: 'auto',
        color:'#4b4a54',
        marginBottom: '1%',
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        marginLeft:'5%'
    },
})

export default SearchInput