function Row(glacier) {

    let id = glacier.glacier.id;
    let name = glacier.glacier.name;
    let latitude = glacier.glacier.latitude;
    let longitude = glacier.glacier.longitude;

    return (
        <tr className="text-left py-2 px-4">
            <td className="pt-2">{id}</td>
            <td className="pb-2">{name}</td>
            <td className="pt-2">{latitude}</td>
            <td className="pt-2">{longitude}</td>

        </tr>
    );
}

export default Row;