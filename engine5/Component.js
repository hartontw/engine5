/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Component extends Class
{
    constructor(actor)
    {
        super();
        this._actor = actor;
    }
    
    get actor() { return this._actor; }
    get canvas() { return this._actor.canvas; }
    
    get position() { return this._actor.position; }
    set position(value) { this._actor.position = value; }
    
    get rotation() { return this._actor.rotation; }
    set rotation(value) { this._actor.rotation = value; }
    
    get x() { return this._actor.x; }
    set x(value) { this._actor.x = value; }
    
    get y() { return this._actor.y; }
    set y(value) { return this._actor.y = value; }
    
    
    Update()
    {
        
    }
    
    static get Sprite() { return "Sprite"; };
        
    static GetComponentByName(name, parent)
    {
        switch(name)
        {
            case Component.Sprite:
                return new Sprite(parent);
            
            default:
                throw new Error("Wrong Component Name.");
        }
    }
}