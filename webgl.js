const canvasSketch = require('canvas-sketch');

// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require('three');

// Include any additional ThreeJS examples below
require('three/examples/js/controls/OrbitControls');

const settings = {
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: 'webgl',
  // Turn on MSAA
  attributes: { antialias: true }
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    context
  });

  // WebGL background color
  renderer.setClearColor('hsl(0, 0%, 95%)', 1);

  // Setup a camera
  const camera = new THREE.OrthographicCamera();
 

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera);

  // Setup your scene
  const scene = new THREE.Scene();

  const boxGeo = new THREE.BoxGeometry(1, 1, 1);
  for (let i=0; i<10; i++) {
  const mesh = new THREE.Mesh(
    boxGeo,
    new THREE.MeshBasicMaterial({
      color: 'purple',
    })
  );
  mesh.position.set(
    Math.random(), Math.random(), Math.random()
    );
  mesh.scale.multiplyScalar(0.1);
  scene.add(mesh);
}


  // draw each frame
  return {
    // Handle resize events here
    resize ({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight);
      

      const aspect = viewportWidth / viewportHeight;

        // Ortho zoom
        const zoom = 1.0;

        // Bounds
        camera.left = -zoom * aspect;
        camera.right = zoom * aspect;
        camera.top = zoom;
        camera.bottom = -zoom;

        // Near/Far
        camera.near = -100;
        camera.far = 100;

        // Set position & look at world center
        camera.position.set(zoom, zoom, zoom);
        camera.lookAt(new THREE.Vector3());

        // Update the camera
        camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render ({ time }) {
      controls.update();
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload () {
      controls.dispose();
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
