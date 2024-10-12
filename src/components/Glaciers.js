import { useEffect, useState } from "react";
import Glacier from "./Glacier";
import Sketch from './P5Sketch';

function Glaciers() {
    const [data, setData] = useState(null);
    const [glacierList, setGlacierList] = useState([]);

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

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className='sketch'>
                <Sketch glaciers={glacierList} />
            </div>
        </div>
    );
}

export default Glaciers;

{/* <table>
<tbody>
    {glacierList.map(glacier => (
        <tr key={glacier.id}>
            <td>{glacier.name}</td>
            <td>{glacier.latitude}</td>
            <td>{glacier.longitude}</td>
        </tr>
    ))}
</tbody>
</table> */}