import { useState } from 'react';
import { Linking, PermissionsAndroid, Platform } from 'react-native';
// Nếu dùng expo-location hoặc @react-native-community/geolocation, cấu hình phù hợp.
// Ở đây viết chuẩn logic xử lý 3 nhánh quyền:
export function useCampusLocation() {
  const [status, setStatus] = useState<'granted' | 'denied' | 'blocked'>('denied');
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);

  const requestPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setStatus('granted');
          // Mock tọa độ mẫu gần KTX
          setCoords({ latitude: 10.8411, longitude: 106.7975 });
        } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
          setStatus('denied');
        } else {
          setStatus('blocked');
        }
      } else {
        // iOS handling
        setStatus('granted');
        setCoords({ latitude: 10.8411, longitude: 106.7975 });
      }
    } catch (e) {
      setStatus('denied');
    }
  };

  const openSettings = () => {
    Linking.openSettings();
  };

  return { status, coords, requestPermission, openSettings };
}