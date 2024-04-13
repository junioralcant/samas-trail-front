import {PREFIX_LOCAL_STORAGE} from '@/app/page';
import {Wallet} from '@mercadopago/sdk-react';
import axios from 'axios';
import {toast} from 'react-toastify';

export function WalletScreen() {
  return (
    <div>
      <h1 className="text-white">
        Realize seu pagamento no botão abaixo
      </h1>
      <Wallet
        onSubmit={async () => {
          try {
            const response = await axios.post<{
              data: {id: string};
            }>(
              'http://localhost:3333/api/v1/preference',
              {
                title: 'Samas Trail',
                description: 'Inscrição Samas Trail',
                category: 'Samas Trail',
                currency: 'BRL',
                price: 1.1,
              },
              {headers: {'Content-Type': 'application/json'}}
            );

            localStorage.setItem(
              PREFIX_LOCAL_STORAGE + 'preferenceId',
              response.data.data.id
            );

            return response.data.data.id;
          } catch (error) {
            toast.error('Erro ao cadastrar o usuário!');
            console.log(error);
            return;
          }
        }}
      />
    </div>
  );
}
