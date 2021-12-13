import * as THREE from 'https://cdn.skypack.dev/three@0.135.0'
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/controls/OrbitControls.js'

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

const fov = 60
const aspect = 1920 / 1080
const near = 1.0
const far = 1000.0
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.set(75, 20, 0)

const scene = new THREE.Scene()

let light = new THREE.DirectionalLight(0xffffff, 1.0)
light.position.set(20, 100, 10)
light.target.position.set(0, 0, 0)
light.castShadow = true
scene.add(light)

const controls = new OrbitControls(camera, renderer.domElement)
controls.target.set(0, 20, 0)

let geometry = new THREE.PlaneGeometry(100, 100, 10, 10)
let material = new THREE.MeshStandardMaterial({ color: 0xffffff })
const plane = new THREE.Mesh(geometry, material)
plane.castShadow = true
plane.receiveShadow = true
plane.rotation.x = -Math.PI / 2
scene.add(plane)

const box = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  new THREE.MeshStandardMaterial({
    color: 0xffffff,
  })
)
box.position.set(0, 1, 0)
box.castShadow = true
box.receiveShadow = true
scene.add(box)

// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener()
camera.add(listener)

// create a global audio source
const sound = new THREE.Audio(listener)

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader()
audioLoader.load("ambient.ogg", function (buffer) {
  sound.setBuffer(buffer)
  sound.setLoop(true)
  sound.setVolume(0.5)
  sound.autoplay = true
  sound.play()
})

const animate = function () {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
animate()
