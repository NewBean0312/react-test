import React, { useState } from "react";

function ProdListItem({ imgNo, name, productPriceFormatted }) {
  return (
    <>
      <div className="flex flex-col gap-[10px]">
        <img src={`https://picsum.photos/id/${imgNo}/400/400`} />
        <div className="text-center font-bold">{name}</div>
        <div className="text-center after:content-['원'] ">
          {productPriceFormatted}
        </div>
      </div>
    </>
  );
}

export default ProdListItem;
