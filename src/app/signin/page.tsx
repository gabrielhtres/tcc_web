'use client';

import { Box, Button, TextField } from '@mui/material';
import BackgroundImage from '../../assets/background.png';
import Logo from '../../assets/logo.svg';
import Image from 'next/image';
import { useRef } from 'react';
import api from '@/utils/api';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const cpfInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const handleSubmit = () => {
    const cpf = cpfInputRef.current?.value;
    const password = passwordInputRef.current?.value;

    if (!cpf || !password) {
      return;
    }

    api
      .post('/signin', {
        email: cpf,
        password,
      })
      .then(res => {
        router.replace(`/scale/${res.data.id}`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Box
      style={{ backgroundImage: `url(${BackgroundImage.src})` }}
      className="h-screen w-screen bg-no-repeat bg-cover flex justify-center items-center">
      <Box className="w-1/2 h-4/6 bg-white radius rounded-3xl flex flex-col justify-evenly items-center py-5">
        <Image
          src={Logo}
          alt="GreenVision"
          className="w-52"
        />
        <p className="font-semibold">Entrar</p>
        <TextField
          label="CPF"
          variant="outlined"
          color="success"
          className="w-8/10"
          inputRef={cpfInputRef}
        />
        <TextField
          label="Senha"
          variant="outlined"
          color="success"
          className="w-8/10"
          inputRef={passwordInputRef}
        />
        <Button
          className="w-8/10 h-12 bg-primary text-white hover:bg-secondary"
          onClick={handleSubmit}>
          Entrar
        </Button>
      </Box>
    </Box>
  );
}
