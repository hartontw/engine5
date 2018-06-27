
let parent = document.body.childNodes[0];

let canvas = new Canvas(parent, 512, 512);
let zombie = canvas.AddActor(new Actor('Zombie')).AddComponent("Sprite", "zombie.png");
let soldier1 = canvas.AddActor(new Actor('Soldier1')).AddComponent("Sprite", "soldier.png");
let soldier2 = canvas.AddActor(new Actor('Soldier2', Vector.right.mul(125))).AddComponent("Sprite", "soldier.png");

zombie.depth = 0;

canvas.Start();
