/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Drawings
{
    static Sprite(sprite)
    {
        if (sprite.loaded)
            sprite.context.drawImage(sprite.image, sprite.x, sprite.y, sprite.width, sprite.height);
        else
            Drawings.Rectangle(sprite.context, sprite.x, sprite.y, sprite.width, sprite.height);
    }
    
    static Rectangle(ctx, x, y, width, height)
    {
        x -= width*0.5;
        y -= height*0.5;
        
        ctx.moveTo(x, y);
        ctx.lineTo(x+width, y);
        ctx.lineTo(x+width, y+height);
        ctx.lineTo(x, y+height);
        ctx.lineTo(x, y);
        ctx.stroke();
    }

    static Square(ctx, x, y, size)
    {
        Drawings.Rectanlge(ctx, x, y, size, size);
    }
}