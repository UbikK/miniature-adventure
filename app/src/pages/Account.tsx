import { useHookstate } from '@hookstate/core';
import {
  GoogleSignin
} from '@react-native-google-signin/google-signin';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import LoginComponent from '../components/Login';
import { globalState } from '../helpers/state';

export default function Auth() {
  const state = useHookstate(globalState);

  const signOut = () => {
    GoogleSignin.signOut().then(() => {
      state.set({userInfos: undefined, isSignedIn: false})
    });
  }

  return (
    <View style={styles.container}>
      {
        !state.isSignedIn.value ? 
          <LoginComponent/>
        :
        <View>
          <Button title="Se Deconnecter" onPress={signOut}></Button>
        </View>
      }
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  googleSignin: {
    width: '100%',
    height: 50
  },
  orText: {
    paddingVertical: 10
  },
  inputLine: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginLeft: 4,
    marginRight: 4,
  },
  inputIcon: {
    marginRight: 4,
  },
  button: {
    width: '75%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
