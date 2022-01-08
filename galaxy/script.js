import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import particleImageSource from '../galaxy/assets/images/particles/1.png' 

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load(particleImageSource)

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
 * Particles
 */
// Geometry
const particlesGeometry = new THREE.Geometry()
const galaxyRadius = 10

for(let i = 0; i < 500000; i++)
{
    // Vertice
    const progress = Math.random()
    const angle = progress * 15
    const distance = progress * galaxyRadius
    let x = Math.sin(angle) * distance
    let y = 0
    let z = Math.cos(angle) * distance


    const randomAngle = Math.random() * Math.PI * 2
    const randomRadius = Math.random() * Math.random() * 3 

    x += Math.cos(randomAngle) * randomRadius
    y += (Math.random() - 0.5) * Math.random() * 1 
    z += Math.sin(randomAngle) * randomRadius
/*
    x += (Math.random() - 0.5) * Math.random() * 5
    y += (Math.random() - 0.5) * Math.random() * 1
    z += (Math.random() - 0.5) * Math.random() * 5
*/
    const vertice = new THREE.Vector3(x, y, z)
    particlesGeometry.vertices.push(vertice)

    // Color
    /*
    const color = new THREE.Color(
        Math.random(),
        Math.random(),
        Math.random()
    )*/


const innerColor = new THREE.Color(0xffae33)
const outerColor = new THREE.Color(0xff0000)
const color = new THREE.Color()
color.r = innerColor.r + (outerColor.r - innerColor.r) * progress
color.g = innerColor.g+ (outerColor.g - innerColor.g) * progress
color.b = innerColor.b + (outerColor.b - innerColor.b) * progress

particlesGeometry.colors.push(color)
}

// Material
const particlesMaterial = new THREE.PointsMaterial({
    vertexColors: true,
    size: 0.02,
    sizeAttenuation: true,
    // color: new THREE.Color(0xff0000),
    // map: particleTexture
    alphaMap: particleTexture,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
})

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)

/**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)
}

loop()