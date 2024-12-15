import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Createdata from './Createdata';
import Listdata from './Listdata';
import MapScreen from './MapScreen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faList, faMap } from '@fortawesome/free-solid-svg-icons';
import { StyleSheet } from 'react-native';

// Buat Stack Navigator untuk Listdata
const Stack = createStackNavigator();

function DatabukuStack() {
  return (
    <Stack.Navigator screenOptions={styles.headerStyle}>
      <Stack.Screen 
        name="Databuku" 
        component={Listdata} 
        options={{ title: 'Daftar Buku yang Tersedia' }}
      />
      <Stack.Screen 
        name="MapScreen" 
        component={MapScreen} 
        options={{ title: 'Lokasi Buku yang Tersedia' }}
      />
    </Stack.Navigator>
  );
}

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

export default function CrudBookNav() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            // Tentukan ikon berdasarkan route
            if (route.name === 'Home') {
              iconName = faHome;
            } else if (route.name === 'List Buku') {
              iconName = faList;
            } else if (route.name === 'Map') {
              iconName = faMap;
            }

            return <FontAwesomeIcon icon={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#8D6E63', // Warna aktif (coklat)
          tabBarInactiveTintColor: '#BCAAA4', // Warna non-aktif (coklat muda)
          tabBarStyle: styles.tabBar, // Tambahkan style tab bar
          headerShown: false,
        })}
      >
        {/* Memindahkan List Buku ke tab pertama */}
        <Tab.Screen 
          name="List Buku" 
          component={DatabukuStack} 
          options={{ title: 'Daftar Buku' }}
        />
        <Tab.Screen 
          name="Home" 
          component={Createdata} 
          options={{ title: 'Tambah Buku' }}
        />
        {/* Menambahkan MapScreen sebagai tab baru */}
        <Tab.Screen 
          name="Map" 
          component={MapScreen} 
          options={{ title: 'Peta Buku' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Styling tambahan
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FBE9E7', // Oranye lembut
    borderTopWidth: 1,
    borderTopColor: '#D7CCC8', // Coklat muda
    height: 60,
    paddingBottom: 5,
    paddingTop: 5,
  },
  headerStyle: {
    headerStyle: {
      backgroundColor: '#8D6E63', // Coklat tua
    },
    headerTintColor: '#FFFFFF',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});
