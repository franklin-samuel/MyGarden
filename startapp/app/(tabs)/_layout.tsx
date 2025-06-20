import React from 'react';
import { Tabs } from 'expo-router';
import { Image } from 'react-native';
import colors from '../../constants/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTintColor: colors.textPrimary,
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          height: 80,
          paddingBottom: 6,
          paddingTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Lembrete',
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require('../../assets/images/alarme.png')}
              style={{
                width: size ?? 24,
                height: size ?? 24,
                tintColor: focused ? colors.primary : colors.textSecondary,
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
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require('../../assets/images/planta.png')}
              style={{
                width: size ?? 24,
                height: size ?? 24,
                tintColor: focused ? colors.primary : colors.textSecondary,
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
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require('../../assets/images/search.png')}
              style={{
                width: size ?? 24,
                height: size ?? 24,
                tintColor: focused ? colors.primary : colors.textSecondary,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tabs>
  );
}
