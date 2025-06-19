//Wind speed object

class Windspeed {
  constructor() {
    //Set up
    this.x = 100; //x-position
    this.y = 390; //y-positin
    this.w = 120; //width
    this.h = 90; //height
    this.tl = 15; //top-left corner
    this.tr = 15; //top-right corner
    this.bl = 15; //bottom-left corner
    this.br = 15; //bottom-right corner
    this.color = ("#B0E0E6");
  }

  //Display
  display() {
    
    //BOX
    strokeWeight(2);
    stroke("teal");
    fill(this.color);
    rect(this.x, this.y, this.w, this.h, this.tl, this.tr, this.bl, this.br);
    
     //TEXT
    strokeWeight(0); //stroke weight
    fill(0); //text color
    textSize(20); //text size
    textFont("Trebuchet MS");
    text("WIND", 133, 420); //text displayed in box
  }
}
