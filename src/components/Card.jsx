function Card(glacier) {

    let id = glacier.glacier.id;
    let name = glacier.glacier.name;
    let latitude = glacier.glacier.latitude;
    let longitude = glacier.glacier.longitude;

    return (
        <div className="border text-left py-2 px-4">
            <p className="text-xs">WGMS_ID: {id}</p>
            <p className="pb-2">{name}</p>
            <div className="pt-2">
                <p className="text-xs">Latitude: {latitude}</p>
                <p className="text-xs">Longitude: {longitude}</p>
            </div>
        </div>
    );
}

export default Card;