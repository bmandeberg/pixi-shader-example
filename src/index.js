import { Ticker, Container, Renderer, Mesh, Shader, Geometry, Filter } from 'pixi.js'
import { GUI } from 'dat.gui'
import basicVert from './basic.vert'
import frag from './frag.frag'
import colorSwap from './color_swap.frag'
import './style.scss'

if (process.env.NODE_ENV === 'development') {
  require('../dist/index.html')
}

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
const BASIC_UNIFORMS = {
  resolution: [WIDTH, HEIGHT],
  devicePixelRatio: window.devicePixelRatio,
}

// init pixi
const view = document.createElement('canvas')
const stage = new Container()
const renderer = new Renderer({
  width: WIDTH / window.devicePixelRatio,
  height: HEIGHT / window.devicePixelRatio,
  backgroundColor: 0xffffff,
  antialias: true,
  resolution: window.devicePixelRatio,
  view,
})
document.body.appendChild(view)
Ticker.shared.add(draw)

const geometry = new Geometry()
  .addAttribute(
    'aVertexPosition',
    [WIDTH / -2, HEIGHT / -2, WIDTH / 2, HEIGHT / -2, WIDTH / 2, HEIGHT / 2, WIDTH / -2, HEIGHT / 2], // x, y pairs
    2
  )
  .addAttribute('aUvs', [0, 0, 1, 0, 1, 1, 0, 1], 2) // u, v pairs
  .addIndex([0, 1, 2, 0, 2, 3])

// frag uniforms
const uniforms = Object.assign({}, BASIC_UNIFORMS, { b: 0 })

// mesh object that we apply shader to
const shader = Shader.from(basicVert, frag, uniforms)
const mesh = new Mesh(geometry, shader)
mesh.x = WIDTH / 2
mesh.y = HEIGHT / 2
stage.addChild(mesh)

// custom filter
const colorSwapUniforms = Object.assign({}, BASIC_UNIFORMS, { enabled: false })
const colorSwapFilter = new Filter(null, colorSwap, colorSwapUniforms)
stage.filters = [colorSwapFilter]

// gui
const gui = new GUI()
gui.add(uniforms, 'b', 0, 1, 0.01).name('example param')
const colorSwapFolder = gui.addFolder('Example Filter')
colorSwapFolder.add(colorSwapUniforms, 'enabled')
colorSwapFolder.open()

// render loop
function draw(delta) {
  renderer.render(stage)
}
