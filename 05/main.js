import * as THREE from 'https://cdn.skypack.dev/three@0.135.0'
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/controls/OrbitControls.js'
import { GUI } from 'https://cdn.skypack.dev/three@0.134.0/examples/jsm/libs/dat.gui.module.js'

let renderer, scene, camera, gui;
let spotLight, lightHelper, shadowCameraHelper

function init() {
  renderer = new THREE.WebGLRenderer()
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.outputEncoding = THREE.sRGBEncoding
  scene = new THREE.Scene()

  const aspectRatio = window.innerWidth / window.innerHeight
  camera = new THREE.PerspectiveCamera(35, aspectRatio, 1, 1000)
  camera.position.set(160, 40, 10)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.addEventListener("change", render)
  controls.minDistance = 20
  controls.maxDistance = 500
  controls.enabledPan = false

  const ambient = new THREE.AmbientLight(0xffffff, 0.1)
  scene.add(ambient)

  spotLight = new THREE.SpotLight(0xffffff, 1)
  spotLight.position.set(15, 40, 35)
  spotLight.angle = Math.PI / 4
  spotLight.penumbra = 0.1
  spotLight.decay = 2
  spotLight.distance= 200
  spotLight.castShadow = true
  spotLight.shadow.mapSize.width = 512
  spotLight.shadow.mapSize.height = 512
  spotLight.shadow.camera.near = 10
  spotLight.shadow.camera.far = 200
  spotLight.shadow.focus = 1
  scene.add(spotLight)

  lightHelper = new THREE.SpotLightHelper(spotLight)
  scene.add(lightHelper)

  shadowCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera)
  scene.add(shadowCameraHelper)
  // lightHelper, shadowCameraHelper: 빛, 그림자가 들어오는 선 표시

  let material = new THREE.MeshPhongMaterial({
    color: 0x808080,
    dithering: true,
  })

  let geometry = new THREE.PlaneBufferGeometry(2000, 2000)
  let mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(0, -1, 0)
  mesh.rotation.x = -Math.PI * 0.5
  mesh.receiveShadow = true
  scene.add(mesh)

  material = new THREE.MeshPhongMaterial({
    color: 0x4080ff,
    dithering: true,
  })

  geometry = new THREE.CylinderBufferGeometry(5, 5, 2, 32, 1, false)

  mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(0, 5, 0)
  mesh.castShadow = true
  scene.add(mesh)

  render()
}

function render() {
  renderer.render(scene, camera)
}

function buildGUI() {
  gui = new GUI()
  const params = {
    "light color": spotLight.color.getHex(),
    intensity: spotLight.intensity,
    distance: spotLight.distance,
    angle: spotLight.angle,
    penumbra: spotLight.penumbra,
    decay: spotLight.decay,
    focus: spotLight.shadow.focus,
  }

  gui.addColor(params, "light color").onChange((val) => {
    spotLight.color.setHex(val)
    render()
  })

  gui.add(params, "intensity", 0, 2).onChange((val) => {
    spotLight.intensity = val
    render()
  })

  gui.add(params, "distance", 50, 200).onChange((val) => {
    spotLight.distance = val
    render()
  })

  gui.add(params, "angle", 0, Math.PI / 3).onChange((val) => {
    spotLight.angle = val
    render()
  })

  gui.add(params, "penumbra", 0, 1).onChange((val) => {
    spotLight.penumbra = val
    render()
  })

  gui.add(params, "decay", 1, 2).onChange((val) => {
    spotLight.decay = val
    render()
  })

  gui.add(params, "focus", 0, 1).onChange((val) => {
    spotLight.shadow.focus = val
    render()
  })
}


init()
buildGUI()


