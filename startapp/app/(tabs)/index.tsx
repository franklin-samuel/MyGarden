import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useUserPlants } from '../context/plantsContext';

const primaryColor = '#7AB865';

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
            <Text style={styles.h1plant}>Suas Plantas</Text>
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
                            <Text>{item.common_name}</Text>
                        </View>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff',
        height: '100%',
    },
    head: {
        flexDirection: 'column',
        marginTop: 50,
        marginLeft: 20,
    },
    h1: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    h2: {
        color: '#666',
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
        fontSize: 29,
        fontWeight: 'bold',
    },
    h2center: {
        color: '#666',
    },
    button: {
        borderRadius: 25,
        backgroundColor: primaryColor,
        alignItems: 'center',
        width: '100%',
        height: 60,
        justifyContent: 'center',
        elevation: 12,
    },
    buttonText: {
        color: 'white',
        fontSize: 21,
        fontWeight: 'bold',
    },

    // plants.lenght > 0
    mainPlants: {
        flex: 1,
        backgroundColor: '#fff',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    plantCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        marginRight: 15,
        width: 220,
        maxHeight: '75%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 20,
        justifyContent: 'space-between',
        marginTop: 70,
        borderWidth: 2,
        borderColor: primaryColor
    },
    h1plant: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 12,
    },
    plantImageCard: {
        width: '100%',
        height: '50%',
        borderRadius: 12,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    },
});
