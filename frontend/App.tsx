// @flow 
import * as React from 'react';
type Props = {

};

type TableRows = {
    category: string,
    price: string;
    stocked: boolean,
    name: string,
}

type DataArray = TableRows[];

const vehiclesData: DataArray = [
    { category: "Cars", price: "$20000", stocked: true, name: "Renault" },
    { category: "Cars", price: "$25000", stocked: true, name: "VW" },
    { category: "Cars", price: "$50000", stocked: false, name: "Mercedes" },
    { category: "Trucks", price: "$150000", stocked: true, name: "Iveco" },
    { category: "Trucks", price: "$150000", stocked: false, name: "DAF" },
    { category: "Trucks", price: "$160000", stocked: true, name: "Mercedes" }
];





function VehicleCategoryRow({ category }) {
    return (
        <tr>
            <th colSpan={2} >
                {category}
            </th>
        </tr>
    )
}

function VehicleRow({ vehiclesData }) {

    const name = vehiclesData.stocked ?
        vehiclesData.name
        : <span style={{ color: 'red' }}>
            {vehiclesData.name}
        </span>;

    return (
        <tr>
            <td>{name}</td>
            <td>{vehiclesData.price}</td>
        </tr>
    )
}

function VehicleContainer({vehiclesData}) {
    const rows: string[] = [];
    let vehicleCategory: null | string = null;
    vehiclesData.forEach(tableRow => {

        if (tableRow.category !== vehicleCategory) {
            rows.push(`<VehicleCategoryRow
            category = {tableRow.category}
            key= {tableRow.category} />`
            );
        }
        rows.push(`<VehicleRow
            vechicle = {vechicle}
            key= {vehicle.name} />`);
        vehicleCategory = tableRow.category;
    })
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
    )
}
function SearchBar() {
    return (
        <form action="">
            <input type="text" placeholder='Search ...' />
            <label>
                <input type="checkbox" />
                {' '}
                Only show products in stock
            </label>
        </form>
    )
}

function FilterVehiclesTable({vehiclesData}) {
    return (
        <div>
<SearchBar />
<VehicleContainer vehiclesData = {vehiclesData} />
        </div>
    )
}





export const App = (props: Props) => {
    return (
        <div>
         <FilterVehiclesTable vehiclesData={vehiclesData} />
        </div>
    );
};