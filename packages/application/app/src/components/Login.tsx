import { useHookstate } from "@hookstate/core";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { globalState } from "../helpers/state";
import { saveUser } from "../services/user/api.service";
import EmailLoginComponent from "./EmailLogin";

const LoginComponent = () => {
  const state = useHookstate(globalState);

  const [isSignInInProgress, setIsSignInInProgress] = useState<boolean>(false);
  const [isWithEmail, setIsWithEmail] = useState<boolean>(false);

  const signIn = async () => {
    setIsSignInInProgress(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfos = await GoogleSignin.signIn();
      const user = await saveUser(userInfos);
      if (user) {
        state.set({ userInfos, isSignedIn: true });
        setIsSignInInProgress(false);
      }
    } catch (error: any) {
      console.error(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        return;
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
      setIsSignInInProgress(false);
    }
  };
  return (
    <View style={styles.button}>
      {isWithEmail ? <EmailLoginComponent disabled={isSignInInProgress} /> : (
        <>
          <View style={[styles.verticallySpaced, styles.mt20]}>
            <Button
              title="Sign in with email"
              onPress={() => setIsWithEmail(true)}
            />
          </View>
          <Text style={styles.orText}>OR</Text>
          <GoogleSigninButton
            style={styles.googleSignin}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
            disabled={isSignInInProgress}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  googleSignin: {
    width: "100%",
    height: 50,
  },
  orText: {
    paddingVertical: 10,
  },
  inputLine: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginLeft: 4,
    marginRight: 4,
  },
  inputIcon: {
    marginRight: 4,
  },
  button: {
    width: "75%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoginComponent;
