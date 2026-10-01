import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@screens/HomeScreen';
import DetailScreen from '@screens/DetailScreen';
import { VARIANT } from '@constants/student';

const Stack = createNativeStackNavigator();

export default function ShopStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: VARIANT.detailPresentation as any, // 'card' cho số cuối 1
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}