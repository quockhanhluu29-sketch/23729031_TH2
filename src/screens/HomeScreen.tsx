import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { FlashList } from '@shopify/flash-list';
import { fetchProducts } from '@services/productApi';
import { STUDENT, STALE_TIME_MS, DEBOUNCE_MS, ROOM_LABEL } from '@constants/student';
import { COLORS } from '@constants/theme';
import { useDebouncedValue } from '@hooks/useDebouncedValue';
import Watermark from '@components/Watermark';
import ProductCard from '@components/ProductCard';

export default function HomeScreen({ navigation }: any) {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, DEBOUNCE_MS);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: STALE_TIME_MS,
  });

  const filteredData = data?.filter((item) =>
    item.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  // 1. Trạng thái Đang tải (Loading)
  if (isLoading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Đang tải món...</Text>
      </SafeAreaView>
    );
  }

  // 2. Trạng thái Lỗi mạng (Error)
  if (isError) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.errorTitle}>LỖI MẠNG</Text>
        <View style={styles.errorCard}>
          <Text style={styles.errorMssv}>{STUDENT.mssv}</Text>
          <Text style={styles.errorText}>Không tải được dữ liệu món.</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
            <Text style={styles.retryText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // 3. Trạng thái Có dữ liệu (Data) - Đã đưa Watermark xuống dưới cùng
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>KTXGO</Text>
          <Text style={styles.headerSub}>Giao tận {ROOM_LABEL}</Text>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={`Tìm món (debounce) — ${STUDENT.mssv}`}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <View style={{ flex: 1 }}>
          <FlashList
            data={filteredData}
            numColumns={2}
            estimatedItemSize={200}
            keyExtractor={(item: any) => `${STUDENT.mssv}-${item.id}`}
            renderItem={({ item }: any) => (
              <ProductCard
                product={item}
                onPress={() => navigation.navigate('Detail', { id: item.id.toString(), product: item })}
              />
            )}
            contentContainerStyle={styles.listContainer}
            refreshing={isLoading}
            onRefresh={() => refetch()}
            {...({} as any)}
          />
        </View>
      </View>

      {/* Thanh định danh cá nhân đã được chuyển xuống đáy màn hình */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  mainContent: { flex: 1, justifyContent: 'space-between' },
  loadingText: { marginTop: 12, color: COLORS.text, fontWeight: '600', fontSize: 14 },
  header: { paddingHorizontal: 16, paddingVertical: 10, backgroundColor: COLORS.primary },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFF' },
  headerSub: { fontSize: 12, color: '#E0E7FF', marginTop: 2 },
  searchContainer: { padding: 12 },
  searchInput: { backgroundColor: '#FFF', borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, paddingHorizontal: 12, height: 42, color: COLORS.text },
  listContainer: { paddingHorizontal: 6 },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: COLORS.background, 
    padding: 20 
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 12,
  },
  errorCard: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#1E293B',
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  errorMssv: { 
    color: COLORS.error, 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 8 
  },
  errorText: { 
    color: COLORS.text, 
    fontSize: 15, 
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24 
  },
  retryButton: { 
    backgroundColor: COLORS.error, 
    width: '100%',
    paddingVertical: 14, 
    borderRadius: 12,
    alignItems: 'center' 
  },
  retryText: { 
    color: '#FFF', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
});