import { createContext, useContext } from 'react';

export const SupabaseContext = createContext(null);

export const useSupabase = () => useContext(SupabaseContext);
