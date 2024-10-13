import React from 'react';
import Sketch from 'react-p5';
import { useLayoutEffect, useState } from 'react';

function P5Sketch(glaciers) {

    let canvasContainer = document.getElementById('canvas-container');
    let width = canvasContainer.offsetWidth;
    let height = canvasContainer.offsetHeight;

    let latList = [];
    let longList = [];

    const setup = (p5, canvasParentRef) => {

        let canvas = p5.createCanvas(width - 2, 600).parent(canvasParentRef);

        for (let i = 0; i < glacierList.length - 1; i++) {
            let tempLat = p5.map(glacierList[i].latitude, 90.0, -90.0, 0, p5.height);
            latList.push(Math.round(tempLat))
            let tempLong = p5.map(glacierList[i].longitude, -180.0, 180.0, 0, p5.width);
            longList.push(Math.round(tempLong))
            p5.stroke(255, 255, 255);
            p5.fill(0, 0, 0)
            p5.ellipse(tempLong, tempLat, 2, 2);
        }

    }

    // console.log(latList)
    // console.log(longList)

    let glacierList = glaciers.glaciers;

    const draw = (p5) => {

    }

    return (
        <div className="z-0">
            <Sketch setup={setup} draw={draw} />
        </div>
    )

    const [size, setSize] = useState([0, 0]);
    useLayoutEffect((p5) => {
        function updateSize() {
            width = canvasContainer.offsetWidth;
            height = canvasContainer.offsetHeight;
            p5.resizeCanvas(width - 2, height - 2);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

export default P5Sketch;