import React from 'react'
import DataBook from './data/book.json'
import { FlatList, Text, View, TouchableOpacity, Linking, StyleSheet } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBook, faMars, faUserGraduate, faVenus } from '@fortawesome/free-solid-svg-icons';

const Book = () => {
    return (
        <FlatList
            data={DataBook}
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() =>
                        Linking.openURL('google.navigation:q=' + item.latitude + ',' + item.longitude)} >
                    <View style={styles.card}>
                        <View style={styles.avatar}>
                            <FontAwesomeIcon icon={faBook} size={50} 
                            color={'black'} />
                        </View>
                        <View>
                            <Text style={styles.cardtitle}>{item.book_name}{item.author_name}</Text>
                            
                            <Text>{item.alamat}</Text>
                            <Text>{item.latitude}, {item.longitude}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
        />

    )
}
export default Book

const styles = StyleSheet.create({
    title: {
      paddingVertical: 12,
      backgroundColor: '#333',
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    avatar: {
      borderRadius: 100,
      width: 70,
    },
    cardtitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    card: {
      flexDirection: 'row',
      padding: 20,
      borderRadius: 10,
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,
      elevation: 2,
      marginHorizontal: 20,
      marginVertical: 7
    },
   })
   