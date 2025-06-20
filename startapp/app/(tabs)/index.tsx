import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useUserPlants } from '../context/plantsContext';
import colors from '../../constants/colors';

export default function HomeScreen() {
  const { plants } = useUserPlants();
  const router = useRouter();

  if (plants.length === 0) {
    return (
      <View style={styles.main}>
        <View style={styles.head}>
          <Text style={styles.h1}>Lembrete</Text>
          <Text style={styles.h2}>Cuide de cada uma de suas plantas</Text>
        </View>

        <View style={styles.center}>
          <View style={styles.base}>
            <Text style={styles.h1center}>Vamos começar</Text>
            <Text style={styles.h2center}>Lembre de regar suas plantas diariamente!</Text>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/searchScreen')}>
              <Text style={styles.buttonText}>+ Adicionar planta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.mainPlants}>
      <Text style={styles.h1plant}>Minhas Plantas</Text>
      <FlatList
        data={plants}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}
        renderItem={({ item }) => {
          const imageSource = item.default_image?.thumbnail
            ? { uri: item.default_image.thumbnail }
            : require('../../assets/plantImages/default.jpg');

          return (
            <View style={styles.plantCard}>
              <Image source={imageSource} style={styles.plantImageCard} />
              <View style={styles.informations}>
                <Text style={styles.planth1Card}>{item.common_name || 'Nome desconhecido'}</Text>
                <TouchableOpacity style={styles.waterButton}>
                  <Text style={styles.waterButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
      <TouchableOpacity style={styles.floatingButton} onPress={() => router.push('/searchScreen')}>
        <Text style={styles.floatingButtonText}>+ Planta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.background,
  },
  head: {
    flexDirection: 'column',
    marginTop: 50,
    marginLeft: 20,
  },
  h1: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  h2: {
    color: colors.textSecondary,
    fontSize: 16,
    marginTop: 5,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  base: {
    marginBottom: 150,
    gap: 20,
    padding: 50,
    height: '50%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1center: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.primary,
  },
  h2center: {
    color: colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    borderRadius: 25,
    backgroundColor: colors.primary,
    alignItems: 'center',
    width: '100%',
    height: 55,
    justifyContent: 'center',
    elevation: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

  // tela com plantas
  mainPlants: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    alignItems: 'center'
  },
  h1plant: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  plantCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 15,
    marginRight: 16,
    width: 220,
    height: 260,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    marginTop: 150
  },
  plantImageCard: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  informations: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planth1Card: {
    fontWeight: '600',
    fontSize: 17,
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  waterButton: {
    backgroundColor: '#6FAA5F',
    borderRadius: 100,
    width: 70,
    height: 70,
    marginTop: 25,
    justifyContent:'center',
    alignItems: 'center',

  },
  waterButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 37
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 30,
    elevation: 12,
  },
  floatingButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
