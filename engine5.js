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
}class Random
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
}let count = 0;

class Canvas
{    
    constructor(parent, width, height, id='', name='engine5 Canvas', cssClass='engine5')
    {
        this._parent = parent;

        this._canvas = document.createElement("canvas");
        this._canvas.width = width;
        this._canvas.height = height;
        this._canvas.id = id === '' ? 'e5_'+count++ : id;
        this._canvas.name = name;
        this._canvas.class = cssClass;
        
        this._context = this._canvas.getContext("2d");
       
        document.body.insertBefore(this._canvas, parent);
        
        this._interval;
        
        this._canvasStart = new Date();
        this._gameStart;
        this._lastUpdate;
        this._time = 0;
        this.timeScale = 1;
        this._frequency = 20;
        
        this.assetsPath = './assets/';
        
        this._actors = [];
    }
    
    get id() { return this._canvas.id; }
    get name() { return this._canvas.name; }
    get cssClass() { return this._canvas.class; }
    get width() { return this._canvas.width; }
    get height() { return this._canvas.height; }
    
    get context() { return this._context; }
    
    get time() { return this._time; }
    get deltaTime() 
    { 
        const delta = new Date().getTime() - this._lastUpdate.getTime();
        return delta / this.timeScale / 1000;
    }
    
    get frequency() { return this._frequency; }
    set frequency(value)
    {
        this._frequency = value;
        this.Stop();
        this._Start();
    }
    
    get fps() { return 1000 / this._frequency; }
    set fps(value) 
    { 
        this._frequency = 1 / value;
        this.Stop();
        this._Start();
    }
    
    Start(frequency = 20)
    {
        if (this.interval !== null)
        {
            this.Stop();
            this.Clear();
        }
            
        this._gameStart = new Date();
        this._lastUpdate = new Date();
        this._frequency = frequency;
        this._Start();
    }
    
    _Start()
    {
        var me = this;
        this._interval = setInterval(function(){me.Update();}, this._frequency);        
    }
    
    Clear()
    {
        this._context.clearRect(0, 0, this.width, this.height);
    }
    
    Update()
    {
        this.Clear();
        
        this._time += this.deltaTime;

        for (let i = 0; i < this._actors.length; i++)
            this._actors[i].Update();
        
        this._lastUpdate = new Date();
    }
    
    Stop()
    {
        clearInterval(this._interval);
        this._interval = null;
    }
    
    AddActor(position = Vector.zero, rotation = Angle.right, name = 'Actor')
    {
        var actor = new Actor(this, position, rotation, name);
        this._actors.push(actor);
        return actor;
    }
    
    DestroyActor(actor)
    {
        let index = this._actors.indexOf(actor);
        if (index > -1) 
            this._components.splice(index, 1);            
        
        
    }
    
    get defaultSpritePath() { return 'default/sprite.png'; }
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
}class Component extends Class
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
}class Actor extends Class
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
    constructor(value = 0, type = 'deg')
    {
        super();
        
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
    
    static Deg(value) { return new Angle(value, 'deg'); }
    static Degrees(value) { return new Angle(value, 'deg'); }
    static Rad(value) { return new Angle(value, 'rad'); }
    static Radians(value) { return new Angle(value, 'rad'); }

    static ToRadians(value) { return value * (Math.PI / 180); }
    static ToDegrees(value) { return value * (180 / Math.PI); }
}class Sprite extends Component
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