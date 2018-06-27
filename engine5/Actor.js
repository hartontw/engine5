
/* global Vector, Angle */

class Actor extends Class
{
    constructor(name = 'Actor', position = Vector.zero, rotation = Angle.right, tag = 'None')
    {
        super();
        
        this.name = name;
        this.position = position;
        this._rotation = Angle.Get(rotation);
        this.tag = tag;

        this._canvas = null;
        this._components = [];
    }
    
    get canvas() { return this._canvas; }
    set canvas(value) { value.AddActor(this); }
    get context() { return this._canvas.context; }
    
    get rotation() { return this._rotation; }
    set rotation(value) { this._rotation = Angle.Get(rotation); }
    
    get x() { return this.position.x; }
    set x(value) { this.position.x = value; }
    
    get y() { return this.position.y; }
    set y(value) { this.position.y = value; }
    
    get depth() { return this.canvas.GetDepth(this); }
    set depth(value) { this.canvas.SetDepth(this, value); }
    
    ToFront() { this.canvas.SetDepth(this); }
    ToBack() { this.canvas.SetDepth(this, 0); }
    
    Closer(value) { this.depth = this.depth - undef(value, 1); }
    Further(value) { this.depth = this.depth + undef(value, 1); }
    
    _Update()
    {
        for(let i = 0; i < this._components.length; i++)
            this._components[i]._Update();
        
        this.Update();
    }
    
    Update(){}
    
    AddComponent(componentName, ...params)
    {
        var component = Component.GetComponentByName(this, componentName, ...params);
        
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
