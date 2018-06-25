Math.roundTo = function(value, precision) {
	precision = Math.pow(10, precision);
	return Math.round(value*precision) / precision;
};function op(...params)
{
    if (params.length < 3 || params.length % 2 === 0)
        throw new Error("Wrong number of arguments.");
        
    let r = params[0];
    let o = params[1];
    for(let i = 2; i < params.length; i++)
    {
        if (i % 2 === 0)
        {
            if (Array.isArray(params[i]))
                params[i] = op(...params[i]);
            
            let tr = r instanceof Class;
            let tp = params[i] instanceof Class;
            
            switch(o)
            {
                case '+': 
                    if (tr)
                        r = r.add(params[i]);
                    else if (tp)
                        r = params[i].add(r);
                    else
                        r = r + params[i];
                    break;
                    
                    
                case '-': 
                    if (tr)
                        r = r.sub(params[i]);
                    else if (tp)
                        r = params[i].add(-r);
                    else
                        r = r - params[i];
                    break;
                
                
                case '*': 
                    if (tr)
                        r = r.mul(params[i]);
                    else if (tp)
                        r = params[i].mul(r);
                    else
                        r = r * params[i];
                    break;
                
                
                case '/':
                    if (tr)
                        r = r.sub(params[i]);
                    else if (tp)
                        r = params[i].mul(1/r);
                    else
                        r = r / params[i];
                    break;
                    
                case '%': 
                    if (tr)
                        r = r.mod(params[i]);
                    else if (tp)
                        throw new Error("Method 'mod()' is not implemented.");
                    else
                        r = r % params[i];
                    break;
                
                default: throw new Error("Wrong operator.");
            }
        }
        else o = params[i];
    }
    
    return r;
}class Class
{
    add(other)
    {
        throw new Error("Method 'add()' is not implemented.");
    }

    sub(other)
    {
        throw new Error("Method 'sub()' is not implemented.");
    }

    mul(other)
    {
        throw new Error("Method 'mul()' is not implemented.");
    }

    div(other)
    {
        throw new Error("Method 'div()' is not implemented.");
    }

    mod(other)
    {
        throw new Error("Method 'mod()' is not implemented.");
    }

    eq(other)
    {
        return this == other;
    }

    seq(other)
    {
        return this === other;
    }

    uneq(other)
    {
        return this != other;
    }

    suneq(other)
    {
        return this !== other;
    }
}class Struct extends Class
{
    eq(other)
    {
        for(property in this)
        {
            if (!other.hasOwnProperty(property) || this[property] !== other[property])
                return false;
        }

        return true;
    }

    seq(other)
    {
        if (typeof other !== typeof this) return false;

        for(property in this)
        {
            if (this[property] !== other[property])
                return false;
        }

        return true;
    }

    uneq(other)
    {
        return !this.eq(other);
    }

    suneq(other)
    {
        return !this.seq(other);
    }
}class Vector extends Struct
{
    constructor(x = 0, y = 0)
    {
        super();
        this.x = x;
        this.y = y;
    }

    get sqrMagnitude()
    {
        return this.x*this.x + this.y*this.y;
    }

    get magnitude()
    {
        return Math.sqrt(this.sqrMagnitude);
    }

    get normalized()
    {
        const m = this.magnitude;
        return new Vector(this.x / m, this.y / m);
    }

    toString()
    {
        return "X: " + this.x.toFixed(4) + ", Y: " + this.y.toFixed(4);
    }

    add(other)
    {
        const ox = other.hasOwnProperty('x') ? other.x : 0;
        const oy = other.hasOwnProperty('y') ? other.y : 0;

        return new Vector(this.x+ox, this.y+oy);
    }

    sub(other)
    {
        const ox = other.hasOwnProperty('x') ? other.x : 0;
        const oy = other.hasOwnProperty('y') ? other.y : 0;

        return new Vector(this.x-ox, this.y-oy);
    }

    mul(other)
    {
        if (typeof other === 'number')
            return new Vector(this.x*other, this.y*other);

        return super.mul(other);
    }

    div(other)
    {
        if (typeof other === 'number')
            return new Vector(this.x/other, this.y/other);

        return super.mul(other);
    }

    static get zero() { return new Vector(0, 0); }
    static get right() { return new Vector(1, 0); }
    static get up() { return new Vector(0, 1); }
    static get left() { return new Vector(-1, 0); }
    static get down() { return new Vector(0, -1); }
    static get one() { return new Vector(1, 1); }

    static Dot(v1, v2)
    {
        return v1.x * v2.x + v1.y * v2.y;
    }

    static Cross(v1, v2)
    {
        return v1.x * v2.x - v1.y * v2.y;
    }

    static Distance(v1, v2)
    {
        return v2.sub(v1).magnitude;
    }

    static Angle(v1, v2)
    {
        const cos = Vector.Dot(v1, v2) / (v1.magnitude * v2.magnitude);
        return Math.acos(cos) * (180 / Math.PI);
    }

    static SignedAngle(v1, v2)
    {
        return (Math.atan2(v2.y, v2.x) - Math.atan2(v1.y, v1.x)) * (180 / Math.PI);
    }

    static LerpUnclamped(v1, v2, t)
    {
        return v1.add((v2.sub(v1)).mul(t));
    }

    static Lerp(v1, v2, t)
    {
        t = Math.min(0, Math.max(1, t));
        return LerpUnclamped(v1, v2, t);
    }

    static Rotate(v, angle)
    {
        const alpha = Math.acos(v.x / v.magnitude);
        const beta = angle * (Math.PI / 180);
        const L = v.magnitude;
        const rx = L * Math.cos(alpha+beta);
        const ry = L * Math.sin(alpha+beta);
        return new Vector(rx, ry);
    }

    static Reflect(v, normal)
    {
        normal = normal.normalized;
        const dot = Vector.Dot(v, normal);
        return v.sub(normal.mul(2 * dot));
    }
}class Angle extends Struct
{	
    constructor(value = 0, type='deg')
    {
        this._deg = 0;
        this._rad = 0;

        if (type.toLowerCase().includes('deg'))
        {
            this._deg = value;
            this._rad = Angle.ToRadians(value);
        }
        else
        {
            this._rad = value;
            this._deg = Angle.ToDegrees(value);
        }
    }

    valueOf() { return this._deg; }

    toString() { return this._deg + "º"; }

    get deg() { return this._deg; }
    get degrees() { return this._deg; }
    get rad() { return this._rad; }
    get radians() { return this._rad; }

    set deg(value)
{
        this._deg = value;
        this._rad = Angle.ToRadians(value);
    }

    set degrees(value)
    {
        this._deg = value;
        this._rad = Angle.ToRadians(value);
    }

    set rad(value)
    {
        this._rad = value;
        this._deg = Angle.ToDegrees(value);
    }

    set radians(value)
    {
        this._rad = value;
        this._deg = Angle.ToDegrees(value);
    }

    get cos() { return Math.cos(this._rad); }
    get cosh() { return Math.cosh(this._rad); }

    get sin() { return Math.sin(this._rad); }
    get sinh() { return Math.sinh(this._rad); }

    get tan() { return Math.tan(this._rad); }
    get tanh() { return Math.tanh(this._rad); }

    get clamped() 
    { 
        var deg = this._deg % 360;

        if (deg < 0)
                deg += 360;

        return new Angle(deg);
    }

    get revolutions()
    {
        return this._deg / 360;
    }

    get fullRevolutions()
    {
        return Math.floor(this.revolutions);
    }

    static get right() { return new Angle(0); }
    static get up() { return new Angle(90); }
    static get left() { return new Angle(180); }
    static get down() { return new Angle(270); }

    static ToRadians(value)
    {
        return value * (Math.PI / 180);
    }

    static ToDegrees(value)
    {
        return value * (180 / Math.PI);
    }
}