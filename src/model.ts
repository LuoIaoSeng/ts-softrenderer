import { Matrix4, Vec3, Vec4 } from "./math";

export class Face {
    vertices: Array<Vec3> = new Array()
}

export class Mesh {
    vertices: Array<Vec4> = new Array()
    faces: Array<Face> = new Array()
    applyMatrix = (matrix: Matrix4) => {
        this.vertices = this.vertices.map((vert)=> {
            return Matrix4.multiplyVec(matrix, vert)
        })
    }
    rotateX = (deg: number) => {
        this.applyMatrix(new Matrix4([
            [1, 0, 0, 0],
            [0, Math.cos(deg), -Math.sin(deg), 0],
            [0, Math.sin(deg), Math.cos(deg), 0],
            [0, 0, 0, 1],
        ]))
    }
    rotateY = (deg: number) => {
        this.applyMatrix(new Matrix4([
            [Math.cos(deg), 0, -Math.sin(deg), 0],
            [0, 1, 0, 0],
            [Math.sin(deg), 0, Math.cos(deg), 0],
            [0, 0, 0, 1],
        ]))
    }
    rotateZ = (deg: number) => {
        this.applyMatrix(new Matrix4([
            [Math.cos(deg), -Math.sin(deg), 0, 0],
            [Math.sin(deg), Math.cos(deg), 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
        ]))
    }
}
