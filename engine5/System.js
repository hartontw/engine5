/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function op(...params)
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
}
