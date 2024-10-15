import React from 'react';
import Sketch from 'react-p5';
import { useLayoutEffect, useState } from 'react';

function P5Sketch(glaciers) {

    let glacierList = glaciers.glaciers;

    let canvasContainer = document.getElementById('canvas-container');
    console.log(canvasContainer)
    let width = canvasContainer.offsetWidth;
    let height = 800;

    let latList = [];
    let longList = [];

    const setup = (p5, canvasParentRef) => {

        let canvas = p5.createCanvas(width - 2, height).parent(canvasParentRef);

        for (let i = 0; i < glacierList.length - 1; i++) {
            let tempLat = p5.map(glacierList[i].latitude, 90.0, -90.0, 0, p5.height);
            latList.push(Math.round(tempLat))
            let tempLong = p5.map(glacierList[i].longitude, -180.0, 180.0, 0, p5.width);
            longList.push(Math.round(tempLong))
            p5.stroke(255, 255, 255);
            p5.fill(0, 0, 0)
            p5.ellipse(tempLong, tempLat, 1, 1);
        }

    }

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
            // height = canvasContainer.offsetHeight;
            p5.resizeCanvas(width - 2, 800);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

export default P5Sketch;