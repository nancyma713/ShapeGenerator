document.addEventListener('DOMContentLoaded', () => {
    let generate = document.getElementById("generate");
    let clearAll = document.getElementById("clear-all");

    let canvas = document.getElementById('canvas-board');
    let ctx = canvas.getContext("2d");

    generate.addEventListener('click', () => {
        let colors = document.getElementsByName("color");
        let shapes = document.getElementsByName("shape");
        let shibas = document.getElementsByName("shibasan");
        let color;
        let shape;
        let shiba;

        // set checked conditions
        for (let i = 0; i < colors.length; i++) {
            if (colors[i].checked) {
                color = colors[i].value;
            }
        }

        for (let i = 0; i < shapes.length; i++) {
            if (shapes[i].checked) {
                shape = shapes[i].value;
            }
        }

        for (let i = 0; i < shibas.length; i++) {
            if (shibas[i].checked) {
                shiba = shibas[i].value;
            }
        }

        // fetch a shiba if yes is selected
        // if (shiba === "yes") {
        //     shiba = fetchShiba();
        // } else {
        //     shiba = null;
        // }

        // randomize size of shape
        let length = Math.floor(Math.random() * 30 + 50);

        // set random x-coordinate
        let position = {
            x: Math.floor(Math.random() * canvas.width),
            y: canvas.height - length - 5
        }

        // add a new shape to the screen
        new Shape(ctx, color, shape, shiba, position, length);
    })

    clearAll.addEventListener('click', () => {
        clearBoard();
    })
})

function clearBoard() {
    let canvas = document.getElementById('canvas-board');
    let ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Unable to return the URL from the promise, but ideally would be able to set the shiba variable above to this returned URL
// function fetchShiba() {
//     return fetch('http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=false')
//         .then(response => response.json())
//         .then(json => json[0])
// }

class Shape {
    constructor(ctx, color, shape, shiba, position, length) {
        this.ctx = ctx;
        this.color = color;
        this.shape = shape;
        this.shiba = shiba;
        this.length = length;
        this.position = position;

        this.draw = this.draw.bind(this);
        this.draw();
    }

    // conditionally draw shapes
    draw() {
        switch (this.shape) {
            case "square":
                this.drawSquare();
                break;
            case "triangle":
                this.drawTriangle();
                break;
            case "circle":
                this.drawCircle();
                break;
            default:
                return;
        }

        const shape = requestAnimationFrame(this.draw);
        let clear = document.getElementById("clear-all");

        // on Clear Screen click, cancel animation
        clear.addEventListener('click', () => {
            cancelAnimationFrame(shape);
        })
    }

    // Shibas filling shapes needs to be added for all shapes
    drawSquare() {
        // const image = new Image;
        // if (this.shiba) {
        //     image.src = this.shiba;
        // }

        this.ctx.clearRect(this.position.x - 5, this.position.y + 5, this.length + 10, this.length + 10);
        this.ctx.beginPath();
        this.ctx.lineWidth = "10"
        this.ctx.strokeStyle = this.color;
        this.ctx.rect(this.position.x, this.position.y, this.length, this.length);
        this.ctx.stroke();

        this.position.y -= 5;
    }

    drawTriangle() {
        // const image = new Image;
        // if (this.shiba) {
        //     image.src = this.shiba;
        // }

        const height = this.length * Math.cos(Math.PI / 6);
        this.ctx.clearRect(this.position.x - height / 2 - 10, this.position.y + 5, this.length + height + 10, this.length + height + 10);
        this.ctx.beginPath();
        this.ctx.lineWidth = "10"
        this.ctx.strokeStyle = this.color;
        this.ctx.moveTo(this.position.x, this.position.y);
        this.ctx.lineTo(this.position.x + height / 2, this.position.y + height);
        this.ctx.lineTo(this.position.x - height / 2, this.position.y + height);
        this.ctx.lineTo(this.position.x, this.position.y);
        this.ctx.lineTo(this.position.x + height / 2, this.position.y + height);
        this.ctx.stroke();
        this.ctx.closePath();

        this.position.y -= 5;
    }

    // note: clearing previous circles needs to be fixed
    drawCircle() {
        // const image = new Image;
        // if (this.shiba) {
        //     image.src = this.shiba;
        // }

        this.ctx.clearRect(this.position.x - this.length - 5, this.position.y + 5 + this.length, this.length * 2 + 10, this.length * 2 + 10);
        this.ctx.beginPath();
        this.ctx.lineWidth = "10"
        this.ctx.strokeStyle = this.color;
        this.ctx.fillStyle = 'white';
        this.ctx.arc(this.position.x, this.position.y, this.length, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.closePath();

        this.position.y -= 5;
    }

    // reverse gravity logic

    // hasCollided() {
    //      // logic for a shape hitting another shape: speed decreases
    // }
}