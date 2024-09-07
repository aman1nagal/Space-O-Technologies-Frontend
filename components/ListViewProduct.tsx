import React from "react";

const ListViewProduct = () => {
  return (
    <div>
      {/* <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Available</th>
              <th>Price (₹)</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <Product
                key={item.id}
                id={item.id}
                name={(item.name.length>0 ? item.name : '-')}
                availableCount={item.availableCount}
                price={item.price}
                quantity={quantities[item.id]}
                onQuantityChange={handleQuantityChange}
              />
            ))}
          </tbody>
        </table> */}
    </div>
  );
};

export default ListViewProduct;
