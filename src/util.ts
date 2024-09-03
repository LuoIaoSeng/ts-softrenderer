import { Vec3, Vec4 } from "./math"
import { Face, Mesh } from "./model"

export enum KeyCode {
    A = 65,
    W = 87,
    S = 83,
    D = 68,
    Q = 81,
    E = 69,
    Space = 32,
    Shift = 16
}

export class FileLoader {
    static strToObj = (source: string) => {
        let m = new Mesh()
        let lines = source.split('\n')
        lines.forEach((str) => {
            if (str.startsWith('v ')) {
                let coord = str.substring(2).split(' ')
                let vertex = new Vec4(
                    Number(coord[0]),
                    Number(coord[1]),
                    Number(coord[2]),
                    1
                )
                m.vertices.push(vertex)
            }
            if (str.startsWith('f ')) {
                let face = new Face()
                let faceVertex = str.substring(2).split(' ')
                faceVertex.forEach((vertex) => {
                    let vec3 = vertex.split('/')
                    face.vertices.push(new Vec3(
                        Number(vec3[0]),
                        Number(vec3[1]),
                        Number(vec3[2])
                    ))
                })
                m.faces.push(face)
            }
        })
        return m
    }
}

export class Context {
    static clearBackground = (
        ctx: CanvasRenderingContext2D,
        color: Vec4
    ) => {
        ctx.fillStyle = `rgba(${color.x}, ${color.y}, ${color.z}, ${color.w})`
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    }
    static drawLine = (
        ctx: CanvasRenderingContext2D,
        x1: number,
        y1: number,
        x2: number,
        y2: number
    ) => {
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
    }
    static drawFace = (
        ctx: CanvasRenderingContext2D,
        vertices: Array<Vec4>,
        face: Face
    ) => {
        if (face.vertices.length === 3) {
            let v1 = vertices[face.vertices[0].x - 1]
            let v2 = vertices[face.vertices[1].x - 1]
            let v3 = vertices[face.vertices[2].x - 1]
            this.drawTriangle(ctx, v1, v2, v3)
        } else if (face.vertices.length === 4) {
            let v1 = vertices[face.vertices[0].x - 1]
            let v2 = vertices[face.vertices[1].x - 1]
            let v3 = vertices[face.vertices[2].x - 1]
            let v4 = vertices[face.vertices[3].x - 1]
            this.drawTriangle(ctx, v1, v2, v3)
            this.drawTriangle(ctx, v3, v1, v4)
        }
    }
    static isContainedInTriangle = (
        v1: Vec4,
        v2: Vec4,
        v3: Vec4,
        v: Vec4
    ) => {
        let v12 = new Vec3(v2.x - v1.x, v2.y - v1.y, v2.z - v1.z)
        let v23 = new Vec3(v3.x - v2.x, v3.y - v2.y, v3.z - v2.z)
        let v31 = new Vec3(v1.x - v3.x, v1.y - v3.y, v1.z - v3.z)
        let v1p = new Vec3(v.x - v1.x, v.y - v1.y, v.z - v1.z)
        let v2p = new Vec3(v.x - v2.x, v.y - v2.y, v.z - v2.z)
        let v3p = new Vec3(v.x - v3.x, v.y - v3.y, v.z - v3.z)
        let c1 = Vec3.cross(v12, v1p)
        let c2 = Vec3.cross(v23, v2p)
        let c3 = Vec3.cross(v31, v3p)
        return (c1.z > 0 && c2.z > 0 && c3.z > 0) || (c1.z < 0 && c2.z < 0 && c3.z < 0)
    }
    static drawTriangle = (
        ctx: CanvasRenderingContext2D,
        v1: Vec4,
        v2: Vec4,
        v3: Vec4
    ) => {
        let width = ctx.canvas.width
        let height = ctx.canvas.height
        let x1 = v1.x + width / 2
        let y1 = v1.y + height / 2
        let x2 = v2.x + width / 2
        let y2 = v2.y + height / 2
        let x3 = v3.x + width / 2
        let y3 = v3.y + height / 2
        this.drawLine(ctx, x1, height - y1, x2, height - y2)
        this.drawLine(ctx, x2, height - y2, x3, height - y3)
        this.drawLine(ctx, x3, height - y3, x1, height - y1)
    }
}