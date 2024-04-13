import Link from 'next/link';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import {PREFIX_LOCAL_STORAGE} from '@/app/page';

type Props = {
  preferenceId: string | null;
};
export function SuccessScreen({preferenceId}: Props) {
  useEffect(() => {
    async function updateUserPayment() {
      try {
        const id = localStorage.getItem(
          PREFIX_LOCAL_STORAGE + 'userId'
        );

        await axios.put(
          `http://localhost:3333/api/v1/user?id=${id}`,
          {
            paid: true,
            idPreferences: preferenceId || '',
          },
          {headers: {'Content-Type': 'application/json'}}
        );

        localStorage.removeItem(PREFIX_LOCAL_STORAGE + 'userId');
      } catch (error) {
        toast.error('Erro ao finalizar pagamento');
        console.log(error);
      }
    }

    updateUserPayment();
  }, []);

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-white">Parabéns! 😄</h1>
      <p className="text-lg text-white mb-6">
        O pagamento de sua inscrição concluída com sucesso! ✅
      </p>

      <Link className="text-white underline" href="/cadastro">
        Realizar outra inscrição
      </Link>
    </div>
  );
}
