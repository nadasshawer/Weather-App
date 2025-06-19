//Feels like weather object

class Feelslike {
  constructor() {
    //Set up
    this.x = 100; //x-position
    this.y = 270; //y-positin
    this.w = 120; //width
    this.h = 90; //height
    this.tl = 15; //top-left corner
    this.tr = 15; //top-right corner
    this.bl = 15; //bottom-left corner
    this.br = 15; //bottom-right corner
    this.color = "#B0E0E6";
  }

  //Display
  display() {
    
    //BOX
    strokeWeight(2); //stroke weight
    stroke("teal"); //stroke color
    fill(this.color); //box color
    rect(this.x, this.y, this.w, this.h, this.tl, this.tr, this.bl, this.br); //feels like box
    
    //TEXT
    strokeWeight(0); //stroke weight
    fill(0); //text color
    textSize(20); //text size
    textFont("Trebuchet MS");
    text("FEELS LIKE", 111, 300); //text displayed in box
  }
}
