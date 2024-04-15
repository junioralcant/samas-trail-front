'use client';

export default function Users() {
  return (
    <div className="flex flex-col items-center justify-center relative overflow-x-auto">
      <h1 className="dark:text-white font-bold text-3xl my-7">
        Listagem de atletas
      </h1>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 max-w-screen-xl">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nome
            </th>
            <th scope="col" className="px-6 py-3">
              CPF
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
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Apple MacBook Pro
            </th>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4">$2999</td>
            <td className="px-6 py-4">$2999</td>
            <td className="px-6 py-4">$2999</td>
            <td className="px-6 py-4">$2999</td>
            <td className="px-6 py-4">$2999</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
