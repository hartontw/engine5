
class Angle extends Struct
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
    
    static Get(value) { return isNumber(value) ? new Angle(value) : value; }
}