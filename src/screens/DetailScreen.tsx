import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { STUDENT, PRICE_MULTIPLIER, VARIANT } from '@constants/student';
import { COLORS } from '@constants/theme';
import { useCartStore } from '@stores/cartStore';
import Watermark from '@components/Watermark';

export default function DetailScreen({ route, navigation }: any) {
  const { product } = route.params;
  const addCart = useCartStore((state) => state.add);

  const handleAddToCart = () => {
    ReactNativeHapticFeedback.trigger(VARIANT.hapticOnAdd as any, {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    });
    addCart(product);
    Alert.alert('Thành công', `Đã thêm vào giỏ hàng (${STUDENT.mssv})`);
  };

  const formattedPrice =
    Math.round(product.price * PRICE_MULTIPLIER).toLocaleString('vi-VN') + ' đ';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Chi tiết món</Text>
        </TouchableOpacity>
        <Text style={styles.stackLabel}>Stack</Text>
      </View>

      <View style={styles.card}>
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>{formattedPrice}</Text>
        <Text style={styles.subInfo}>Giao nội khu · nhận tận phòng</Text>
        <Text style={styles.desc} numberOfLines={3}>{product.description}</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>Thêm vào giỏ · Haptic</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  navRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, alignItems: 'center' },
  backText: { color: COLORS.primary, fontWeight: 'bold', fontSize: 16 },
  stackLabel: { color: COLORS.secondary, fontWeight: 'bold' },
  card: { backgroundColor: COLORS.surface, margin: 16, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center' },
  image: { width: '100%', height: 180, marginBottom: 16 },
  title: { fontSize: 18, fontWeight: 'bold', color: COLORS.text, textAlign: 'center', marginBottom: 8 },
  price: { fontSize: 16, fontWeight: 'bold', color: COLORS.primary, marginBottom: 8 },
  subInfo: { fontSize: 12, color: COLORS.textLight, marginBottom: 12 },
  desc: { fontSize: 13, color: COLORS.textLight, textAlign: 'center' },
  footer: { padding: 16, marginTop: 'auto' },
  button: { backgroundColor: COLORS.primary, padding: 16, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});