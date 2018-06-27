/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Renderer extends Component
{
    constructor(actor)
    {
        super(actor);
    }
    
    get canvas() { return this.actor.canvas; }
    get context() { return this.canvas.context; }
    
    get depth() { return this.actor.depth; }
    set depth(value) { this.actor.depth = value; }
    
    ToFront() { this.actor.ToFront(); }
    ToBack() { this.actor.ToBack(); }
    
    Closer(value) { this.actor.Closer(value); }
    Further(value) { this.actor.Further(value); }
}