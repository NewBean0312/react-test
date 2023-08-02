import React, { useState } from "react";

function ProdListItem({ imgNo, name, productPriceFormatted }) {
  return (
    <>
      <div>
        <img src={`https://picsum.photos/id/${imgNo}/400/400`} />
        <div>{name}</div>
        <div>{productPriceFormatted}</div>
      </div>
    </>
  );
}

export default ProdListItem;
