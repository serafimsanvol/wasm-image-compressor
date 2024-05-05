'use client';

import { signIn } from 'next-auth/react';

const SignIn = () => {
  return (
    <button
      className="btn btn-primary btn-outline"
      onClick={() => signIn('google')}
    >
      Sign in
    </button>
  );
};

export default SignIn;
