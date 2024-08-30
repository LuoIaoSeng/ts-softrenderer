import { Matrix4, Vec3, Vec4 } from "./math";

export class Face {
    vertices: Array<Vec3> = new Array()
}

export class Mesh {
    vertices: Array<Vec4> = new Array()
    faces: Array<Face> = new Array()
    applyMatrix = (matrix: Matrix4) => {
        this.vertices = this.vertices.map((vert) => {
            return Matrix4.multiplyVec(matrix, vert)
        })
    }
    transform = (x: number, y: number, z: number) => {
        this.applyMatrix(new Matrix4([
            [1, 0, 0, x],
            [0, 1, 0, y],
            [0, 0, 1, z],
            [0, 0, 0, 1],
        ]))
    }
    rotate = (x: number, y: number, z: number) => {
        this.applyMatrix(Mesh.rotationXMatrix(x))
        this.applyMatrix(Mesh.rotationYMatrix(y))
        this.applyMatrix(Mesh.rotationZMatrix(z))
    }
    static rotationXMatrix = (deg: number): Matrix4 => {
        return new Matrix4([
            [1, 0, 0, 0],
            [0, Math.cos(deg), -Math.sin(deg), 0],
            [0, Math.sin(deg), Math.cos(deg), 0],
            [0, 0, 0, 1],
        ])
    }
    static rotationYMatrix = (deg: number): Matrix4 => {
        return new Matrix4([
            [Math.cos(deg), 0, -Math.sin(deg), 0],
            [0, 1, 0, 0],
            [Math.sin(deg), 0, Math.cos(deg), 0],
            [0, 0, 0, 1],
        ])
    }
    static rotationZMatrix = (deg: number): Matrix4 => {
        return new Matrix4([
            [Math.cos(deg), -Math.sin(deg), 0, 0],
            [Math.sin(deg), Math.cos(deg), 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
        ])
    }
}
