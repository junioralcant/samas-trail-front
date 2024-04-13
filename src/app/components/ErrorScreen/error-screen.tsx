import Link from 'next/link';

export function ErrorScreen() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-white">
        Erro ao realizar sua inscrição :(
      </h1>
      <p className="text-lg text-white">
        Ops, tivemos um erro ao concluir sua inscrição. Entre em
        contato com a nossa equipe.
      </p>

      <Link className="text-white underline" href="/cadastro">
        Realizar outra inscrição
      </Link>
    </div>
  );
}
