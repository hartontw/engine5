
let parent = document.body.childNodes[0];

let canvas = new Canvas(parent, 512, 512);
let actor = canvas.AddActor();
let sprite = actor.AddComponent("Sprite");
sprite.setImage('zombie.png');

canvas.Start();
