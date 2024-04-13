import Link from 'next/link';

export function PendingScreen() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-white">
        Pagamento pendente
      </h1>
      <p className="text-lg text-white">
        Sua inscrição esta pendente. Se sua inscrição foi feita
        através do pix, envie o comprovante para nossa equipe no link
        abaixo ou sua inscrição não sera confirmada.
      </p>

      <Link
        className="text-white underline"
        href="https://wa.me/99991134098"
      >
        Enviar comprovante
      </Link>
    </div>
  );
}
