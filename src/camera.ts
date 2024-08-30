import { Matrix4, Vec3, Vec4 } from "./math";

export class Camera {
    position: Vec4 = new Vec4()
    gaze: Vec3 = new Vec3(0, 0, -1)     //-z
    up: Vec3 = new Vec3(0, 1, 0)       //y
    near: number = 100
    far: number = 500
    viewportMatrix = (): Matrix4 => {
        let up = this.up
        let gaze = this.gaze
        let pos = this.position
        let gazeCrossUp = Vec3.cross(gaze, up)
        let forwardRotationMatrix = new Matrix4([
            [gazeCrossUp.x, up.x, -gaze.x, 0],
            [gazeCrossUp.y, up.y, -gaze.y, 0],
            [gazeCrossUp.z, up.z, -gaze.z, 0],
            [0, 0, 0, 1],
        ])
        let inverseMatrix = Matrix4.transpose(forwardRotationMatrix)
        return Matrix4.multiplyMat(inverseMatrix, new Matrix4([
            [1, 0, 0, -pos.x],
            [0, 1, 0, -pos.y],
            [0, 0, 1, -pos.z],
            [0, 0, 0, 1]
        ]))
    }
    perspectiveMatrix = (): Matrix4 => {
        let f = this.far
        let n = this.near
        return new Matrix4([
            [n, 0, 0, 0],
            [0, n, 0, 0],
            [0, 0, n + f, -n * f],
            [0, 0, 0, 1]
        ])
    }
    orthogonalMatrix = () => {
        return new Matrix4([
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 1],
        ])
    }
}
