'use client';

import {ChangeEvent, useState} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import {
  inputCPFMask,
  inputDateMask,
  inputPhoneMask,
} from '@/app/utils';
import axios from 'axios';
import {Input} from '../Input/input';
import {Row} from '../Row/row';

export type UserModel = {
  name: string;
  cpf: string;
  age: string;
  city: string;
  phone: string;
  email: string;
  team: string;
  distance: string;
  shirtSize: string;
  sex: string;
};

type FormAddUserProps = {
  isShowCityField?: boolean;
};

export function FormAddUser({isShowCityField}: FormAddUserProps) {
  const [errorInputName, setErrorInputName] = useState(false);
  const [errorInputCPF, setErrorInputCPF] = useState(false);
  const [errorInputAge, setErrorInputAge] = useState(false);
  const [errorInputCity, setErrorInputCity] = useState(false);
  const [errorInputPhone, setErrorInputPhone] = useState(false);
  const [errorInputEmail, setErrorInputEmail] = useState(false);
  const [errorInputDistance, setErrorInputDistance] = useState(false);
  const [errorInputShirtSize, setErrorInputShirtSize] =
    useState(false);
  const [errorInputSex, setErrorInputSex] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {control, handleSubmit, setValue} = useForm<UserModel>();
  const onSubmit: SubmitHandler<UserModel> = async (data) => {
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

    if (isShowCityField) {
      if (!data.city) {
        toast.error('Preencha o campo de Cidade!');
        setErrorInputCity(true);
        return;
      }
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
    } else {
      setErrorInputDistance(false);
    }

    if (!data.shirtSize) {
      toast.error('Informe o tamanho da camisa!');
      setErrorInputShirtSize(true);
      return;
    } else {
      setErrorInputShirtSize(false);
    }

    if (!data.sex) {
      toast.error('Informe o sexo do atleta!');
      setErrorInputSex(true);
      return;
    } else {
      setErrorInputSex(false);
    }

    try {
      setIsLoading(true);
      await axios.post<{data: {id: string}}>(
        'https://samas-trail-api.onrender.com/api/v1/user',
        {
          name: data.name,
          cpf: data.cpf,
          age: data.age,
          city: isShowCityField ? data.city : 'Prefeitura',
          phone: data.phone,
          email: data.email,
          team: data.team || '',
          distance: data.distance,
          shirtSize: data.shirtSize,
          sex: data.sex,
        },
        {headers: {'Content-Type': 'application/json'}}
      );

      toast.success('Atleta cadastrado com sucesso!');

      setValue('name', '');
      setValue('city', '');
      setValue('cpf', '');
      setValue('age', '');
      setValue('phone', '');
      setValue('email', '');
      setValue('team', '');
      setValue('distance', '');
      setValue('shirtSize', '');
      setValue('sex', '');
    } catch (error: any) {
      if (error.response.data.message === 'CPF already exists') {
        toast.error('CPF ja cadastrado!');
        return;
      }

      toast.error('Erro ao cadastrar o usuário!');
    } finally {
      setIsLoading(false);
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

        {isShowCityField && (
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
        )}

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
                <option value="4KM">4KM</option>
                <option value="8KM">8KM</option>
                <option value="16KM">18KM</option>
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

        <Controller
          name="sex"
          control={control}
          render={({field}) => (
            <div className="flex flex-col w-full">
              <label className="text-gray-400">Sexo do atleta</label>
              <select
                className={`p-2 rounded w-full text-gray-500 ${errorInputSex ? 'border-red-500 border-2' : 'border-2'}`}
                {...field}
              >
                <option value="">Escolha</option>
                <option value="M">M</option>
                <option value="F">F</option>
              </select>
            </div>
          )}
        />

        <Input
          label="Equipe"
          name="team"
          placeholder="Equipe"
          control={control}
        />

        {isLoading ? (
          <div
            role="status"
            className="w-full mt-5 flex justify-center items-center"
          >
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <input
            type="submit"
            className="w-full mt-5 bg-green-500 hover:bg-green-700 transition-all h-11 rounded text-white text-lg cursor-pointer"
            value="Cadastrar"
          />
        )}
      </form>
    </main>
  );
}
