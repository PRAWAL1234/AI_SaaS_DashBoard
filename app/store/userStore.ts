import { useState, useEffect, useMemo } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

  interface UserState {
  id:number | null;
  username: string;
  email: string;
  isLoggedIn: boolean;
  setUserData: (id:number,username: string, email: string) => void;
  clearUserData: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      id:null,
      username: '',
      email: '',
      isLoggedIn: false,
      setUserData: (id:number, username:string, email:string) => set({ id, username, email, isLoggedIn: true }),
      clearUserData: () => set({ id:null,username: '', email: '', isLoggedIn: false }),
    }),
    { name: 'user-storage' }
  )
);

export const useSyncUser = () => {
  const userId = useUserStore((state) => state?.id);
  const userName = useUserStore((state) => state?.username);
  const userEmail = useUserStore((state) => state?.email);
  
  useEffect(() => {
    console.log(userId,userName,userEmail);

    if (!userName && !userEmail) {
        console.log(`No user data found in local storage`);
      
    }
  }, [userName, userEmail]);


  return {
    userId,
    userName,
    userEmail,
  };
};
