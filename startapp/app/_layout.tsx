import React from 'react';
import { Stack } from 'expo-router';
import { UserPlantsProvider } from './context/plantsContext';


export default function Layout() {
    return(
        <UserPlantsProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="searchScreen" options={{ headerShown: false }}/>
            </Stack>
        </UserPlantsProvider>
    )
}