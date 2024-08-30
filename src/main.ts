import { Matrix4, Vec4 } from "./math"
import { Context, FileLoader } from "./util"
import MeshSource from './assets/cube1.obj?raw'
import { Camera } from "./camera"

let canvas = document.querySelector('#canvas') as HTMLCanvasElement
canvas.width = document.body.clientWidth
canvas.height = document.body.clientHeight

let ctx = canvas.getContext('2d') as CanvasRenderingContext2D
ctx.imageSmoothingEnabled = false

let camera = new Camera()
camera.near = 100
camera.far = 200
let mesh = FileLoader.strToObj(MeshSource)

Context.drawLine(ctx, 0, canvas.height / 2, canvas.width, canvas.height / 2)
Context.drawLine(ctx, canvas.width / 2, canvas.height, canvas.width / 2, 0)

let t = 0

function render() {
    Context.clearBackground(ctx, new Vec4(255, 255, 255, 1))
    mesh.rotate(0.02, 0.02, 0.02)
    mesh.transform(0.05 * Math.cos(t), 0, 0)
    t += 1 / 60
    let vertices = mesh.vertices
    vertices = vertices.map((vertex: Vec4) => {
        let vert = vertex
        vert = Matrix4.multiplyVec(camera.viewportMatrix(), vert)
        vert = Matrix4.multiplyVec(camera.perspectiveMatrix(), vert)
        vert = Matrix4.multiplyVec(camera.orthogonalMatrix(), vert)
        return vert
    })

    mesh.faces.forEach((face) => {
        Context.drawFace(ctx, vertices, face)
    })
    requestAnimationFrame(render)
}

render()
