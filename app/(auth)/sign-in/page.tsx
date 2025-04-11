"use client";

import AuthForm from "@/componets/AuthForm";
import { FormType } from '@/types/auth.types';

const signin = () => {
  return (
    <AuthForm type={FormType.LOGIN} />
  )
}

export default signin