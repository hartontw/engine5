class Class
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
}