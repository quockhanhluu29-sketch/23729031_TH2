import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCartStore } from '@stores/cartStore';
import { ROOM_LABEL, BASE_SHIP_FEE, PRICE_MULTIPLIER } from '@constants/student';
import { COLORS } from '@constants/theme';
import Watermark from '@components/Watermark';

export default function CartScreen() {
  const { items, changeQty, remove, totalAmount } = useCartStore();
  const rawTotal = totalAmount(PRICE_MULTIPLIER);
  // Công thức B cho số cuối 1: BASE_SHIP_FEE + Math.round(km * 1500) + 2000
  // Giả sử khoảng cách giả lập km = 1.2
  const shipFee = BASE_SHIP_FEE + Math.round(1.2 * 1500) + 2000;
  const finalTotal = rawTotal + (items.length > 0 ? shipFee : 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>GIỎ HÀNG</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.product.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemName} numberOfLines={1}>{item.product.title}</Text>
              <Text style={styles.itemQty}>x{item.quantity} · {(Math.round(item.product.price * PRICE_MULTIPLIER) * item.quantity).toLocaleString('vi-VN')} đ</Text>
            </View>
            <View style={styles.qtyBox}>
              <TouchableOpacity onPress={() => changeQty(item.product.id, -1)} style={styles.qtyBtn}><Text>-</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => changeQty(item.product.id, 1)} style={styles.qtyBtn}><Text>+</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => remove(item.product.id)} style={styles.delBtn}><Text style={{color: '#FFF'}}>×</Text></TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.list}
      />

      <View style={styles.shipCard}>
        <Text style={styles.shipTitle}>Giao đến {ROOM_LABEL}</Text>
        <Text style={styles.shipPrice}>Phí ship: {shipFee.toLocaleString('vi-VN')} đ (công thức B)</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.totalText}>Tổng hàng: {finalTotal.toLocaleString('vi-VN')} đ</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { backgroundColor: COLORS.primary, padding: 12, alignItems: 'center' },
  headerTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  list: { padding: 12 },
  itemRow: { flexDirection: 'row', backgroundColor: '#FFF', padding: 12, borderRadius: 8, marginBottom: 8, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  itemName: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  itemQty: { fontSize: 12, color: COLORS.textLight, marginTop: 4 },
  qtyBox: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  qtyBtn: { width: 26, height: 26, backgroundColor: '#E0E7FF', justifyContent: 'center', alignItems: 'center', borderRadius: 4 },
  delBtn: { width: 26, height: 26, backgroundColor: COLORS.error, justifyContent: 'center', alignItems: 'center', borderRadius: 4, marginLeft: 4 },
  shipCard: { margin: 12, padding: 12, backgroundColor: '#FFF', borderWidth: 1, borderColor: COLORS.secondary, borderRadius: 8 },
  shipTitle: { fontWeight: 'bold', color: COLORS.secondary },
  shipPrice: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
  footer: { padding: 16, backgroundColor: '#FFF', borderTopWidth: 1, borderColor: COLORS.border, alignItems: 'center' },
  totalText: { fontSize: 16, fontWeight: 'bold', color: COLORS.primary },
});