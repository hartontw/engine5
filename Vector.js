
class Vector extends Struct
{
	constructor(x = 0, y = 0)
	{
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
		const ox = other.hasOwnProperty(x) ? other.x : 0;
		const oy = other.hasOwnProperty(y) ? other.y : 0;
		
		return new Vector(this.x+ox, this.y+oy);
	}
	
	sub(other)
	{
		const ox = other.hasOwnProperty(x) ? other.x : 0;
		const oy = other.hasOwnProperty(y) ? other.y : 0;
		
		return new Vector(this.x-ox, this.y-oy);
	}
	
	mul(other)
	{
		if (typeof other == 'number')
			return new Vector(this.x*other, this.y*other);
		
		return super.mul(other);
	}
	
	div(other)
	{
		if (typeof other == 'number')
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
		return new Vector(rx, ty);
	}
}