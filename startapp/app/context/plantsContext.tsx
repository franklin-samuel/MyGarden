import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Plant } from '../../services/perenual';

interface UserPlantsContextType {
    plants: Plant[];
    addPlant: (plant: Plant) => void;
}

const UserPlantsContext = createContext<UserPlantsContextType | undefined>(undefined)

export function UserPlantsProvider({children}: { children: ReactNode }) {
    const [plants, setPlants] = useState<Plant[]>([]);

    function addPlant(plant: Plant) {
        setPlants((prev) => [...prev, plant])
    }

    return (
        <UserPlantsContext.Provider value={{plants, addPlant}}>
            {children}
        </UserPlantsContext.Provider>
    )
}

export function useUserPlants() {
    const context = useContext(UserPlantsContext);
    if (!context) {
        throw new Error('useUserPlants deve ser usado dentro de UserPlantsProvider')
    }
    return context;
}