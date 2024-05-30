import { Routes, Route } from 'react-router-dom';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import {
  createuserDocumentFromAuth,
  onAuthStateChangedListener,
} from './utils/firebase/firebase.utils';
import { setCurrentUser } from './store/user/user.slice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createuserDocumentFromAuth(user);
      }
      // pick out needed user values from UserImpl class object to avoid non-serializable error message from default middleware
      const pickedUser =
        user && (({ accessToken, email }) => ({ accessToken, email }))(user);
      console.log(setCurrentUser(pickedUser));
      dispatch(setCurrentUser(pickedUser));
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
