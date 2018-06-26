/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

let count = 0;

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
        
        //delete actor;
    }
    
    get defaultSpritePath() { return 'default/sprite.png'; }
}