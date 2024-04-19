'use client';

import axios from 'axios';
import {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import {Input, UserModel} from '../components';
import {useForm} from 'react-hook-form';

type UserDTO = {id: string; paid: boolean} & UserModel;

export default function Users() {
  const {control, handleSubmit, setValue} = useForm<UserModel>();
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [searchCity, setSearchCity] = useState('');

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get<{data: UserDTO[]}>(
          'https://samas-trail-api.onrender.com/api/v1/users',
          {headers: {'Content-Type': 'application/json'}}
        );

        setUsers(response.data.data);
      } catch (error) {
        console.log(error);
        toast.error('Erro em listar os dados dos atletas');
      }
    }

    getUser();
  }, []);

  useEffect(() => {
    const userFiltered = users.filter((user) => {
      return user.city
        .toLowerCase()
        .includes(searchCity.trim().toLowerCase());
    });
    setUsers(userFiltered);
  }, [searchCity]);

  return (
    <div className="flex flex-col items-center justify-center relative overflow-x-auto px-11">
      <h1 className="dark:text-white font-bold text-3xl my-7">
        Listagem de atletas
      </h1>

      <Input
        control={control}
        name="search-city"
        label="Buscar por Cidade"
        placeholder="Pesquisar por Cidade"
        className="w-56 mb-3"
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
      />

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nome
            </th>
            <th scope="col" className="px-6 py-3">
              CPF
            </th>
            <th scope="col" className="px-6 py-3">
              Sexo
            </th>
            <th scope="col" className="px-6 py-3">
              E-mail
            </th>
            <th scope="col" className="px-6 py-3">
              Camisa
            </th>
            <th scope="col" className="px-6 py-3">
              Telefone
            </th>
            <th scope="col" className="px-6 py-3">
              Distância
            </th>
            <th scope="col" className="px-6 py-3">
              Cidade
            </th>
            <th scope="col" className="px-6 py-3">
              Pago
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {user.name}
              </th>
              <td className="px-6 py-4">{user.cpf}</td>
              <td className="px-6 py-4">{user.sex}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.shirtSize}</td>
              <td className="px-6 py-4">{user.phone}</td>
              <td className="px-6 py-4">{user.distance}</td>
              <td className="px-6 py-4">{user.city}</td>
              <td className="px-6 py-4">
                {user.paid ? 'Sim' : 'Não'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
