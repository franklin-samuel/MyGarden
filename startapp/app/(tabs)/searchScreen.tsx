import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { useRouter } from 'expo-router';
import { searchPlants, Plant } from '../../services/perenual';
import { useUserPlants } from './../context/plantsContext';
import LottieView from 'lottie-react-native';
import colors from '../../constants/colors';

function normalizeToString(value: string | string[] | null | undefined): string {
  if (!value) return '';
  if (Array.isArray(value)) {
    return value.filter((v): v is string => typeof v === 'string').join(' ').toLowerCase();
  }
  return typeof value === 'string' ? value.toLowerCase() : '';
}

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [allResults, setAllResults] = useState<Plant[]>([]);
  const [filteredResults, setFilteredResults] = useState<Plant[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const router = useRouter();
  const { addPlant } = useUserPlants();

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim() !== '') {
        setLoading(true);
        try {
          const data = await searchPlants(query.trim());
          setAllResults(data);
          setSearched(true);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        setAllResults([]);
        setFilteredResults([]);
        setSearched(false);
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (query.trim() === '') {
      setFilteredResults([]);
      return;
    }

    const q = query.toLowerCase();
    const filtered = allResults
      .filter((plant) => {
        const common = normalizeToString(plant.common_name);
        const scientific = normalizeToString(plant.scientific_name);
        const other = normalizeToString(plant.other_name);

        return (
          common.includes(q) ||
          scientific.includes(q) ||
          other.includes(q) ||
          plant.id.toString() === q
        );
      });

    setFilteredResults(filtered);
  }, [query, allResults]);

  function handleAddPlant(plant: Plant) {
    addPlant(plant);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      router.replace('/');
    }, 1600);
  }

  function cancelSearch() {
    router.replace('/');
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.wholePage}>
        <Modal visible={showSuccess} transparent animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <LottieView
                source={require('../../assets/animations/Animation - 1749587417177.json')}
                autoPlay
                loop={false}
                style={{ width: 150, height: 150 }}
              />
              <Text style={styles.successText}>Planta adicionada!</Text>
            </View>
          </View>
        </Modal>

        <View style={styles.hed}>
          <View style={styles.searchBox}>
            <Image
              source={require('../../assets/images/search.png')}
              style={styles.lupa}
            />
            <TextInput
              placeholder="Pesquisar"
              placeholderTextColor={colors.textSecondary}
              value={query}
              onChangeText={setQuery}
              style={styles.inputBox}
              returnKeyType="search"
            />
          </View>
          <TouchableOpacity onPress={cancelSearch} style={styles.cancelView}>
            <Text style={styles.cancelBtn}>Cancelar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.resultsArea}>
          {loading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.loadingText}>Buscando plantas...</Text>
            </View>
          ) : query.trim() !== '' ? (
            filteredResults.length > 0 ? (
              <FlatList
                data={filteredResults}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 30 }}
                renderItem={({ item }) => {
                  const imageUri = item?.default_image?.thumbnail;
                  const hasImage = imageUri && imageUri.trim() !== '';

                  return (
                    <View style={styles.resultItem}>
                      <TouchableOpacity
                        style={styles.resultInfo}
                        onPress={() =>
                          router.push({
                            pathname: `/plants/[id]`,
                            params: { id: item.id.toString() },
                          })
                        }
                      >
                        <Image
                          source={
                            hasImage
                              ? { uri: imageUri }
                              : require('../../assets/plantImages/default.jpg')
                          }
                          style={styles.imgPlant}
                          resizeMode="cover"
                        />
                        <Text style={styles.textName}>
                          {normalizeToString(item.common_name) || 'Sem nome'}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => handleAddPlant(item)}>
                        <Text style={styles.btnAdd}>+ Adicionar</Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            ) : searched ? (
              <Text style={styles.noPlantText}>Nenhuma planta encontrada</Text>
            ) : null
          ) : null}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  wholePage: {
    flex: 1,
    padding: 15,
    backgroundColor: colors.background,
  },
  hed: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
    height: '10%',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    width: '75%',
    backgroundColor: colors.card,
  },
  lupa: {
    width: 22,
    height: 22,
    marginRight: 7,
    tintColor: colors.textSecondary,
    marginLeft: 7,
  },
  inputBox: {
    flex: 1,
    height: 42,
    padding: 10,
    color: colors.textPrimary,
  },
  cancelView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  cancelBtn: {
    color: colors.primary,
    fontWeight: '700',
  },
  resultsArea: {
    flex: 1,
    marginTop: 20,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  resultInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgPlant: {
    width: 38,
    height: 38,
    borderRadius: 8,
    marginRight: 14,
    backgroundColor: 'transparent',
  },
  textName: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  btnAdd: {
    fontWeight: 'bold',
    color: colors.primary,
  },
  noPlantText: {
    marginTop: 22,
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 17,
  },
  loaderContainer: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: colors.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.card,
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 10,
  },
  successText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
});
