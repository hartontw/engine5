/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Random
{
    static get value() { return Math.random(); }
    static get vector(){ return new Vector(Random.value, Random.value).normalized; }
    static get angle() { return new Angle(Random.value * 360); }
    
    static Real(min, max)
    {
        if (typeof max === 'undefined')
        {
            const temp = min;
            min = 0;
            max = temp;
        }
        return Random.value * (max-min) + min;
    }
    
    static Integer(min, max, inclusive = false)
    {
        if (typeof max === 'undefined')
        {
            const temp = min;
            min = 0;
            max = temp;
        }
        
        min = Math.floor(min);
        max = Math.ceil(max);
        
        const i = inclusive ? 1 : 0;
        
        return Math.floor(Random.value * (max-min+i) + min);
    }
    
    static Index(length)
    {
        return Math.floor(Random.value * length);
    }
}
