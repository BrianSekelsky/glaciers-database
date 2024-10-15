import Row from "./Row";
import { useState } from "react";

function Table(glaciers) {

    let glacierList = glaciers.glaciers;

    return (
        <div>
            <table className="border-separate border-spacing-2 border w-full">
                <thead>
                    <tr className="text-left font-bold">
                        <td>id</td>
                        <td>name</td>
                        <td>latitude</td>
                        <td>longitude</td>
                    </tr>
                </thead>
                <tbody>
                    {glacierList.map(glacier => (
                        <Row key={glacier.id} glacier={glacier} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;