/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Sprite extends Component
{    
    constructor(parent)
    {
        super(parent);
        this.width = 0;
        this.height = 0;
        this._image = null;
        this.setImage();
    }
    
    get image() { return this._image; }
    setImage(src, reset = true)
    {
        if (typeof src === 'undefined')
            src = this.canvas.defaultSpritePath;
        
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
    
    ResetSize()
    {       
        this.width = this.image.width;
        this.height = this.image.height;
    }
    
    Update()
    {
        if (this.image !== null && this.image.loaded)
            this.canvas.context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}