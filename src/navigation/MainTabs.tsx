import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShopStack from './ShopStack';
import CartScreen from '@screens/CartScreen';
import MeScreen from '@screens/MeScreen';
import { useCartStore } from '@stores/cartStore';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const totalQty = useCartStore((state) => state.totalQuantity());

  // Biến thể số 1: 'shopFirst' -> Shop -> Giỏ -> Tôi
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Cửa hàng"
        component={ShopStack}
        options={{ title: 'Cửa hàng' }}
      />
      <Tab.Screen
        name="Giỏ"
        component={CartScreen}
        options={{
          title: 'Giỏ',
          tabBarBadge: totalQty > 0 ? totalQty : undefined,
        }}
      />
      <Tab.Screen
        name="Tôi"
        component={MeScreen}
        options={{ title: 'Tôi' }}
      />
    </Tab.Navigator>
  );
}