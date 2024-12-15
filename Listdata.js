import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight, faBook } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

const Listdata = () => {
  const navigation = useNavigation();
  const jsonUrl = 'http://10.0.2.2:3000/book'; // URL untuk API
  const [isLoading, setLoading] = useState(true);
  const [dataUser, setDataUser] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => setDataUser(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  function refreshPage() {
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => setDataUser(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }

  function deleteData(id) {
    fetch(`${jsonUrl}/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        alert('Data terhapus');
        refreshPage();
      })
      .catch((error) => console.error(error));
  }

  return (
    <ImageBackground
      source={require('./assets/images/book3.jpg')} // Ganti dengan path gambar lokal Anda
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        {isLoading ? (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : (
          <FlatList
            data={dataUser}
            onRefresh={refreshPage}
            refreshing={refresh}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <TouchableOpacity
                  style={styles.card}
                  onPress={() =>
                    navigation.navigate('MapScreen', {
                      selectedBook: item, // Mengirimkan data buku yang dipilih
                    })
                  }
                  
                >
                  <View style={styles.avatar}>
                    <FontAwesomeIcon icon={faBook} size={40} color="#FF7043" />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.cardtitle}>{item.book_name}</Text>
                    <Text style={styles.cardSubtitle}>{item.author_name}</Text>
                    <Text style={styles.book_price}>{item.book_price}</Text>
                  </View>
                  <View style={styles.chevron}>
                    <FontAwesomeIcon icon={faChevronRight} size={20} color="#8D6E63" />
                  </View>
                </TouchableOpacity>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() =>
                      Alert.alert('Hapus data', 'Yakin akan menghapus data ini?', [
                        { text: 'Tidak', onPress: () => console.log('Batal') },
                        { text: 'Ya', onPress: () => deleteData(item.id) },
                      ])
                    }
                  >
                    <Text style={styles.deleteButtonText}>Hapus</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Listdata;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Mengatur gambar untuk menutupi layar
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // Warna putih transparan di atas gambar
  },
  loadingText: {
    fontSize: 18,
    color: '#6D4C41',
  },
  itemContainer: {
    marginBottom: 10,
    paddingTop: 5,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FBE9E7', // Oranye pucat
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6D4C41', // Coklat tua
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#795548', // Coklat sedang
    marginTop: 3,
  },
  genre: {
    fontSize: 12,
    color: '#A1887F', // Coklat lembut
    marginTop: 2,
  },
  chevron: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginTop: 5,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#D84315',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
