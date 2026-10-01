import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuthStore } from '@stores/authStore';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import Watermark from '@components/Watermark';

export default function RootNavigator() {
  const token = useAuthStore((state) => state.token);

  return (
    <NavigationContainer>
      {token ? <MainTabs /> : <AuthStack />}
      <Watermark />
    </NavigationContainer>
  );
}