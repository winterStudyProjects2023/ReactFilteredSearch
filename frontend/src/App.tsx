import React, { ChangeEvent, useState, ReactNode } from 'react';
import './App.css';

interface IVehicleProps {
  category: string;
  price: string;
  stocked: boolean;
  model: string;
}

interface IVehicleCategoryRowProps {
  category: string;
}

interface IVehicleRowProps {
  vehicle: IVehicleProps;
}

interface IVehicleTableProps {
  vehicles: IVehicleProps[];
  filterText?: string;
  inStockOnly?: boolean;
}

interface ISearchBarProps {
  filterText: string;
  inStockOnly: boolean;
  onFilterTextChange: (filterText: string) => void;
  onInStockOnlyChange: (inStockOnly: boolean) => void;
}

interface IFilterableVehicleTableProps {
  vehicles: IVehicleProps[];
}

const vehicles: IVehicleProps[] = [
  { category: "Cars", price: "$40000", stocked: true, model: "Audi" },
  { category: "Cars", price: "$30000", stocked: true, model: "Renault" },
  { category: "Cars", price: "$45000", stocked: false, model: "Mercedes" },
  { category: "Trucks", price: "$120000", stocked: true, model: "DAF" },
  { category: "Trucks", price: "$125000", stocked: false, model: "Iveco" },
  { category: "Trucks", price: "$130000", stocked: true, model: "Volvo" }
];

function App() {


  function VehicleCategoryRow({ category }: IVehicleCategoryRowProps) {
    return (
      <tr>
        <th colSpan={2}>
          {category}
        </th>
      </tr>
    );
  }

  function VehicleRow({ vehicle }: IVehicleRowProps) {


    const name = vehicle.stocked?
    vehicle.model
    :<span style={{ color: 'red' }}>{vehicle.model}</span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{vehicle.price}</td>
      </tr>
    );
  }

  function VehicleTable({ vehicles, filterText, inStockOnly }: IVehicleTableProps) {
    const rows: ReactNode[] = [];
    let currentCategory: string | null = null;

    vehicles.forEach((vehicle) => {
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
        <VehicleRow
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

  function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }: ISearchBarProps) {
    return (
      <form>
        <input type="text"
          value={filterText}
          placeholder="Search..."
          onChange={(e: ChangeEvent<HTMLInputElement>) => onFilterTextChange(e.target.value)} />
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

  function FilterableVehicleTable({ vehicles }: IFilterableVehicleTableProps) {
    const [filterText, setFilterText] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);

    const handleFilterTextChange = (filterText: string) => {
      setFilterText(filterText);
    }

    const handleInStockOnlyChange = (inStockOnly: boolean) => {
      setInStockOnly(inStockOnly);
    }

    return (
      <div>
        <SearchBar
          filterText={filterText}
          inStockOnly={inStockOnly}
          onFilterTextChange={handleFilterTextChange}
          onInStockOnlyChange={handleInStockOnlyChange}
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
      <FilterableVehicleTable vehicles={vehicles} />;
    </div>
  );
}

export default App;
