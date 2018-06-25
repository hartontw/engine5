/* global property */

class Struct extends Class
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
}