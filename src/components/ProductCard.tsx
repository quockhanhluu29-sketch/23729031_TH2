import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { Product } from '@services/productApi';
import { STUDENT, PRICE_MULTIPLIER, VARIANT } from '@constants/student';
import { COLORS } from '@constants/theme';
import { useCartStore } from '@stores/cartStore';

interface Props {
  product: Product;
  onPress: () => void;
}

export default function ProductCard({ product, onPress }: Props) {
  const addCart = useCartStore((state) => state.add);

  const handleAdd = () => {
    ReactNativeHapticFeedback.trigger(VARIANT.hapticOnAdd as any, {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    });
    addCart(product);
  };

  const formattedPrice =
    Math.round(product.price * PRICE_MULTIPLIER).toLocaleString('vi-VN') + ' đ';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
      <Text style={styles.title} numberOfLines={1}>{product.title}</Text>
      <View style={styles.row}>
        <Text style={styles.price}>{formattedPrice}</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 10,
    margin: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  image: {
    height: 90,
    width: '100%',
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  price: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});