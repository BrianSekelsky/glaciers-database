import Card from "./Card";
import { useState } from "react";

function Library(glaciers) {

    let glacierList = glaciers.glaciers;

    return (
        <div>
            <div className="grid grid-cols-4 grid-auto-rows gap-2">
                {glacierList.map(glacier => (
                    <Card key={glacier.id} glacier={glacier} />
                ))}
            </div>
        </div>
    );
}

export default Library;