import { Matrix4, Vec4 } from "./math"
import { Context, FileLoader } from "./util"
import CubeSource from './assets/Cube1.obj?raw'
import { Camera } from "./camera"

let canvas = document.querySelector('#canvas') as HTMLCanvasElement
canvas.width = document.body.clientWidth
canvas.height = document.body.clientHeight

let ctx = canvas.getContext('2d') as CanvasRenderingContext2D
ctx.imageSmoothingEnabled = false

let camera = new Camera()
camera.far = 200
let cube1 = FileLoader.strToObj(CubeSource)

Context.drawLine(ctx, 0, canvas.height / 2, canvas.width, canvas.height / 2)
Context.drawLine(ctx, canvas.width / 2, canvas.height, canvas.width / 2, 0)


function render() {
    Context.clearBackground(ctx, new Vec4(255, 255, 255, 1))
    cube1.rotateZ(0.01)
    cube1.rotateY(0.01)
    let vertices = cube1.vertices
    vertices = vertices.map((vertex: Vec4) => {
        let vert = vertex
        vert = Matrix4.multiplyVec(camera.viewportMatrix(), vert)
        vert = Matrix4.multiplyVec(camera.perspectiveMatrix(), vert)
        vert = Matrix4.multiplyVec(camera.orthogonalMatrix(), vert)
        return vert
    })

    cube1.faces.forEach((face) => {
        Context.drawFace(ctx, vertices, face)
    })
    requestAnimationFrame(render)
}

render()
