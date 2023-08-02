import ProdListItem from "./ProdListItem";

function ProdList() {
  return (
    <>
      <ul>
        <li>
          <ProdListItem
            imgNo={201}
            name="PRODUCT 1"
            productPriceFormatted="140,000"
          />
        </li>
        <li>
          <ProdListItem
            imgNo={1}
            name="PRODUCT 2"
            productPriceFormatted="320,000"
          />
        </li>
        <li>
          <ProdListItem
            imgNo={2}
            name="PRODUCT 3"
            productPriceFormatted="340,000"
          />
        </li>
      </ul>
    </>
  );
}

export default ProdList;
