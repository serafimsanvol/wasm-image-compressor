'use client';
import { signOut } from 'next-auth/react';

const SignOut = () => {
  return <button onClick={() => signOut()}>Logout</button>;
};

export default SignOut;
