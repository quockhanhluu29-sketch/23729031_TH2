import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { STUDENT } from '@constants/student';

export default function Watermark() {
  const stamp = (STUDENT as any).stamp || '#4F21A9';
  const fullName = STUDENT.hoTen || (STUDENT as any).fullName || 'LUU QUOC KHANH';

  return (
    <View style={styles.container}>
      <Text style={styles.text} numberOfLines={1}>
        TH2 · {STUDENT.mssv} · {fullName} · {stamp}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E0F2FE', // Màu nền xanh nhạt đúng chuẩn mẫu
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    color: '#1D4ED8', // Chữ màu xanh đậm nổi bật trên nền xanh nhạt
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});