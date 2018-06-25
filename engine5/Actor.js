
/* global Vector, Angle */

class Actor extends Object
{
    constructor(scene, position = Vector.zero, rotation = Angle.right, name = "Actor")
    {
        this._scene = scene;
        this.x = position.x;
        this.y = position.y;
        this._rotation = typeof rotation === 'number' ? new Angle(rotation) : rotation;
        this.name = name;       
    }

    get scene() { return _scene; }
}
