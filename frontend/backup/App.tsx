import React, { ReactNode } from 'react';
import './App.css'; 

interface Vehicles {
  category: string,
  price: string,
  stocked: boolean,
  model: string,
}

// interface VehiclesProps {
//   vehicle: Vehicles,
//   key: string
// }

const vehicles: Vehicles[] = [
  {category: "Cars", price: "$40000", stocked: true, model: "Audi"},
  {category: "Cars", price: "$30000", stocked: true, model: "Renault"},
  {category: "Cars", price: "$45000", stocked: false, model: "Mercedes"},
  {category: "Trucks", price: "$120000", stocked: true, model: "DAF"},
  {category: "Trucks", price: "$125000", stocked: false, model: "Iveco"},
  {category: "Trucks", price: "$130000", stocked: true, model: "Volvo"}
];

function App() {
  
  function VehicleCategoryRow ({ category }:{ category: string }) {
    return (
      <tr>
        <th colSpan={2}>
          {category}
        </th>
      </tr>
    );
  }
  
  function VehicletRow ({ vehicle }: {vehicle:Vehicles}) {
       
    return (
      <tr>
        <td>{vehicle.model}</td>
        <td>{vehicle.price}</td>
      </tr>
    );
  }
  
  function VehicleTable({ vehicles }:{vehicles:Vehicles[]}) {
    const rows: ReactNode[] = [];
    let currentCategory: string |null = null;
  
    vehicles.forEach((vehicle:Vehicles) => {
      if (vehicle.category !== currentCategory) {
        rows.push(
          <VehicleCategoryRow
            category={vehicle.category}
            key={vehicle.category} />
        );
      }
      rows.push(
        <VehicletRow
          vehicle={vehicle}
          key={vehicle.model} />
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
  


  function FilterableVehicleTable({ vehicles }:{vehicles:Vehicles[]}) {
    return (
      <div>
        <SearchBar />
        <VehicleTable vehicles = { vehicles } />
      </div>
    );
  }
  

  return (
    <div className="App">
      return <FilterableVehicleTable vehicles = {vehicles} />;
    </div>
  );
}

export default App;
