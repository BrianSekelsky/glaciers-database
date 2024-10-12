import React from 'react';
import Sketch from 'react-p5';
import { useLayoutEffect, useState } from 'react';

function P5Sketch(glaciers) {
    const setup = (p5, canvasParentRef) => {
        let canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
        canvas.mouseWheel(e => p5.Controls.zoom(p5.controls).worldZoom(e))
    }

    let glacierList = glaciers.glaciers;

    let latList = [];
    let longList = [];

    const draw = (p5) => {
        p5.background(0, 0, 0);
        p5.ellipse(100, 100, 100);

        p5.background(0, 0, 26);
        for (let i = 0; i < glacierList.length - 1; i++) {
            let tempLat = p5.map(glacierList[i].latitude, 90.0, -90.0, 0, p5.height);
            latList.push(Math.round(tempLat))
            let tempLong = p5.map(glacierList[i].longitude, -180.0, 180.0, 0, p5.width);
            longList.push(Math.round(tempLong))
            p5.noStroke();
            p5.fill(255, 255, 255)
            p5.ellipse(tempLong, tempLat, 1, 1);
        }

        console.log(p5.mouseX)

        if (latList.includes(p5.mouseY) && longList.includes(p5.mouseX)) {
            p5.fill(255, 255, 255)
            p5.ellipse(p5.mouseX, p5.mouseY, 20, 20);
        }
    }

    return (
        <Sketch setup={setup} draw={draw} />
    )

    const [size, setSize] = useState([0, 0]);
    useLayoutEffect((p5) => {
        function updateSize() {
            p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

export default P5Sketch;