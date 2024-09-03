export class Vec2 {
    x: number
    y: number
    variableList = ['x', 'y']
    length = (): number => {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
    normal = (): Vec2 => {
        let length = this.length()
        return new Vec2(
            this.x / length,
            this.y / length
        )
    }
    constructor(x: number = 0, y: number = 0) {
        this.x = x
        this.y = y
    }
    static add(v1: Vec2, v2: Vec2): Vec2 {
        return new Vec2(
            v1.x + v2.x,
            v1.y + v2.y,
        )
    }
    static minus(v1: Vec2, v2: Vec2): Vec2 {
        return new Vec2(
            v1.x - v2.x,
            v1.y - v2.y,
        )
    }
    static dot(v1: Vec2, v2: Vec2): number {
        return v1.x * v2.x + v1.y * v2.y
    }
}

export class Vec3 {
    x: number
    y: number
    z: number
    length = (): number => {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    }
    normal = (): Vec3 => {
        let length = this.length()
        return new Vec3(
            this.x / length,
            this.y / length,
            this.z / length
        )
    }
    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x
        this.y = y
        this.z = z
    }
    static add(v1: Vec3, v2: Vec3): Vec3 {
        return new Vec3(
            v1.x + v2.x,
            v1.y + v2.y,
            v1.z + v2.z
        )
    }
    static minus(v1: Vec3, v2: Vec3): Vec3 {
        return new Vec3(
            v1.x - v2.x,
            v1.y - v2.y,
            v1.z - v2.z
        )
    }
    static dot(v1: Vec3, v2: Vec3): number {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z
    }
    static cross(v1: Vec3, v2: Vec3): Vec3 {
        return new Vec3(
            v1.y * v2.z - v2.y * v1.z,
            v2.x * v1.z - v1.x * v2.z,
            v1.x * v2.y - v2.x * v1.y
        )
    }
}

export class Vec4 {
    x: number = 0
    y: number = 0
    z: number = 0
    w: number = 0
    length = (): number => {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
    }
    normal = (): Vec4 => {
        let length = this.length()
        return new Vec4(
            this.x / length,
            this.y / length,
            this.z / length,
            this.w / length
        )
    }
    constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
        this.x = x
        this.y = y
        this.z = z
        this.w = w
    }
    static add(v1: Vec4, v2: Vec4): Vec4 {
        return new Vec4(
            v1.x + v2.x,
            v1.y + v2.y,
            v1.z + v2.z,
            v1.w + v2.w
        )
    }
    static minus(v1: Vec4, v2: Vec4): Vec4 {
        return new Vec4(
            v1.x - v2.x,
            v1.y - v2.y,
            v1.z - v2.z,
            v1.w - v2.w
        )
    }
    static dot(v1: Vec4, v2: Vec4): number {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z + v1.w * v2.w
    }
}

export class Matrix2 {
    mat: Array<Array<number>>
    constructor(
        mat: Array<Array<number>> = [
            [0, 0],
            [0, 0]
        ]
    ) {
        this.mat = mat
    }
    get = (i: number, j: number): number => {
        return this.mat[i][j]
    }
    set = (i: number, j: number, v: number): void => {
        this.mat[i][j] = v
    }
    static transpose(mat: Matrix2): Matrix2 {
        let m = new Matrix2()
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                m.set(i, j, mat.get(j, i))
            }
        }
        return m
    }
    static multiplyMat(m1: Matrix2, m2: Matrix2): Matrix2 {
        return new Matrix2([
            [
                m1.get(0, 0) * m2.get(0, 0) + m1.get(0, 1) * m2.get(1, 0),
                m1.get(0, 0) * m2.get(0, 1) + m1.get(0, 1) * m2.get(1, 1)
            ],
            [
                m1.get(1, 0) * m2.get(0, 0) + m1.get(1, 1) * m2.get(1, 0),
                m1.get(1, 0) * m2.get(0, 1) + m1.get(1, 1) * m2.get(1, 1)
            ]
        ])
    }
    static multiplyVec(mat: Matrix2, vec: Vec2): Vec2 {
        return new Vec2(
            mat.get(0, 0) * vec.x + mat.get(0, 1) * vec.y,
            mat.get(1, 0) * vec.x + mat.get(1, 1) * vec.y
        )
    }
}

export class Matrix3 {
    mat: Array<Array<number>>
    constructor(
        mat: Array<Array<number>> = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]
    ) {
        this.mat = mat
    }
    get = (i: number, j: number): number => {
        return this.mat[i][j]
    }
    set = (i: number, j: number, v: number): void => {
        this.mat[i][j] = v
    }
    static transpose(mat: Matrix3): Matrix3 {
        let m = new Matrix3()
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                m.set(i, j, mat.get(j, i))
            }
        }
        return m
    }
    static multiplyMat(m1: Matrix3, m2: Matrix3): Matrix3 {
        return new Matrix3([
            [
                m1.get(0, 0) * m2.get(0, 0) + m1.get(0, 1) * m2.get(1, 0) + m1.get(0, 2) * m2.get(2, 0),
                m1.get(0, 0) * m2.get(0, 1) + m1.get(0, 1) * m2.get(1, 1) + m1.get(0, 2) * m2.get(2, 1),
                m1.get(0, 0) * m2.get(0, 2) + m1.get(0, 1) * m2.get(1, 2) + m1.get(0, 2) * m2.get(3, 2),
            ],
            [
                m1.get(1, 0) * m2.get(0, 0) + m1.get(1, 1) * m2.get(1, 0) + m1.get(1, 2) * m2.get(2, 0),
                m1.get(1, 0) * m2.get(0, 1) + m1.get(1, 1) * m2.get(1, 1) + m1.get(1, 2) * m2.get(2, 1),
                m1.get(1, 0) * m2.get(0, 2) + m1.get(1, 1) * m2.get(1, 2) + m1.get(1, 2) * m2.get(3, 2),],
            [
                m1.get(2, 0) * m2.get(0, 0) + m1.get(2, 1) * m2.get(1, 0) + m1.get(2, 2) * m2.get(2, 0),
                m1.get(2, 0) * m2.get(0, 1) + m1.get(2, 1) * m2.get(1, 1) + m1.get(2, 2) * m2.get(2, 1),
                m1.get(2, 0) * m2.get(0, 2) + m1.get(2, 1) * m2.get(1, 2) + m1.get(2, 2) * m2.get(3, 2),
            ]
        ])
    }
    static multiplyVec(mat: Matrix3, vec: Vec3): Vec3 {
        return new Vec3(
            mat.get(0, 0) * vec.x + mat.get(0, 1) * vec.y + mat.get(0, 2) * vec.z,
            mat.get(1, 0) * vec.x + mat.get(1, 1) * vec.y + mat.get(1, 2) * vec.z,
            mat.get(2, 0) * vec.x + mat.get(2, 1) * vec.y + mat.get(2, 2) * vec.z,
        )
    }
}

export class Matrix4 {
    mat: Array<Array<number>>
    constructor(
        mat: Array<Array<number>> = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    ) {
        this.mat = mat
    }
    get = (i: number, j: number): number => {
        return this.mat[i][j]
    }
    set = (i: number, j: number, v: number): void => {
        this.mat[i][j] = v
    }
    static transpose(mat: Matrix4): Matrix4 {
        let m = new Matrix4()
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                m.set(i, j, mat.get(j, i))
            }
        }
        return m
    }
    static multiplyMat(m1: Matrix4, m2: Matrix4): Matrix4 {
        return new Matrix4([
            [
                m1.get(0, 0) * m2.get(0, 0) + m1.get(0, 1) * m2.get(1, 0) + m1.get(0, 2) * m2.get(2, 0) + m1.get(0, 3) * m2.get(3, 0),
                m1.get(0, 0) * m2.get(0, 1) + m1.get(0, 1) * m2.get(1, 1) + m1.get(0, 2) * m2.get(2, 1) + m1.get(0, 3) * m2.get(3, 1),
                m1.get(0, 0) * m2.get(0, 2) + m1.get(0, 1) * m2.get(1, 2) + m1.get(0, 2) * m2.get(2, 2) + m1.get(0, 3) * m2.get(3, 2),
                m1.get(0, 0) * m2.get(0, 3) + m1.get(0, 1) * m2.get(1, 3) + m1.get(0, 2) * m2.get(2, 3) + m1.get(0, 3) * m2.get(3, 3),
            ],
            [
                m1.get(1, 0) * m2.get(0, 0) + m1.get(1, 1) * m2.get(1, 0) + m1.get(1, 2) * m2.get(2, 0) + m1.get(1, 3) * m2.get(3, 0),
                m1.get(1, 0) * m2.get(0, 1) + m1.get(1, 1) * m2.get(1, 1) + m1.get(1, 2) * m2.get(2, 1) + m1.get(1, 3) * m2.get(3, 1),
                m1.get(1, 0) * m2.get(0, 2) + m1.get(1, 1) * m2.get(1, 2) + m1.get(1, 2) * m2.get(2, 2) + m1.get(1, 3) * m2.get(3, 2),
                m1.get(1, 0) * m2.get(0, 3) + m1.get(1, 1) * m2.get(1, 3) + m1.get(1, 2) * m2.get(2, 3) + m1.get(1, 3) * m2.get(3, 3),
            ],
            [
                m1.get(2, 0) * m2.get(0, 0) + m1.get(2, 1) * m2.get(1, 0) + m1.get(2, 2) * m2.get(2, 0) + m1.get(2, 3) * m2.get(3, 0),
                m1.get(2, 0) * m2.get(0, 1) + m1.get(2, 1) * m2.get(1, 1) + m1.get(2, 2) * m2.get(2, 1) + m1.get(2, 3) * m2.get(3, 1),
                m1.get(2, 0) * m2.get(0, 2) + m1.get(2, 1) * m2.get(1, 2) + m1.get(2, 2) * m2.get(2, 2) + m1.get(2, 3) * m2.get(3, 2),
                m1.get(2, 0) * m2.get(0, 3) + m1.get(2, 1) * m2.get(1, 3) + m1.get(2, 2) * m2.get(2, 3) + m1.get(2, 3) * m2.get(3, 3),
            ],
            [
                m1.get(3, 0) * m2.get(0, 0) + m1.get(3, 1) * m2.get(1, 0) + m1.get(3, 2) * m2.get(2, 0) + m1.get(3, 3) * m2.get(3, 0),
                m1.get(3, 0) * m2.get(0, 1) + m1.get(3, 1) * m2.get(1, 1) + m1.get(3, 2) * m2.get(2, 1) + m1.get(3, 3) * m2.get(3, 1),
                m1.get(3, 0) * m2.get(0, 2) + m1.get(3, 1) * m2.get(1, 2) + m1.get(3, 2) * m2.get(2, 2) + m1.get(3, 3) * m2.get(3, 2),
                m1.get(3, 0) * m2.get(0, 3) + m1.get(3, 1) * m2.get(1, 3) + m1.get(3, 2) * m2.get(2, 3) + m1.get(3, 3) * m2.get(3, 3),
            ],
        ])
    }
    static multiplyVec(mat: Matrix4, vec: Vec4): Vec4 {
        return new Vec4(
            mat.get(0, 0) * vec.x + mat.get(0, 1) * vec.y + mat.get(0, 2) * vec.z + mat.get(0, 3) * vec.w,
            mat.get(1, 0) * vec.x + mat.get(1, 1) * vec.y + mat.get(1, 2) * vec.z + mat.get(1, 3) * vec.w,
            mat.get(2, 0) * vec.x + mat.get(2, 1) * vec.y + mat.get(2, 2) * vec.z + mat.get(2, 3) * vec.w,
            mat.get(3, 0) * vec.x + mat.get(3, 1) * vec.y + mat.get(3, 2) * vec.z + mat.get(3, 3) * vec.w,
        )
    }
}

export function linearInterpolation(x: number, y: number, a: number, b: number, v: number) : number {
    return a + v * (b - a) / (y - x)
}

export function distance(p1: Vec4, p2: Vec4) : number {
    let x = p2.x - p1.x
    let y = p2.y - p1.y
    let z = p2.z - p1.z
    let w = p2.w - p1.w
    return Math.sqrt(x * x + y * y + z * z + w * w)
}
