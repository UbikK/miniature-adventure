import {
  GeoError,
  GeoPosition,
  getCurrentPosition,
} from 'react-native-geolocation-service';

export const getCurrentPositionAsync: () => Promise<GeoPosition> = () => {
  return new Promise<GeoPosition>(
    (
      resolve: (value: GeoPosition) => void,
      reject: (value: GeoError) => void,
    ) => {
      getCurrentPosition(
        position => {
          resolve(position);
        },
        error => {
          reject(error);
        },
      );
    },
  );
};
