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

        // randomize size of shape
        let length = Math.floor(Math.random() * 30 + 50);

        // set random x-coordinate
        let position = {
            x: Math.floor(Math.random() * canvas.width),
            y: canvas.height - length - 5
        }

        // add a new shape to the screen
        new Shape(ctx, color, shape, shiba, position, length);

        fetchShiba();
    })

    clearAll.addEventListener('click', () => {
        clearBoard();
    })
})

function fetchShiba() {
    // let shibaIMG;
    fetch('http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=false')
        .then(response => response.json())
        .then(response => {
            // shibaIMG = response
            console.log(response)
        });
    // return shibaIMG;
}

function clearBoard() {
    let canvas = document.getElementById('canvas-board');
    let ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

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

    // fetch some shibas
    // fetchShiba() {
    //     // let shibaIMG;
    //     fetch('http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=false')
    //         .then(response => response.json())
    //         .then(response => {
    //             // shibaIMG = response
    //             console.log(response)
    //         });
    //     // return shibaIMG;
    // }

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

    drawSquare() {
        // if (this.shiba === "yes") {
        //     const image = new Image;
        //     image.src = this.fetchShiba();
        // }
        this.ctx.clearRect(this.position.x - 5, this.position.y + 5, this.length + 10, this.length + 10);
        this.ctx.beginPath();
        this.ctx.lineWidth = "10"
        this.ctx.strokeStyle = this.color;
        this.ctx.rect(this.position.x, this.position.y, this.length, this.length);
        // this.ctx.fill(image);
        this.ctx.stroke();

        this.position.y -= 5;
    }

    drawTriangle() {
        // if (this.shiba === "yes") {
        //     const image = new Image;
        //     image.src = this.fetchShiba();
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
        // this.ctx.fill(image);
        this.ctx.closePath();

        this.position.y -= 5;
    }

    drawCircle() {
        // if (this.shiba === "yes") {
        //     const image = new Image;
        //     image.src = this.fetchShiba();
        // }
        this.ctx.clearRect(this.position.x - this.length - 5, this.position.y + 5 + this.length, this.length * 2 + 10, this.length * 2 + 10);
        this.ctx.beginPath();
        this.ctx.lineWidth = "10"
        this.ctx.strokeStyle = this.color;
        this.ctx.fillStyle = 'white';
        this.ctx.arc(this.position.x, this.position.y, this.length, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.closePath();
        // this.ctx.fill(image);

        this.position.y -= 5;
    }

}