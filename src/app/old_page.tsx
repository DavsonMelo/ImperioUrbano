'use client';
import { useEffect, useRef } from 'react';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Configuração completa do tabuleiro
  const boardConfig = {
    corners: {
      start: { row: 7, col: 0, color: '#00FF00', name: 'Início' },
      jail: { row: 0, col: 9, color: '#FF0000', name: 'Cadeia' },
      free: { row: 0, col: 0, color: '#00FFFF', name: 'Feriado' },
      gotoJail: { row: 7, col: 9, color: '#FFA500', name: 'Va para Cadeia' }
    },
    
    chance: [
      { row: 6, col: 0, color: '#FFD700', name: 'Sorte/Revés' },
      { row: 0, col: 3, color: '#FFD700', name: 'Sorte/Revés' },
      { row: 1, col: 9, color: '#FFD700', name: 'Sorte/Revés' },
      { row: 7, col: 6, color: '#FFD700', name: 'Sorte/Revés' }
    ],
    
    special: [
      { row: 3, col: 0, color: '#8B4513', name: 'Jogo da Oncinha - Receba 300' },
      { row: 0, col: 6, color: '#2F4F4F', name: 'IPTU - Pague 200' },
      { row: 7, col: 3, color: '#32CD32', name: 'Recebeu Herança - Recebe 200' }
    ],
    
    companies: [
      { row: 5, col: 0, color: '#FF69B4', name: 'Empresa 1' },
      { row: 0, col: 2, color: '#FF69B4', name: 'Empresa 2' },
      { row: 2, col: 9, color: '#FF69B4', name: 'Empresa 3' },
      { row: 7, col: 7, color: '#FF69B4', name: 'Empresa 4' }
    ],
    
    // Grupos de propriedades
    propertyGroups: {
      // 3 grupos de 3 propriedades
      group1: [
        { row: 7, col: 1, color: '#5D8AA8', name: 'Propriedade 1-1' },
        { row: 7, col: 2, color: '#5D8AA8', name: 'Propriedade 1-2' },
        { row: 7, col: 4, color: '#5D8AA8', name: 'Propriedade 1-3' }
      ],
      group2: [
        { row: 7, col: 5, color: '#87CEEB', name: 'Propriedade 2-1' },
        { row: 7, col: 8, color: '#87CEEB', name: 'Propriedade 2-2' },
        { row: 6, col: 9, color: '#87CEEB', name: 'Propriedade 2-3' }
      ],
      group3: [
        { row: 5, col: 9, color: '#8A2BE2', name: 'Propriedade 3-1' },
        { row: 4, col: 9, color: '#8A2BE2', name: 'Propriedade 3-2' },
        { row: 3, col: 9, color: '#8A2BE2', name: 'Propriedade 3-3' }
      ],
      
      // 2 grupos de 4 propriedades
      group4: [
        { row: 1, col: 0, color: '#FFA500', name: 'Propriedade 4-1' },
        { row: 2, col: 0, color: '#FFA500', name: 'Propriedade 4-2' },
        { row: 4, col: 0, color: '#FFA500', name: 'Propriedade 4-3' },
        { row: 6, col: 0, color: '#FFA500', name: 'Propriedade 4-4' }
      ],
      group5: [
        { row: 0, col: 1, color: '#FF0000', name: 'Propriedade 5-1' },
        { row: 0, col: 4, color: '#FF0000', name: 'Propriedade 5-2' },
        { row: 0, col: 5, color: '#FF0000', name: 'Propriedade 5-3' },
        { row: 0, col: 7, color: '#FF0000', name: 'Propriedade 5-4' },
        { row: 0, col: 8, color: '#FF0000', name: 'Propriedade 5-5' }
      ]
    }
  };

  // Função para verificar se uma célula é especial
  function getCellType(row: number, col: number): { color: string; name: string } | null {
    const { corners, chance, special, companies, propertyGroups } = boardConfig;

    // Verificar cantos
    if (row === corners.start.row && col === corners.start.col) 
      return { color: corners.start.color, name: corners.start.name };
    if (row === corners.jail.row && col === corners.jail.col) 
      return { color: corners.jail.color, name: corners.jail.name };
    if (row === corners.free.row && col === corners.free.col) 
      return { color: corners.free.color, name: corners.free.name };
    if (row === corners.gotoJail.row && col === corners.gotoJail.col) 
      return { color: corners.gotoJail.color, name: corners.gotoJail.name };

    // Verificar sorte/revés
    const chanceCell = chance.find(c => c.row === row && c.col === col);
    if (chanceCell) return { color: chanceCell.color, name: chanceCell.name };

    // Verificar especiais
    const specialCell = special.find(c => c.row === row && c.col === col);
    if (specialCell) return { color: specialCell.color, name: specialCell.name };

    // Verificar empresas
    const companyCell = companies.find(c => c.row === row && c.col === col);
    if (companyCell) return { color: companyCell.color, name: companyCell.name };

    // Verificar propriedades em grupos
    for (const group of Object.values(propertyGroups)) {
      const propertyCell = group.find(c => c.row === row && c.col === col);
      if (propertyCell) return { color: propertyCell.color, name: propertyCell.name };
    }

    return null;
  }

  // Função para pré-carregar imagens - apenas as que existem
  async function preloadImages(): Promise<Record<string, HTMLImageElement | null>> {
    const sources = {
      start: "/board_home_icons/start.png",
      jail: "/board_home_icons/jail.png",
      free: "/board_home_icons/free.png",
      goto: "/board_home_icons/gotojail.png",
    };

    const entries = await Promise.all(
      Object.entries(sources).map(([key, src]) =>
        new Promise<[string, HTMLImageElement | null]>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve([key, img]);
          img.onerror = () => {
            console.warn(`Imagem não encontrada: ${src}`);
            resolve([key, null]);
          };
        })
      )
    );

    return Object.fromEntries(entries);
  }

  useEffect(() => {
    const drawBoard = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

       // Calcular altura considerando o header (80px)
      const headerHeight = 80;
      const availableHeight = window.innerHeight - headerHeight;

      // tamanho do canvas
      canvas.width = window.innerWidth;
      canvas.height = availableHeight;

      // Limpar canvas com transparência
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // carregar imagens
      const images = await preloadImages();

      // configurações do grid
      const rows = 8;
      const cols = 10;
      const cellSize = Math.min(canvas.width / cols, canvas.height / rows) * 0.8;

      const offsetX = (canvas.width - cols * cellSize) / 2;
      const offsetY = (availableHeight - rows * cellSize) / 2;

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const x = offsetX + j * cellSize;
          const y = offsetY + i * cellSize;
          const isBorder = i === 0 || j === 0 || i === rows - 1 || j === cols - 1;

          if (isBorder) {
            const cellType = getCellType(i, j);
            
            if (cellType) {
              ctx.fillStyle = cellType.color;
            } else {
              // Célula de borda sem tipo específico - transparente
              ctx.fillStyle = 'transparent';
            }
            
            ctx.fillRect(x, y, cellSize, cellSize);

            // Desenhar borda
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, cellSize, cellSize);

            // Configurar texto
            ctx.fillStyle = 'black';
            ctx.font = '8px Arial';
            ctx.textAlign = 'center';
            
            const { corners, chance, special, companies } = boardConfig;
            
            // Desenhar imagens apenas para os cantos
            if (i === corners.start.row && j === corners.start.col && images.start) 
              ctx.drawImage(images.start, x + 0, y + 0, cellSize, cellSize);
            else if (i === corners.jail.row && j === corners.jail.col && images.jail) 
              ctx.drawImage(images.jail, x - 10, y - 30, cellSize + 10, cellSize + 10);
            else if (i === corners.free.row && j === corners.free.col && images.free) {
              ctx.save();

              ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
              ctx.shadowBlur = 8;
              ctx.shadowOffsetX = 3;
              ctx.shadowOffsetY = 3;

              const imgX = x - 20;
              const imgY = y - 30;
              const imgW = cellSize + 15;
              const imgH = cellSize + 15;
              
              ctx.translate(imgX + imgW / 2, imgY + imgH / 2);
              ctx.rotate(Math.PI / 12);

              ctx.drawImage(images.free, -imgW / 2, -imgH / 2, imgW, imgH);
              ctx.restore();
            }
            else if (i === corners.gotoJail.row && j === corners.gotoJail.col && images.goto) {
              ctx.save();

              ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
              ctx.shadowBlur = 8;
              ctx.shadowOffsetX = 3;
              ctx.shadowOffsetY = 3;

              const imgX = x - 20;
              const imgY = y - 30;
              const imgW = cellSize + 35;
              const imgH = cellSize + 35;
              
              ctx.translate(imgX + imgW / 2, imgY + imgH / 2);
              ctx.rotate(Math.PI / 3.5);

              ctx.drawImage(images.goto, -imgW / 10, -imgH / 1.2, imgW, imgH);
              ctx.restore();
            } 
            
            // Para outros tipos, desenhar texto
            else if (chance.some(c => c.row === i && c.col === j)) {
              ctx.fillText('Sorte/', x + cellSize/2, y + cellSize/2 - 5);
              ctx.fillText('Revés', x + cellSize/2, y + cellSize/2 + 5);
            }
            else if (companies.some(c => c.row === i && c.col === j)) {
              ctx.fillText('Empresa', x + cellSize/2, y + cellSize/2);
            }
            else if (special.some(c => c.row === i && c.col === j)) {
              const specialCell = special.find(c => c.row === i && c.col === j);
              if (specialCell) {
                ctx.font = '6px Arial';
                if (specialCell.name.includes('Oncinha')) {
                  ctx.fillText('Jogo', x + cellSize/2, y + cellSize/2 - 8);
                  ctx.fillText('Oncinha', x + cellSize/2, y + cellSize/2 - 2);
                  ctx.fillText('+300', x + cellSize/2, y + cellSize/2 + 6);
                } else if (specialCell.name.includes('IPTU')) {
                  ctx.fillText('IPTU', x + cellSize/2, y + cellSize/2 - 5);
                  ctx.fillText('-200', x + cellSize/2, y + cellSize/2 + 5);
                } else if (specialCell.name.includes('Herança')) {
                  ctx.fillText('Herança', x + cellSize/2, y + cellSize/2 - 5);
                  ctx.fillText('+200', x + cellSize/2, y + cellSize/2 + 5);
                }
              }
            }
            else if (cellType && cellType.name.startsWith('Propriedade')) {
              ctx.font = '7px Arial';
              ctx.fillText('Prop', x + cellSize/2, y + cellSize/2 - 5);
              ctx.fillText(cellType.name.split(' ')[1], x + cellSize/2, y + cellSize/2 + 5);
            }
          } else {
            // Células internas - completamente transparentes
            ctx.clearRect(x, y, cellSize, cellSize);
          }
        }
      }
    };

    drawBoard();

    // Adicionar redimensionamento da janela
    const handleResize = () => {
      drawBoard();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="pt-20"> {/* Margem superior igual à altura do header */}
      <canvas 
        ref={canvasRef} 
        className="block w-full" 
        style={{ 
          height: 'calc(100vh - 80px)', // Altura total menos o header
          backgroundColor: 'transparent' 
        }} 
      />
    </div>
  ); 
  
}