'use client';

import {useSearchParams} from 'next/navigation';
import {ChangeEvent, useState} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import {inputCPFMask, inputDateMask, inputPhoneMask} from './utils';
import {Input, Row} from './components';
import axios from 'axios';

type Inputs = {
  name: string;
  cpf: string;
  age: string;
  city: string;
  phone: string;
  email: string;
  team: string;
  distance: string;
  shirtSize: string;
};

export const PREFIX_LOCAL_STORAGE = '@samas-trail:';

export default function Cadastro() {
  const [errorInputName, setErrorInputName] = useState(false);
  const [errorInputCPF, setErrorInputCPF] = useState(false);
  const [errorInputAge, setErrorInputAge] = useState(false);
  const [errorInputCity, setErrorInputCity] = useState(false);
  const [errorInputPhone, setErrorInputPhone] = useState(false);
  const [errorInputEmail, setErrorInputEmail] = useState(false);
  const [errorInputDistance, setErrorInputDistance] = useState(false);
  const [errorInputShirtSize, setErrorInputShirtSize] =
    useState(false);

  const {control, handleSubmit, setValue} = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setErrorInputName(false);
    setErrorInputCPF(false);
    setErrorInputAge(false);
    setErrorInputCity(false);
    setErrorInputPhone(false);
    setErrorInputEmail(false);
    setErrorInputDistance(false);

    if (!data.name) {
      toast.error('Preencha o campo de Nome completo!', {
        theme: 'dark',
      });
      setErrorInputName(true);
      return;
    }

    if (!data.cpf || data.cpf.length < 14) {
      toast.error(
        data.cpf?.length < 14
          ? 'CPF Inválido!'
          : 'Preencha o campo de CPF!'
      );
      setErrorInputCPF(true);
      return;
    }

    if (!data.age || data.age.length < 8) {
      toast.error(
        data.age?.length < 8
          ? 'Data Inválida!'
          : 'Preencha o campo de Data de Nascimento!'
      );
      setErrorInputAge(true);
      return;
    }

    if (!data.city) {
      toast.error('Preencha o campo de Cidade!');
      setErrorInputCity(true);
      return;
    }

    if (!data.phone || data.phone.length < 15) {
      toast.error(
        data.phone?.length < 15
          ? 'Telefone Inválido!'
          : 'Preencha o campo de Telefone!'
      );
      setErrorInputPhone(true);
      return;
    }

    if (!data.email) {
      toast.error('Preencha o campo de E-mail!');
      setErrorInputEmail(true);
      return;
    }

    if (!data.distance) {
      toast.error('Informe o campo de Distância!');
      setErrorInputDistance(true);
      return;
    }
    if (!data.shirtSize) {
      toast.error('Informe o tamanho da camisa!');
      setErrorInputShirtSize(true);
      return;
    }

    try {
      await axios.post<{data: {id: string}}>(
        'http://localhost:3333/api/v1/user',
        {
          name: data.name,
          cpf: data.cpf,
          age: data.age,
          city: data.city,
          phone: data.phone,
          email: data.email,
          team: data.team || '',
          distance: data.distance,
          shirtSize: data.shirtSize,
        },
        {headers: {'Content-Type': 'application/json'}}
      );

      toast.success('Usuário criado com sucesso!');

      setValue('name', '');
      setValue('cpf', '');
      setValue('age', '');
      setValue('city', '');
      setValue('phone', '');
      setValue('email', '');
      setValue('team', '');
      setValue('distance', '');
      setValue('shirtSize', '');
    } catch (error: any) {
      if (error.response.data.message === 'CPF already exists') {
        toast.error('CPF ja cadastrado!');
        return;
      }

      toast.error('Erro ao cadastrar o usuário!');
    }
  };

  function handleCorrectCPF(e: ChangeEvent<HTMLInputElement>) {
    setValue('cpf', inputCPFMask(e.target.value));
  }

  function handleAge(e: ChangeEvent<HTMLInputElement>) {
    setValue('age', inputDateMask(e.target.value));
  }

  function handlePhone(e: ChangeEvent<HTMLInputElement>) {
    setValue('phone', inputPhoneMask(e.target.value));
  }

  return (
    <main className="flex  min-h-screen flex-col items-center justify-center p-24 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start gap-4 w-screen md:w-[500px]  p-2"
      >
        <Input
          label="Nome Completo"
          name="name"
          placeholder="Nome completo"
          control={control}
          error={errorInputName}
        />

        <Row>
          <Input
            label="CPF"
            className="w-[48%]"
            name="cpf"
            placeholder="CPF"
            control={control}
            onChange={handleCorrectCPF}
            maxLength={14}
            error={errorInputCPF}
          />

          <Input
            label="Data de Nascimento"
            className="w-[48%]"
            name="age"
            placeholder="Data de nascimento"
            control={control}
            onChange={handleAge}
            maxLength={10}
            error={errorInputAge}
          />
        </Row>

        <Row>
          <Input
            label="Cidade"
            className="w-[48%]"
            name="city"
            placeholder="Cidade"
            control={control}
            error={errorInputCity}
          />
        </Row>

        <Controller
          name="distance"
          control={control}
          render={({field}) => (
            <div className="flex flex-col w-full">
              <label className="text-gray-400">Distância</label>
              <select
                className={`p-2 rounded w-full text-gray-500 ${errorInputDistance ? 'border-red-500 border-2' : 'border-2'}`}
                {...field}
              >
                <option value="">KM</option>
                <option value="8">8KM</option>
                <option value="16">16KM</option>
              </select>
            </div>
          )}
        />

        <Controller
          name="shirtSize"
          control={control}
          render={({field}) => (
            <div className="flex flex-col w-full">
              <label className="text-gray-400">
                Tamanho da camisa
              </label>
              <select
                className={`p-2 rounded w-full text-gray-500 ${errorInputShirtSize ? 'border-red-500 border-2' : 'border-2'}`}
                {...field}
              >
                <option value="">Escolha</option>
                <option value="P">P</option>
                <option value="M">M</option>
                <option value="G">G</option>
                <option value="GG">GG</option>
              </select>
            </div>
          )}
        />

        <Row>
          <Input
            label="E-mail"
            className="w-[48%]"
            name="email"
            placeholder="E-mail"
            type="email"
            control={control}
            error={errorInputEmail}
          />

          <Input
            label="Telefone"
            className="w-[48%]"
            name="phone"
            placeholder="Telefone"
            control={control}
            onChange={handlePhone}
            error={errorInputPhone}
            maxLength={15}
          />
        </Row>

        <Input
          label="Equipe"
          name="team"
          placeholder="Equipe"
          control={control}
        />

        <input
          type="submit"
          className="w-full mt-5 bg-green-500 hover:bg-green-700 transition-all h-11 rounded text-white text-lg cursor-pointer"
          value="Cadastrar"
        />
      </form>
    </main>
  );
}
