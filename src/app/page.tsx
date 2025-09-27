'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BoardItem } from '@/components/board_assets/BoardItem';
import { boardAssets } from '@/components/board_assets/BoardAssets';
import Image from 'next/image';

export default function Home() {
  const [selectedCard, setSelectedCard] = useState<
    null | keyof typeof boardAssets
  >(null);
  const [progress, setProgress] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  const duration = 7000; // 15 segundos

  const handleSelectCard = (type: keyof typeof boardAssets) => {
    setSelectedCard(type);
    setProgress(0);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);

    timeoutRef.current = window.setTimeout(() => {
      setSelectedCard(null);
      setProgress(0);
      timeoutRef.current = null;
      if (intervalRef.current) clearInterval(intervalRef.current);
    }, duration);

    const start = Date.now();
    intervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / duration) * 100, 100));
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="flex justify-center items-center pt-28 px-5">
      <div className="relative inline-block">
        {/* Tabuleiro */}
        <img
          src="/board_home_icons/base.svg"
          alt="Tabuleiro de Monopoly"
          className="block w-full max-w-[800px] h-auto"
        />

        {/* Itens do tabuleiro */}
        <BoardItem
          type="park"
          alt="Parque"
          onClick={() => handleSelectCard('park')}
        />
        <BoardItem
          type="jail"
          alt="Prisão"
          onClick={() => handleSelectCard('jail')}
        />

        {/* Banner/Carta no centro */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] max-w-[80%] bg-white/95 backdrop-blur-sm shadow-lg rounded-xl overflow-hidden">
          <AnimatePresence mode="wait">
            {selectedCard ? (
              <motion.div
                key="card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="p-4 flex flex-col items-center"
              >
                <Image
                  src={`/board_home_icons/${selectedCard}.jpg`}
                  alt={`Carta ${selectedCard}`}
                  width={300}
                  height={300}
                  className="max-w-[220px] h-auto mb-2 object-contain rounded-2xl"
                />
                <p className="text-sm text-center text-black">
                  {boardAssets[selectedCard].description}
                </p>
                {/* Barra de progresso */}
                <div className="w-full h-2 bg-gray-200 rounded-full mt-3 overflow-hidden">
                  <div
                    className="h-2 bg-blue-500 transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="banner"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="p-4 flex flex-col items-center"
              >
                <Image
                  src="/board_home_icons/banner.svg"
                  alt="Banner Monopoly"
                  width={200}
                  height={200}
                  className="w-full h-auto mb-2"
                />
                <h2 className="text-lg font-bold text-black">Monopoly Versão 0.0.1</h2>
                <p className="text-sm text-black">
                  Bem-vindo! Clique nos itens para descobrir suas cartas.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
