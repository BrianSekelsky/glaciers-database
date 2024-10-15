import React from "react";
import ReactDOM from "react-dom";
import World from "@svg-maps/world";
import { SVGMap } from "react-svg-map";
import "react-svg-map/lib/index.css";

function Map() {

    return (
        <SVGMap map={World} />
    )
}

export default Map;