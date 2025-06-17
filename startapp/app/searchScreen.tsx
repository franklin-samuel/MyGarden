import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { searchPlants, Plant } from '../services/perenual';

// Função para normalizar valores, faz string minuscula e junta arrays
function normalizeToString(value: string | string[] | null | undefined): string {
  if (!value) return '';
  if (Array.isArray(value)) {
    // filtra só strings e junta com espaço
    return value.filter((v): v is string => typeof v === 'string').join(' ').toLowerCase();
  }
  // se for string normal, só passa pra minusculo
  return typeof value === 'string' ? value.toLowerCase() : '';
}

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [allResults, setAllResults] = useState<Plant[]>([]);
  const [filteredResults, setFilteredResults] = useState<Plant[]>([]);
  const [searched, setSearched] = useState(false);

  const router = useRouter();
  // Busca com delay de 500ms
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim() !== '') {
        const data = await searchPlants(query.trim());
        setAllResults(data);
        setSearched(true);
      } else {
        setAllResults([]);
        setFilteredResults([]);
        setSearched(false);
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

    // Filtra os resultados buscando em vários campos
    const filtered = allResults.filter((plant) => {
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

  function cancelSearch() {
    router.replace('/');
  }

  function addPlant(plant: Plant) {
    console.log('Adicionando planta:', plant);
  }

  return (
    <View style={styles.wholePage}>
      <View style={styles.searchBox}>
        <Image
          source={require('../assets/images/search.png')}
          style={styles.lupa}
        />
        <TextInput
          placeholder="Pesquisar"
          value={query}
          onChangeText={setQuery}
          style={styles.inputBox}
          returnKeyType="search"
        />
        <TouchableOpacity onPress={cancelSearch}>
          <Text style={styles.cancelBtn}>Cancelar</Text>
        </TouchableOpacity>
      </View>

      {query.trim() !== '' && (
        <View style={styles.resultsArea}>
          {filteredResults.length > 0 ? (
            <FlatList
              data={filteredResults}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ paddingBottom: 30 }}
              renderItem={({ item }) => (
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
                      source={{
                        uri:
                          item.default_image?.thumbnail ||
                          'https://via.placeholder.com/50',
                      }}
                      style={styles.imgPlant}
                    />
                    <Text style={styles.textName}>
                      {normalizeToString(item.common_name) || 'Sem nome'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => addPlant(item)}>
                    <Text style={styles.btnAdd}>+ Adicionar</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          ) : searched ? (
            <Text style={styles.noPlantText}>Nenhuma planta encontrada</Text>
          ) : null}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wholePage: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginTop: 55,
    marginBottom: 15,
  },
  lupa: {
    width: 22,
    height: 22,
    marginRight: 7,
    tintColor: '#999999',
  },
  inputBox: {
    flex: 1,
    height: 42,
  },
  cancelBtn: {
    marginLeft: 10,
    color: '#6FAA5F',
    fontWeight: '700',
  },
  resultsArea: {
    flex: 1,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderColor: '#eee',
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
    backgroundColor: '#ddd',
  },
  textName: {
    fontSize: 15,
    fontWeight: '500',
  },
  btnAdd: {
    fontWeight: 'bold',
    color: '#6FAA5F',
  },
  noPlantText: {
    marginTop: 22,
    textAlign: 'center',
    color: '#aaa',
    fontSize: 17,
  },
});
