import Library from "./Library";
import Table from "./Table";

function Renderer(props) {

    let myActiveTab = props.myActiveTab;
    let glacierList = props.myGlaciers;

    if (myActiveTab === "table") {
        return (
            <Table glaciers={glacierList} />
        );
    } else if (myActiveTab === "library") {
        return (
            <Library glaciers={glacierList} />
        );
    }
}

export default Renderer;