import { createContext, useState, useEffect } from 'react';

import {
  onAuthStateChangedListener,
  createuserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';

// actual value that will be accessed
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// user provider component--allows any component wrapped in provider element to access
// the value(s) passed into it

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  // pass object containing the two important values that need to be accessed
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createuserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
