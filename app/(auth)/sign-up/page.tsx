import React from 'react';
import AuthForm from '../../../componets/AuthForm';
import { FormType } from '../../../types/auth.types';

export default function SignUpPage() {
  return (
    <AuthForm type={FormType.REGISTER} />
  );
}