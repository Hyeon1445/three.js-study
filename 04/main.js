import * as THREE from 'https://cdn.skypack.dev/three@0.135.0'
// import { OrbitControls } from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/controls/OrbitControls.js'
import Stats from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/libs/stats.module.js'
import { OBJLoader } from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/loaders/OBJLoader.js'

let renderer, scene, camera, object, light1;
let stats = new Stats()
const clock = new THREE.Clock()

let init = () => {
  const aspectRatio = window.innerWidth / window.innerHeight
  camera = new THREE.PerspectiveCamera(50, aspectRatio, 1, 1000)
  camera.position.z = 100
  scene = new THREE.Scene()

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  const loader = new OBJLoader()
  loader.load("./WaltHead.obj", (obj) => {
    object = obj
    object.position.y = -30
    scene.add(object)
  })

  const sphere = new THREE.SphereBufferGeometry(0.5, 16, 8)
  const spheremat = new THREE.MeshBasicMaterial({ color: 0xff0040 })
  const spheremesh = new THREE.Mesh(sphere, spheremat)

  light1 = new THREE.PointLight(0xff0040, 1,50)
  light1.add(spheremesh)
  scene.add(light1)

  stats = new Stats()
  document.body.appendChild(stats.dom)
}

const animate = () => {
  requestAnimationFrame(animate)
  const time = Date.now() * 0.0005
  const delta = clock.getDelta()

  if(object) { object.rotation.y -= 0.5 * delta }
  light1.position.x = Math.sin(time * 0.7) * 30
  light1.position.y = Math.cos(time * 0.5) * 40
  light1.position.z = Math.cos(time * 0.3) * 30
  renderer.render(scene, camera)
  stats.update()
}


init()
animate()


