import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView, TextInput, Button, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import MapView, { Marker } from 'react-native-maps';

const Createdata = () => {
  const jsonUrl = 'http://10.0.2.2:3000/book'; // API untuk emulator
  const [book_name, setBookName] = useState('');
  const [author_name, setAuthorName] = useState('');
  const [book_price, setBookPrice] = useState('');
  const [genre, setGenre] = useState('');
  const [alamat, setAlamat] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [isMapVisible, setIsMapVisible] = useState(false); // Untuk kontrol apakah peta ditampilkan atau tidak
  const [selectedLocation, setSelectedLocation] = useState(null); // Lokasi yang dipilih
  const [region, setRegion] = useState({
    latitude: -7.795580,  // Koordinat Yogyakarta
    longitude: 110.369489, // Koordinat Yogyakarta
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Fungsi untuk memilih gambar
  const pickImage = () => {
    ImagePicker.launchImageLibrary(
      { mediaType: 'photo', includeBase64: true },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          const selectedImage = response.assets[0];
          setImage(selectedImage.uri);
          console.log('Image URI: ', selectedImage.uri);
        }
      }
    );
  };

  // Fungsi untuk menampilkan peta dan memilih lokasi
  const selectLocationHandler = () => {
    setIsMapVisible(true); // Menampilkan peta
  };

  // Fungsi untuk menangani pemilihan lokasi di peta
  const onMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation(coordinate);
    setLongitude(coordinate.longitude.toString());
    setLatitude(coordinate.latitude.toString());
    setIsMapVisible(false); // Sembunyikan peta setelah memilih lokasi
  };

  // Fungsi untuk zoom in peta
  const zoomIn = () => {
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta / 2,
      longitudeDelta: prevRegion.longitudeDelta / 2,
    }));
  };

  // Fungsi untuk zoom out peta
  const zoomOut = () => {
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta * 2,
      longitudeDelta: prevRegion.longitudeDelta * 2,
    }));
  };

  const submit = () => {
    const data = {
      book_name: book_name,
      author_name: author_name,
      book_price: book_price,
      genre: genre,
      alamat: alamat,
      longitude: longitude,
      latitude: latitude,
    };

    fetch(jsonUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        alert('Data tersimpan');
        setBookName('');
        setAuthorName('');
        setBookPrice('');
        setGenre('');
        setAlamat('');
        setLongitude('');
        setLatitude('');
      });
  };

  return (
    <ImageBackground
      source={require('./assets/images/book1.jpg')} // Ganti dengan path gambar latar belakang yang diinginkan
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.title}>Tambahkan Buku yang Ingin Dijual</Text>
          <ScrollView style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Judul Buku"
              value={book_name}
              onChangeText={(value) => setBookName(value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Nama Penulis"
              value={author_name}
              onChangeText={(value) => setAuthorName(value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Harga Buku"
              value={book_price}
              onChangeText={(value) => setBookPrice(value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Genre Buku"
              value={genre}
              onChangeText={(value) => setGenre(value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Alamat"
              value={alamat}
              onChangeText={(value) => setAlamat(value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Longitude"
              value={longitude}
              onChangeText={(value) => setLongitude(value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Latitude"
              value={latitude}
              onChangeText={(value) => setLatitude(value)}
            />

            {/* Input untuk memilih lokasi */}
            <TouchableOpacity style={styles.locationButton} onPress={selectLocationHandler}>
              <Text style={styles.locationButtonText}>Pilih Lokasi</Text>
            </TouchableOpacity>

            {/* Tampilkan lokasi yang dipilih */}
            {selectedLocation && (
              <Text style={styles.locationText}>
                Lokasi Dipilih: Lat: {selectedLocation.latitude}, Lng: {selectedLocation.longitude}
              </Text>
            )}

            {/* Tampilkan peta jika mapVisible true */}
            {isMapVisible && (
              <View>
                <MapView
                  style={styles.map}
                  region={region}
                  onPress={onMapPress}
                >
                  {selectedLocation && (
                    <Marker coordinate={selectedLocation} />
                  )}
                </MapView>

                {/* Tombol untuk zoom in dan zoom out */}
                <View style={styles.zoomButtons}>
                  <TouchableOpacity onPress={zoomIn} style={styles.zoomButton}>
                    <Text style={styles.zoomText}>Zoom In</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={zoomOut} style={styles.zoomButton}>
                    <Text style={styles.zoomText}>Zoom Out</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <TouchableOpacity style={styles.submitButton} onPress={submit}>
              <Text style={styles.submitButtonText}>Simpan</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Createdata;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Mengatur gambar untuk menutupi layar
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Mengatur transparansi agar gambar lebih terlihat
  },
  title: {
    paddingVertical: 12,
    backgroundColor: '#8D6E63', // Coklat tua
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  form: {
    padding: 15,
    marginBottom: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: '#A1887F', // Warna coklat lembut
    backgroundColor: '#FBE9E7', // Warna oranye pucat
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginVertical: 8,
    color: '#5D4037',
    elevation: 1,
  },
  locationButton: {
    backgroundColor: '#FF7043', // Warna oranye terang
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  locationButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  locationText: {
    color: '#5D4037',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  map: {
    width: '100%',
    height: 400,
    marginVertical: 20,
  },
  zoomButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  zoomButton: {
    backgroundColor: '#FF7043',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  zoomText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#6D4C41', // Warna coklat tua
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
