/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Sprite extends Renderer
{    
    constructor(actor, src, width, height)
    {
        super(actor);
        
        this.width = width;
        this.height = height;
        this._image = null;
        
        this.SetImage(src);
    }
    
    get image() { return this._image; }
    SetImage(src, reset = true)
    {
        src = undef(src, this.canvas.defaultSpritePath);

        this._image = new Image();
        this._image.src = this.canvas.assetsPath + src;

        this._image.loaded = false;
        
        let me = this;
        this._image.onload = function()
        {
            me._image.loaded = true;
            if (reset) me.ResetSize();
        };
    }
    
    get loaded() { return this._image.loaded; }
    
    ResetSize()
    {
        this.width = this.image.width;
        this.height = this.image.height;
    }
    
    _Update()
    {
        Drawings.Sprite(this);
    }
}