import { useState } from 'react';
import {
  auth,
  signInWithGooglePopup,
  createuserDocumentFromAuth,
} from '../../../utils/firebase/firebase.utils';

import Button from '../../button/button.component';
import FormInput from '../../form-input/form-input.component';
import SignUpForm from '../../sign-up-form/sign-up-form.component';
import SignInForm from '../../sign-in-form/sign-in-form.component';

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createuserDocumentFromAuth(user);
  };

  return (
    <div>
      <SignInForm />
      <Button buttonType="google" type="submit" onClick={logGoogleUser}>
        SIGN IN WITH GOOGLE
      </Button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
