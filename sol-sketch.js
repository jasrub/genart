const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes'); 

const settings = {
  dimensions: 'A3',
  orientation: 'landscape'
};


const sketch = () => {

  const nColors = random.rangeFloor(1,6);
  const palette = random.shuffle(random.pick(palettes)).splice(0, nColors);
  const bgColor = '#eee'
  // palette.splice(0,1);

  const createGrid = () => {
    const points = [];
    const count = 6;
    for (let x = 0; x < count; x++) {
      for (let y =0; y < count; y++) {
        const u = count<= 1? 0.5 : x / (count-1);
        const v = count<=1? 0.5: y / (count-1);
        const radius = 0.005;
        points.push({
          color: 'red',
          radius,
          position: [u, v],
          used: false
        });
      }
    }
    return points;
  }

  const points = createGrid();
  const margin = 0;

  const getRandomPoint = () => {
    i = random.rangeFloor(0, points.length);
    p = points[i];
    points.splice(i, 1);
    return p;
  }


  const rects = []

  return ({ context, width, height }) => {
    context.fillStyle = bgColor;
    context.fillRect(0, 0, width, height);

    // points.forEach(data => {
    //   const {position, radius, color, rotation} = data;
    //   const [u, v] = position;
    //   const x = lerp(margin, width-margin, u);
    //   const y = lerp(margin, width-margin, v);

    //   context.beginPath();
    //   context.arc(x, y, radius * width, 0, Math.PI * 2, false);
    //   context.fillStyle = color;
    //   context.fill();
    //   // context.save();
    //   // context.fillStyle = color;
    //   // context.font = `${radius * width}px "Halvetica"`;
    //   // context.translate(x, y);
    //   // context.rotate(rotation);
    //   // context.fillText('-', 0, 0);
    //   // context.restore();

    // })

      const drawTrapez = (p1, p2) => {
      let [u1, v1] = p1.position;
      let x1 = lerp(margin, width-margin, u1);
      let y1 = lerp(margin, width-margin, v1);

      let [u2, v2] = p2.position;
      let x2 = lerp(margin, width-margin, u2);
      let y2 = lerp(margin, width-margin, v2);

      context.save();
      context.beginPath();
      context.moveTo(x1, height-margin);
      context.lineTo(x1, y1);
      context.lineTo(x2, y2);
      context.lineTo(x2, height-margin);

      context.closePath();

      context.globalAlpha = 0.8;

      context.fillStyle = random.pick(palette);
      context.fill();
      

      context.strokeStyle = bgColor;
      context.lineWidth = 12;
      context.globalAlpha = 1;
      context.stroke();

  }


      while (points.length > 1) {
        p1 = getRandomPoint();
        p2 = getRandomPoint();
        rects.push([p1,p2]);
      };
      rects.sort((a, b)=>{
        avgYa = Math.abs(a[0].position.v + a[1].position.v)/2
        avgYb = Math.abs(b[0].position.v + b[1].position.v)/2
        return avgYb-avgYa;
      })



      rects.forEach(([p1, p2])=>drawTrapez(p1,p2));
  };
};


canvasSketch(sketch, settings);
