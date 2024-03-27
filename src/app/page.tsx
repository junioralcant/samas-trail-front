'use client';

import {Wallet, initMercadoPago} from '@mercadopago/sdk-react';
import {ChangeEvent, useEffect, useRef, useState} from 'react';
import {SubmitHandler, useForm, Controller} from 'react-hook-form';
import {Input, Row} from './components';
import {inputCPFMask, inputDateMask} from './utils';
import {toast} from 'react-toastify';

type Inputs = {
  name: string;
  cpf: string;
  age: string;
  city: string;
  phone: string;
  email: string;
  team: string;
  distance: string;
};

export default function Home() {
  const [errorInputName, setErrorInputName] = useState(false);
  const [errorInputCPF, setErrorInputCPF] = useState(false);
  const [errorInputAge, setErrorInputAge] = useState(false);
  const [errorInputCity, setErrorInputCity] = useState(false);
  const [errorInputPhone, setErrorInputPhone] = useState(false);
  const [errorInputEmail, setErrorInputEmail] = useState(false);
  const [errorInputTeam, setErrorInputTeam] = useState(false);
  const [errorInputDistance, setErrorInputDistance] = useState(false);

  useEffect(() => {
    initMercadoPago('APP_USR-ccfb6947-5609-4f60-bb64-f63d9d9f207b', {
      locale: 'pt-BR',
    });
  }, []);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors},
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
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
    }

    if (!data.cpf) {
      toast.error('Preencha o campo de CPF!', {theme: 'dark'});
      setErrorInputCPF(true);
    }

    if (!data.age) {
      toast.error('Preencha o campo de Data de Nascimento!', {
        theme: 'dark',
      });
      setErrorInputAge(true);
    }

    if (!data.city) {
      toast.error('Preencha o campo de Cidade!', {theme: 'dark'});
      setErrorInputCity(true);
    }

    if (!data.phone) {
      toast.error('Preencha o campo de Telefone!', {theme: 'dark'});
      setErrorInputPhone(true);
    }

    if (!data.email) {
      toast.error('Preencha o campo de E-mail!', {theme: 'dark'});
      setErrorInputEmail(true);
    }

    if (!data.distance) {
      toast.error('Informe o campo de Distância!', {theme: 'dark'});
      setErrorInputDistance(true);
    }
  };

  function handleCorrectCPF(e: ChangeEvent<HTMLInputElement>) {
    setValue('cpf', inputCPFMask(e.target.value));
  }

  function handleAge(e: ChangeEvent<HTMLInputElement>) {
    setValue('age', inputDateMask(e.target.value));
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start gap-4 w-screen md:w-[500px]  p-2"
      >
        <Input
          name="name"
          placeholder="Nome completo"
          control={control}
          error={errorInputName}
        />

        <Row>
          <Input
            className="w-[48%]"
            name="cpf"
            placeholder="CPF"
            control={control}
            onChange={handleCorrectCPF}
            maxLength={14}
            error={errorInputCPF}
          />

          <Input
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
            <select
              className={`p-2 rounded w-24 text-gray-500 ${errorInputDistance ? 'border-red-500 border-2' : 'border-2'}`}
              {...field}
            >
              <option value="">KM</option>
              <option value="8">8KM</option>
              <option value="16">16KM</option>
            </select>
          )}
        />

        <Row>
          <Input
            className="w-[48%]"
            name="email"
            placeholder="E-mail"
            type="email"
            control={control}
            error={errorInputEmail}
          />

          <Input
            className="w-[48%]"
            name="phone"
            placeholder="Telefone"
            control={control}
            error={errorInputPhone}
          />
        </Row>

        <Input name="team" placeholder="Equipe" control={control} />

        <input
          type="submit"
          className="bg-green-500 hover:bg-green-700 transition-all w-40 h-10 rounded text-white text-lg cursor-pointer"
          value="Cadastrar"
        />
      </form>
      <div>
        {/* <Wallet
          initialization={{
            preferenceId:
              '186097166-4e8ff5a3-300c-4d16-ba9a-ee70c14f0903',
          }}
        /> */}
      </div>
    </main>
  );
}
