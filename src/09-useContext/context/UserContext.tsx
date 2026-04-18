import { createContext, useEffect, useState, type PropsWithChildren } from 'react';
import type { User } from '../data/user-mock-data';
import { users } from '../data/user-mock-data';
// interface UserContextProps {
//   children: React.ReactNode;
// }

// export const UserContextProvider = ({ children }: UserContextProps) => {

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

interface UserContextProps {
  // state
  authStatus: 'checking' | 'authenticated' | 'not-authenticated';
  user: User | null

  // Methods
  login: (userId: number) => boolean;
  logout: () => void;
}

export const UserContext = createContext<UserContextProps>({} as UserContextProps);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>('checking');
  const [user, setUser] = useState<User | null>(null);


  const handleLogin = (userId: number) => {
    console.log('login');
    const user = users.find((user) => user.id === userId);

    if (!user) {
      console.log(`User not found id: ${userId}`);
      setUser(null);
      setAuthStatus('not-authenticated');
      return false;
    }

    setUser(user);
    setAuthStatus('authenticated');

    localStorage.setItem('userId', userId.toString());
    return true;
  };

  const handleLogout = () => {
    console.log('logout');
    setAuthStatus('not-authenticated');
    setUser(null);
    localStorage.removeItem('userId');
  }

  useEffect(() => {
    const storeUserId = localStorage.getItem('userId');
    if ( storeUserId ) {
      handleLogin(+storeUserId);
      return;
    }
    handleLogout();
  }, [])
  
  return (
    <>
      return <UserContext value={{
        authStatus: authStatus,
        user: user,
        login: handleLogin,
        logout: handleLogout
      }}>{children}
      </UserContext>      

    </>
  )
}
