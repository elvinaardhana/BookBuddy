import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

const MapScreen = ({ route, navigation }) => {
  const { selectedBook } = route.params || {}; // Pastikan kita menangani kasus tidak ada data yang diteruskan

  const [loading, setLoading] = useState(false);

  // Pastikan data valid dan menampilkan loading atau error jika tidak ada
  useEffect(() => {
    if (!selectedBook) {
      setLoading(true); // Menandakan data belum diterima
    } else {
      setLoading(false); // Data sudah diterima
    }
  }, [selectedBook]);

  // Tampilkan indikator loading jika data belum ada
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Validasi jika tidak ada data buku atau lokasi
  if (!selectedBook || !selectedBook.latitude || !selectedBook.longitude) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          Lokasi buku tidak ditemukan. Kembali ke daftar buku untuk memilih buku.
        </Text>
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          <Text
            style={{ color: 'blue' }}
            onPress={() => navigation.goBack()} // Tombol kembali ke halaman sebelumnya
          >
            Kembali
          </Text>
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: selectedBook.latitude,
          longitude: selectedBook.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Marker
          coordinate={{
            latitude: selectedBook.latitude,
            longitude: selectedBook.longitude,
          }}
          pinColor="red" // Menggunakan warna merah untuk marker yang dipilih
        >
          <Callout>
            <View style={styles.callout}>
              <Text style={styles.calloutTitle}>{selectedBook.book_name}</Text>
              <Text style={styles.calloutAuthor}>By {selectedBook.author_name}</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  callout: {
    width: 200,
    padding: 10,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  calloutAuthor: {
    fontSize: 14,
    color: 'gray',
  },
});

export default MapScreen;
