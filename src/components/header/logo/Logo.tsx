// components/Logo.tsx
import Image from "next/image";

export default function Logo() {
  return(
    <div className="orbitron"> {/* Agora a classe .bebas vai funcionar */}
      <div className="flex items-center gap-4">
        <Image
          src="/img_header/dados.png"
          alt="Logo Império Urbano"
          width={50}
          height={50}
        />
        <h1 className="text-3xl">Império Urbano</h1>

      </div>
    </div>
  )
}