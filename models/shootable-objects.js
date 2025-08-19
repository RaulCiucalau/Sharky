class ShootableObjects extends MovableObject {

 constructor() {
  super().loadImage("img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
  this.x = 100;
  this.y = 100;
  this.speed = 4;
  this.width = 50;
  this.height = 50;
  this.shoot();
 }

 shoot(x, y) {
  this.x = x;
  this.y = y;
  this.moveRight();
 }
}
