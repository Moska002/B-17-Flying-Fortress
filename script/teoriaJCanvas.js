var cts;
var ctx;

function start(){
    init();
    draw();
}

function init(){
    cts = $('#canvas');
    ctx = canvas.getContext('2d');
}

function draw(){
    cts.drawLine({                      //Disegna una spezzata
        strokeStyle: '#000',
        strokeWidth: 10,
        x1: 100, y1: 50,
        x2: 100, y2: 150,
        x3: 200, y3: 100,
        x4: 150, y4: 200
      });

    cts.drawRect({                      //Disegna un rettangolo
        fillStyle: 'steelblue',         //Colore di fill della figura
        strokeStyle: 'blue',            //Colore del bordo
        strokeWidth: 4,                 //Grossezza del bordo
        x: 50, y: 50,                   //Posizione del 1o vertice
        fromCenter: false,              
        width: 200,
        height: 100
    });

    cts.drawArc({                       //Disegna un arco
        fillStyle: 'steelblue',
        strokeStyle: 'blue',
        strokeWidth: 4,
        x: 300, y: 100,                 //Centro
        radius: 50,
        // start and end angles in degrees
        start: 0, end: 200
    });

    cts.drawArc({
        fillStyle: 'yellow',
        strokeStyle: 'black',
        strokeWidth: 2,
        x: 100, y: 100,                 //Centro
        radius: 50,
        // start and end angles in degrees
        start: 0, end: 360
    }).drawArc({
        fillStyle: 'black',
        strokeStyle: 'black',
        strokeWidth: 1,
        x: 75, y: 75,                 //Centro
        radius: 5,
        // start and end angles in degrees
        start: 0, end: 360
    }).drawArc({
        fillStyle: 'black',
        strokeStyle: 'black',
        strokeWidth: 1,
        x: 125, y: 75,                 //Centro
        radius: 5,
        // start and end angles in degrees
        start: 0, end: 360
    }).drawArc({
        fillStyle: 'red',
        strokeStyle: 'black',
        strokeWidth: 1,
        x: 100, y: 100,                 //Centro
        radius: 25,
        // start and end angles in degrees
        start: 90, end: 270
    });

    cts.drawLine({
        strokeStyle: 'black',
        strokeWidth: 1,
        x1: 75, y1: 100,
        x2: 125, y2: 100
    });
}