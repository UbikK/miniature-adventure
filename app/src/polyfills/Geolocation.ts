import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation, {
  GeoError,
  GeoPosition
} from 'react-native-geolocation-service';

export const getCurrentPositionAsync: () => Promise<GeoPosition> = () => {
  return new Promise<GeoPosition>(
    async (
      resolve: (value: GeoPosition) => void,
      reject: (value: GeoError) => void,
    ) => {
      if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization('whenInUse');
      //   Geolocation.setRNConfiguration({
      //     skipPermissionRequests: false,
      //    authorizationLevel: 'whenInUse',
      //  });
      }
    
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
      }
      Geolocation.getCurrentPosition(
        position => {
          console.info(position)
          resolve(position);
        },
        error => {
          reject(error);
        },
      );
    },
  );
};
