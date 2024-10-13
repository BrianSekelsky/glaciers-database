import React from 'react';
import Sketch from 'react-p5';
import { useLayoutEffect, useState } from 'react';

function P5Sketch(glaciers) {

    let canvasContainer = document.getElementById('canvas-container');
    let width = canvasContainer.offsetWidth;
    let height = canvasContainer.offsetHeight;

    let latList = [];
    let longList = [];

    let scal = 1;
    let offset;

    const setup = (p5, canvasParentRef) => {
        offset = p5.createVector(0, 0);

        window.addEventListener("wheel", e => {
            const s = 1 - (e.deltaY / 1000);
            scal *= s;

            const mouse = p5.createVector(p5.mouseX, p5.mouseY);

            offset
                .sub(mouse)
                .mult(s)
                .add(mouse)

        });


        let canvas = p5.createCanvas(width - 2, 600).parent(canvasParentRef);

    }

    // console.log(latList)
    // console.log(longList)

    let glacierList = glaciers.glaciers;

    const draw = (p5) => {

        const mouse = p5.createVector(p5.mouseX, p5.mouseY);
        const relativeMouse = mouse.copy().sub(offset);

        // p5.background(0, 0, 0);
        p5.translate(offset.x, offset.y);
        for (let i = 0; i < glacierList.length - 1; i++) {
            let tempLat = p5.map(glacierList[i].latitude, 90.0, -90.0, 0, p5.height);
            latList.push(Math.round(tempLat))
            let tempLong = p5.map(glacierList[i].longitude, -180.0, 180.0, 0, p5.width);
            longList.push(Math.round(tempLong))
            p5.stroke(255, 255, 255);
            p5.fill(0, 0, 0)
            p5.ellipse(tempLong, tempLat, 2 * scal, 2 * scal);
        }

        if (p5.mouseIsPressed) {
            offset.x -= p5.pmouseX - p5.mouseX;
            offset.y -= p5.pmouseY - p5.mouseY;
        }

        // if (latList.includes(p5.mouseY) && longList.includes(p5.mouseX)) {
        //     p5.fill(255, 0, 0);
        //     p5.stroke(255, 0, 0);
        //     p5.ellipse(p5.mouseX, p5.mouseY, 2, 2);
        // }
        // p5.fill(0, 0, 0);
        // p5.stroke(255, 255, 255);
        // p5.rect(width - 110, height - 115, 40, 40);

        // p5.noStroke();
        // p5.fill(255, 255, 255);
        // p5.text(p5.mouseX, width - 100, height - 100);
        // p5.text(p5.mouseX, width - 100, height - 80);
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