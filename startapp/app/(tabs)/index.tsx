import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'

const primaryColor = '#7AB865'


export default function HomeScreen() {
    const router = useRouter()

    return(
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
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff',
        height: '100%'
    },
    head: {
        flexDirection: 'column',
        marginTop: 50,
        marginLeft: 20
    },
    h1: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    h2: {
        color: '#666'
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
        justifyContent: 'center'
    },
    h1center: {
        textAlign: 'center',
        fontSize: 29,
        fontWeight: 'bold'
    },
    h2center: {
        color: '#666'
    },
    button: {
        borderRadius: 25,
        backgroundColor: primaryColor,
        alignItems: 'center',
        width: '100%',
        height: 60,
        justifyContent: 'center',
        elevation: 12
    },
    buttonText: {
        color: 'white',
        fontSize: 21,
        fontWeight: 'bold'
    }


})