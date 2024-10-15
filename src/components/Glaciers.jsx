import { useEffect, useState } from "react";
import Glacier from "./Glacier.jsx";
import Renderer from "./Renderer.jsx";

import { MapContainer, TileLayer, useMap } from 'react-leaflet'

function Glaciers() {
    const [data, setData] = useState(null);
    const [glacierList, setGlacierList] = useState([]);
    const [activeTab, setActiveTab] = useState("table");
    const [searchInput, setSearchInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetch('/glaciers.json')
            .then(response => response.json())
            .then(data => {
                setData(data);
                // Assuming the data contains an array of glaciers
                const glacierArray = Array.isArray(data) ? data : data.glaciers;
                if (glacierArray && Array.isArray(glacierArray)) {
                    const glaciers = glacierArray.map(glacier => new Glacier(glacier.WGMS_ID, glacier.NAME, glacier.LATITUDE, glacier.LONGITUDE));
                    setGlacierList(glaciers);
                } else {
                    console.error('Expected an array of glaciers');
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // Filter the glacierList based on the search query
    const filteredGlacierList = glacierList.filter(glacier =>
        glacier.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setSearchQuery(searchInput);
        }
    };

    if (!data) {
        return <div className="animate-pulse">Loading</div>;
    }

    return (
        <div>
            <div className='sketch border'>
                {/* <Sketch glaciers={glacierList} /> */}
                <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {/* <Marker position={[51.505, -0.09]}>
                        <Popup>
                            This is a popup
                        </Popup>
                    </Marker> */}
                </MapContainer>
            </div>
            <div className="w-100 justify-between flex mt-8 mb-4 items-center">
                <div className="flex justify-left gap-2">
                    <input
                        type="text"
                        id="searchBar"
                        value={searchInput}
                        placeholder="..."
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="p-2 border text-white bg-black"
                    />
                    <button id="searchBtn" className="border px-4" onClick={(e) => e.target.value}>
                        SEARCH
                    </button>
                </div>
                <div className="tabs flex gap-2">
                    <button onClick={() => setActiveTab("table")} className={activeTab === "table" ? "active" : ""}><p className="hover:text-blue">TABLE</p></button>
                    |
                    <button onClick={() => setActiveTab("library")} className={activeTab === "library" ? "active" : ""}>CARDS</button>
                </div>
            </div>
            <Renderer myActiveTab={activeTab} myGlaciers={filteredGlacierList} />
        </div>
    );
}

export default Glaciers;