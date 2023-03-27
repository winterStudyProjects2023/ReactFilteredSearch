import React, { useState, ReactNode } from 'react';
import './App.css'; 

interface Vehicles {
  category: string,
  price: string,
  stocked: boolean,
  model: string,
}

interface StateProps {
  filterText: string,
  isInStock: boolean
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
  
  function VehicleTable({ vehicles,
     filterText,
     inStockOnly
    }) {
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
      if (inStockOnly && !vehicle.stocked) {
        return;
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
            <th>Vehicle</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
  
  function SearchBar({
    filterText,
    inStockOnly,
    onFilterTextChange,
    onInStockOnlyChange
  }) {
    return (
      <form>
        <input type="text"
         value={filterText} 
         placeholder="Search..."
         onChange={(e) => onFilterTextChange(e.target.value)} />
        <label>
          <input type="checkbox"
           checked={inStockOnly} 
           onChange={(e) => onInStockOnlyChange(e.target.checked)} />
          {' '}
          Show only vehicles in stock
        </label>
      </form>
    );
  }
  
  function FilterableVehicleTable({ vehicles }:{vehicles:Vehicles[]}) {
    const [filterText, setFilterText] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);



    return (
      <div>
        <SearchBar
         filterText={filterText} 
         inStockOnly={inStockOnly} 
         onFilterTextChange={setFilterText} 
         onInStockOnlyChange={setInStockOnly}
         />
        <VehicleTable 
          vehicles={vehicles} 
          filterText={filterText}
          inStockOnly={inStockOnly} />
      </div>
    );
  }
  
  return (
    <div className="App">
       <FilterableVehicleTable vehicles = {vehicles} />;
    </div>
  );
}

export default App;
