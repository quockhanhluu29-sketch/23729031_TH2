import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { STUDENT } from '@constants/student';
import { COLORS } from '@constants/theme';
import { useAuthStore } from '@stores/authStore';


export default function LoginScreen() {
  const [inputVal, setInputVal] = useState('');
  const login = useAuthStore((state) => state.login);

  const handleLogin = () => {
    login(inputVal);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Khung chứa nội dung chính và đẩy watermark xuống đáy */}
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <Text style={styles.logo}>KTXGO</Text>
          <Text style={styles.subtitle}>Giao đồ tận phòng ký túc xá</Text>

          <View style={styles.inputBox}>
            <Text style={styles.label}>Phone — {STUDENT.mssv}@iuh.edu.vn</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập số điện thoại..."
              value={inputVal}
              onChangeText={setInputVal}
              keyboardType="phone-pad"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Vào cửa hàng</Text>
          </TouchableOpacity>

          <Text style={styles.hint}>Auth Stack · chưa có token</Text>
        </View>

        {/* Thanh Watermark đã được chuyển xuống dưới cùng */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  wrapper: { flex: 1, justifyContent: 'space-between' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  logo: { fontSize: 32, fontWeight: 'bold', color: COLORS.primary, marginBottom: 4 },
  subtitle: { fontSize: 13, color: COLORS.textLight, marginBottom: 30 },
  inputBox: { width: '100%', borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, padding: 12, backgroundColor: '#FFF', marginBottom: 20 },
  label: { fontSize: 11, color: COLORS.textLight, marginBottom: 4 },
  input: { fontSize: 15, color: COLORS.text },
  button: { width: '100%', backgroundColor: COLORS.primary, padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  hint: { marginTop: 15, fontSize: 12, color: COLORS.textLight },
});