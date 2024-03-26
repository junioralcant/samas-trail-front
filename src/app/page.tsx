'use client';

import {Wallet, initMercadoPago} from '@mercadopago/sdk-react';
import {ChangeEvent, useEffect} from 'react';
import {SubmitHandler, useForm, Controller} from 'react-hook-form';
import {Input, Row} from './components';
import {inputCPFMask, inputDateMask} from './utils';

type Inputs = {
  nama: string;
  cpf: string;
  age: string;
  city: string;
  phone: string;
  email: string;
  team: string;
  distance: string;
};

export default function Home() {
  useEffect(() => {
    initMercadoPago('APP_USR-ccfb6947-5609-4f60-bb64-f63d9d9f207b', {
      locale: 'pt-BR',
    });
  }, []);

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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
        />

        <Row>
          <Input
            className="w-[48%]"
            name="cpf"
            placeholder="CPF"
            control={control}
            onChange={handleCorrectCPF}
            maxLength={14}
          />

          <Input
            className="w-[48%]"
            name="age"
            placeholder="Data de nascimento"
            control={control}
            onChange={handleAge}
            maxLength={10}
          />
        </Row>

        <Row>
          <Input
            className="w-[48%]"
            name="city"
            placeholder="Cidade"
            control={control}
          />
        </Row>

        <Controller
          name="distance"
          control={control}
          render={({field}) => (
            <select
              className="p-2 rounded w-24 text-gray-500"
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
          />

          <Input
            className="w-[48%]"
            name="phone"
            placeholder="Telefone"
            control={control}
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
