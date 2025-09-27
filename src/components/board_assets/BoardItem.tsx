import React from "react";
import Image from "next/image";
import { boardAssets } from "./BoardAssets";

type BoardItemProps = {
type: keyof typeof boardAssets;
alt?: string;
onClick?: () => void;
};

export const BoardItem:  React.FC<BoardItemProps> = ({ type, alt, onClick }) => {
  const asset = boardAssets[type];

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={asset.description}
      className="absolute cursor-pointer"
      style={{ top: asset.top, left: asset.left, width: asset.size, height: asset.size }}
      onClick={() => onClick?.()}
      onKeyDown={(e) => {
        if(e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.()
        }
      }}
    >
      <Image
        src={asset.src}
        alt={alt || type}
        fill
        style={{ objectFit: "contain" }}
        className="transition-all duration-300 ease-in-out hover:scale-105"
      />
    </div>
  );
};
