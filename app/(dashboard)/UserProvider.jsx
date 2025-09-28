"use client"

import { createContext, useContext } from 'react';

export const CreateUserContext = createContext({
  userName: "",
  userEmail: "",
  workouts: [],
});

export function UserProvider({ children, userName, userEmail, workouts }) {
  return (
    <CreateUserContext.Provider value={{ userName, userEmail, workouts  }}>
      {children}
    </CreateUserContext.Provider>
  );
}

export function useUser() {
  return useContext(CreateUserContext);
}