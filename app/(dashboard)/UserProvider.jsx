"use client"

import { createContext, useContext } from 'react';

export const CreateUserContext = createContext(null);

export function UserProvider({ children, userName, userEmail }) {
  return (
    <CreateUserContext.Provider value={{ userName, userEmail }}>
      {children}
    </CreateUserContext.Provider>
  );
}

export function useUser() {
  return useContext(CreateUserContext);
}