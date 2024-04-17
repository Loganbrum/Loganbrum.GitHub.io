var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        //////////////////////////////////////////////////////////////////
        // ANIMATION VARIABLES HERE //////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        // TODO (several):
        var tree ;
        var buildings = [];
        // var station;
      
      
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO 1:
            // this currently fills the background with an obnoxious yellow;
            // you should modify both the height and color to suit your game
            var backgroundFill = draw.rect(canvasWidth,canvasHeight,'black');
            background.addChild(backgroundFill);
            
            // TODO 2: - Add a moon and starfield
            var station = draw.bitmap("img/260px-Mammalian_Citadel.png");
                station.x = 1110;
                station.y = 0;  
                station.scaleX = 1;
                station.scaleY = 1;
                background.addChild(station);
            var min = 100;
            var max = 1000;
            var moon = draw.bitmap("img/moon.png");
                moon.x = 500;
                moon.y = 50;  
                moon.scaleX = 0.5;
                moon.scaleY = 0.5;
                background.addChild(moon);
            var min = 100;
            var max = 1000;
            var numLoops = Math.floor(Math.random()* (max - min + 1))+ min;
            for (let i = 0; i < numLoops; i++){
                var circle = draw.circle(10, "white", "LightGray", 2);
                    circle.x = canvasWidth * Math.random();
                    circle.y = groundY * Math.random();
                    background.addChild(circle); 
            }
            // TODO 4: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            for (var i = 0; i < 5; ++i) {
                var buildingHeight = (Math.random()*(200-10+1)+10);
                var building = draw.rect(75, buildingHeight, "LightGray", "Black", 1);
                building.x = 200 * i;
                building.y = groundY - buildingHeight;
                background.addChild(building);
                buildings.push(building);
              }
            
            // TODO 3: Part 1 - Add a tree
            tree = draw.bitmap("img/tree.png");
            tree.x = 0;
            tree.y = 0;
            background.addChild(tree); 
            // station = draw.bitmap("projects/runtime/img/260px-Mammalian_Citadel.png");
            // tree.x = 50;
            // tree.y = 50;
            // background.addChild(station); 
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 3: Part 2 - Move the tree!
            tree.x = tree.x - 2;

            if (tree.x < -200) {
            tree.x = canvasWidth;
            }
            
            // TODO 4: Part 2 - Parallax
            for(var i = 0; i < buildings.length; i++){
                var building = buildings[i]
                building.x = building.x - 1
            
               if(building.x < -200){
                    building.x = canvasWidth
               }
            }
        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
