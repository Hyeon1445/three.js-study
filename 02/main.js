import * as THREE from 'https://cdn.skypack.dev/three@0.135.0'
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/controls/OrbitControls.js'
import Stats from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/libs/stats.module.js'

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const fov = 60 // field of view
const aspect = 1920 / 1080 // aspect ratio
const near = 1
const far = 1000
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.set(75, 20, 0)

const scene = new THREE.Scene()

// let light = new THREE.DirectionalLight(0xffffff, 1.0) // shadow(o)
// light.position.set(20, 100, 10)
// light.castShadow = true
// scene.add(light)

// let AmbientLightColor = 0xffffff
// let AmbientLightIntensity = 1 // 0 ~ 1
// const light = new THREE.AmbientLight(AmbientLightColor, AmbientLightIntensity) // soft white light with no shadow
// scene.add(light)

const hemisphereLight = new THREE.HemisphereLight(0xffff80, 0x4040ff, 1) // hemisphereLight needs two colors (위/아래 색 다름)
scene.add(hemisphereLight)

const controls = new OrbitControls(camera, renderer.domElement)
let geometry = new THREE.PlaneGeometry(100, 100, 10, 10)
let material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
})

const plane = new THREE.Mesh(geometry, material)
plane.castShadow = true
plane.receiveShadow = true
plane.rotation.x = -Math.PI / 2
scene.add(plane)

let stats = new Stats()
document.body.appendChild(stats.dom)

// const box = new THREE.Mesh(
//   new THREE.BoxGeometry(2, 2, 2),
//   new THREE.MeshStandardMaterial({
//     color: 0xffffff,
//   })
// )

// box.position.set(0, 5, 0)
// box.castShadow = true
// box.receiveShadow = true
// scene.add(box)

const Sphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 15, 15),
  new THREE.MeshStandardMaterial({
    color: 0xffffff,
  })
)
Sphere.position.set(0, 5, 0)
Sphere.castShadow = true
Sphere.receiveShadow = true
scene.add(Sphere)

const animate = () => {
  requestAnimationFrame(animate)
  stats.update()
  renderer.render(scene, camera)
}

animate()