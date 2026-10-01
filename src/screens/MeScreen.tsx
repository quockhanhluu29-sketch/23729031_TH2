import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { STUDENT } from '@constants/student';
import { COLORS } from '@constants/theme';
import { useAuthStore } from '@stores/authStore';
import { useCampusLocation } from '@hooks/useCampusLocation';

export default function MeScreen() {
  const logout = useAuthStore((state) => state.logout);
  const { status, requestPermission, openSettings } = useCampusLocation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>TÔI · LOCATION</Text>
      </View>

      <View style={styles.profileCard}>
        <Text style={styles.name}>{STUDENT.hoTen}</Text>
        <Text style={styles.mssv}>{STUDENT.mssv}</Text>
      </View>

      <View style={styles.permissionCard}>
        <Text style={styles.statusText}>Quyền: {status}</Text>
        <Text style={styles.subText}>≈ 1.2 km tới cổng KTX</Text>
        <Text style={styles.shipLabel}>Phí ship ước tính</Text>
        <Text style={styles.shipVal}>12.000 đ</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.btnPrimary} onPress={requestPermission}>
          <Text style={styles.btnTextWhite}>Lấy vị trí ước tính ship</Text>
        </TouchableOpacity>

        {status === 'blocked' && (
          <TouchableOpacity style={styles.btnOutline} onPress={openSettings}>
            <Text style={styles.btnTextPrimary}>Mở Cài đặt (blocked)</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.btnDanger} onPress={logout}>
          <Text style={styles.btnTextWhite}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { backgroundColor: COLORS.primary, padding: 12, alignItems: 'center' },
  headerTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  profileCard: { backgroundColor: '#FFF', margin: 16, padding: 16, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  name: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
  mssv: { fontSize: 13, color: COLORS.textLight, marginTop: 4 },
  permissionCard: { backgroundColor: '#FFF', marginHorizontal: 16, padding: 16, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border },
  statusText: { fontSize: 14, fontWeight: '600', color: COLORS.success },
  subText: { fontSize: 13, color: COLORS.textLight, marginTop: 4 },
  shipLabel: { fontSize: 12, color: COLORS.textLight, marginTop: 8 },
  shipVal: { fontSize: 18, fontWeight: 'bold', color: COLORS.primary },
  actions: { padding: 16, marginTop: 'auto' },
  btnPrimary: { backgroundColor: COLORS.primary, padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  btnOutline: { backgroundColor: '#FFF', borderWidth: 1, borderColor: COLORS.primary, padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  btnDanger: { backgroundColor: COLORS.error, padding: 14, borderRadius: 8, alignItems: 'center' },
  btnTextWhite: { color: '#FFF', fontWeight: 'bold' },
  btnTextPrimary: { color: COLORS.primary, fontWeight: 'bold' },
});