import React from 'react';
import { Tabs } from 'expo-router';
import { Image } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#7AB865',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarStyle: {
          borderTopColor: '#CCC',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Lembrete',
          tabBarActiveTintColor: '#7AB865',
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require('../../assets/images/alarme.png')}
              style={{
                width: size ?? 24,
                height: size ?? 24,
                tintColor: focused ? '#7AB865' : '#888',
                alignSelf: 'center',
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="myPlants"
        options={{
          title: 'Suas plantas',
          tabBarActiveTintColor: '#7AB865',
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require('../../assets/images/planta.png')}
              style={{
                width: size ?? 24,
                height: size ?? 24,
                tintColor: focused ? '#7AB865' : '#888',
                alignSelf: 'center',
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="searchScreen"
        options={{
          title: 'Pesquisar',
          tabBarActiveTintColor: '#7AB865',
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require('../../assets/images/search.png')}
              style={{
                width: size ?? 24,
                height: size ?? 24,
                tintColor: focused ? '#7AB865' : '#888',
                alignSelf: 'center',
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tabs>

  );
}
