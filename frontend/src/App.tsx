import React, { ReactComponentElement } from 'react';
import './App.css'; 

type Vehicles= {
  category: string,
  price: string,
  stocked: boolean,
  model: string,
}

const vehicles: Vehicles[] = [
  {category: "Cars", price: "$40000", stocked: true, model: "Audi"},
  {category: "Cars", price: "$30000", stocked: true, model: "Renault"},
  {category: "Cars", price: "$45000", stocked: false, model: "Mercedes"},
  {category: "Trucks", price: "$120000", stocked: true, model: "DAF"},
  {category: "Trucks", price: "$125000", stocked: false, model: "Iveco"},
  {category: "Trucks", price: "$130000", stocked: true, model: "Volvo"}
];

function App() {
  function VehicleCategoryRow({ category }:string) {
    return (
      <tr>
        <th colSpan={2}>
          {category}
        </th>
      </tr>
    );
  }
  
  function VehicletRow({ vehicles }:Vehicles[]) {
       
  
    return (
      <tr>
        <td>{vehicles.model}</td>
        <td>{vehicles.price}</td>
      </tr>
    );
  }
  
  function VehicleTable({ vehicles }:Vehicles[]) {
    const rows: React.FC[] | string = [];
    let currentCategory: string |null = null;
  
    vehicles.forEach((vehicle) => {
      if (vehicle.category !== currentCategory) {
        rows.push(
          <VehicleCategoryRow
            category={vehicle.category}
            key={vehicle.category} />
        );
      }
      rows.push(
        <VehicleRow
          vehicle={vehicle}
          key={vehicle.name} />
      );
      currentCategory = vehicle.category;
    });
  
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
  
  function SearchBar() {
    return (
      <form>
        <input type="text" placeholder="Search..." />
        <label>
          <input type="checkbox" />
          {' '}
          Only show products in stock
        </label>
      </form>
    );
  }
  
  function FilterableProductTable({ products }) {
    return (
      <div>
        <SearchBar />
        <ProductTable products={products} />
      </div>
    );
  }
  
  const PRODUCTS = [
    {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
    {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
    {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
    {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
    {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
    {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
  ];
  
  return (
    <div className="App">
      return <FilterableProductTable products={PRODUCTS} />;
    </div>
  );
}

export default App;
