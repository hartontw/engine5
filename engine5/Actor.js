
/* global Vector, Angle */

class Actor extends Class
{
    constructor(canvas, position = Vector.zero, rotation = Angle.right, name = 'Actor')
    {
        super();
        
        this._canvas = canvas;
        this.position = position;
        this._rotation = typeof rotation === 'number' ? new Angle(rotation) : rotation;
        this.name = name;
                
        this._components = [];
    }
    
    get canvas() { return this._canvas; }    
    get context() { return this._canvas.context; }
    
    get rotation() { return this._rotation; }
    set rotation(value) { this._rotation = typeof value === 'number' ? new Angle(value) : rotation; }
    
    get x() { return this.position.x; }
    set x(value) { this.position.x = value; }
    
    get y() { return this.position.y; }
    set y(value) { this.position.y = value; }
    
    Update()
    {
        for(let i = 0; i < this._components.length; i++)
            this._components[i].Update();
        
        this.position = this.position.add(Vector.one.mul(this.canvas.deltaTime*2));
    }
    
    AddComponent(componentName)
    {
        var component = Component.GetComponentByName(componentName, this);
        
        if (!this._components.includes(component))
            this._components.push(component);
        
        return component;
    }
    
    RemoveComponent(component)
    {
        let index = this._components.indexOf(component);
        if (index > -1) this._components.splice(index, 1);
    }
}
