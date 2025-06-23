import React from 'react';
import { Stack } from 'expo-router';
import { UserPlantsProvider } from './context/plantsContext';
import { Provider as PaperProvider } from 'react-native-paper'


export default function Layout() {
    return(
        <PaperProvider>
            <UserPlantsProvider>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="searchScreen" options={{ headerShown: false }}/>
                </Stack>
            </UserPlantsProvider>
        </PaperProvider>
    )
}