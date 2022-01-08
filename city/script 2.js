
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'



/**t
 * textures
 */
/* ... */

import doorColorImageSource from './assets/images/door/color.jpg'
import doorAmbientOcclusionImageSource from './assets/images/door/ambientOcclusion.jpg'
import doorHeightImageSource from './assets/images/door/height.png'
import doorMetalnessImageSource from './assets/images/door/metalness.jpg'
import doorNormalImageSource from './assets/images/door/normal.jpg'
import doorOpacityImageSource from './assets/images/door/opacity.jpg'
import doorColorRoughnessSource from './assets/images/door/roughness.jpg'
import matcapSource from './assets/images/matcaps/5.jpg'

/* ... */

const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load(doorColorImageSource)
const doorAmbientOcclusionTexture = textureLoader.load(doorAmbientOcclusionImageSource)
const doorHeightTexture = textureLoader.load(doorHeightImageSource)
const doorMetalnessTexture = textureLoader.load(doorMetalnessImageSource)
const doorNormalTexture = textureLoader.load(doorNormalImageSource)
const doorOpacityTexture = textureLoader.load(doorOpacityImageSource)
const doorColorRoughnessTexture = textureLoader.load(doorColorRoughnessSource)
//const matcapSourceTexture = textureLoader.load(matcapSource)
const matcapTexture = textureLoader.load(matcapSource)

/* ... */


/**
 * Scene
 */
const scene = new THREE.Scene()

/**
 * Sizes
 */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight

window.addEventListener('resize', () =>
{
    // Save sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
})

/**
 * Cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (_event) =>
{
    cursor.x = _event.clientX / sizes.width - 0.5
    cursor.y = _event.clientY / sizes.height - 0.5
})

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 10
scene.add(camera)


/**
 *  lights
 */

 const pointLight = new THREE.PointLight(0Xffffff , 1 , 100)
 pointLight.position.x = 10
 pointLight.position.y = 3 
 pointLight.position.z = 5
 scene.add(pointLight)
/* * Objects
*/
// MeshBasicMaterial
/*
const material = new THREE.MeshBasicMaterial({
    map: doorColorTexture , 
    alphaMap : doorOpacityTexture , 
    transparent : true ,
    color : new THREE.Color(0xff0000) ,
    wireframe : true , 
    side : THREE.DoubleSide 
})*/


// const material = new THREE.MeshNormalMaterial()

// MeshMatcapMaterial
/** 

const material = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture
})*/

/*const material = new THREE.MeshLambertMaterial() */


//MeshToonMaterial

/** 
const toonGradient = textureLoader.load('https://threejs.org/examples/textures/gradientMaps/threeTone.jpg')
toonGradient.magFilter = THREE.NearestFilter
toonGradient.minFilter = THREE.NearestFilter

const material = new THREE.MeshToonMaterial({
    color: new THREE.Color(0xffffff),
    shininess: 30,
    roughness : 0.8
})*/

// MeshStandardMaterial
const material = new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    alphaMap: doorOpacityTexture , 
    transparent : true ,
    side : THREE.DoubleSide , 
    aoMap : doorAmbientOcclusionTexture ,
    displacementMap : doorHeightTexture , 
    displacementScale : 0.2 ,
    metalnessMap : doorMetalnessTexture ,
    roughnessMap: doorColorRoughnessTexture , 
    normalMap : doorNormalTexture
})
// Sphere
const sphere = new THREE.Mesh(new THREE.SphereGeometry(2, 16, 16), material)
sphere.position.x = - 6
scene.add(sphere)

// Plane
const plane = new THREE.Mesh(new THREE.PlaneGeometry(4, 4, 100, 100), material)
scene.add(plane)

// Torus Knot
const torusKnot = new THREE.Mesh(new THREE.TorusKnotGeometry(1.5, 0.5, 128, 16), material)
torusKnot.position.x = 6
scene.add(torusKnot)

/**
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

/**
 * Orbit controls
 */
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.zoomSpeed = 0.3

/**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)

    // Update objects
    sphere.rotation.y += 0.002
    plane.rotation.y += 0.002
    torusKnot.rotation.y += 0.002
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)
}

loop()