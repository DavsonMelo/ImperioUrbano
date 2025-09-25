export default function Nav() {
  return (
    <nav>
      <ul className="flex text-lg sm:text-xl bebas gap-6">
        <li><a href="/instructions" className="hover:text-blue-600">Instruções</a></li>
        <li><a href="/login" className="hover:text-blue-600">Entrar</a></li>
        <li><a href="/register" className="hover:text-blue-600">Registrar</a></li>
      </ul>
    </nav>
  );
}
