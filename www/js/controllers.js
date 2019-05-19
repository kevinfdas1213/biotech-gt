angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true

  };
  
/* co-created with Rémi -> https://github.com/strowbeary
 thank you */

class SineCanvas{
    constructor() {
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.drawers = [];

        this.addEventListener();
    }

    update() {
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        for (let child of this.drawers) {
            child.update();
        }
        requestAnimationFrame(() => this.update())
    }

    onResize() {
        this.canvas.width = window.innerWidth = 600;
        this.canvas.height = window.innerHeight;
        for (let drawer of this.drawers) (
            drawer.init()
        )
    }

    addChild(child) {
        this.drawers.push(child);
        this.onResize();
        this.update();
    }

    addEventListener() {
        window.addEventListener('resize', () => this.onResize());
    }
}

class SineWave {
    constructor(options, canvas) {
        this.options = {
            pointSpacing: 10,
            amplitude: 55,
            lineNumber: 6,
            particuleAlpha: 0.8,
            dx: 0.20, //taille d'une periode
            lineSpacing: 20,
            theta: 0.02, //vitesse
            periodOffset: 0,
            dotColor: "white",
            maxDotSize: 3,
            minDotSize: 0.1
        };
        this.curveOffset = 0;
        this.canvas = canvas;
        this.options = Object.assign(this.options, options);
        this.points = [];
        this.pointsZ = [];
    }

    init() {
        let canvasHeight = this.canvas.canvas.height;
        this.points = Array(Math.floor(canvasHeight / this.options.pointSpacing))
            .fill(0, 0, Math.floor(canvasHeight / this.options.pointSpacing) - 1);
        this.pointsZ = Array(Math.floor(canvasHeight / this.options.pointSpacing))
            .fill(0, 0, Math.floor(canvasHeight / this.options.pointSpacing) - 1);
    }

    update(){
        this.curveOffset += this.options.theta;
        let x = this.curveOffset;
        for(let i = 0; i < this.points.length; i++) {
            this.points[i] = Math.sin(x + this.options.periodOffset) * this.options.amplitude;  // Math.log(i / 50);
            this.pointsZ[i] = (Math.sin(x + this.options.periodOffset + Math.PI / 2) + 1 + this.options.minDotSize)/ 2;
            x += this.options.dx;
        }
        this.draw();
    }

    draw(){
        let canvasWidth = this.canvas.canvas.width;
        let ctx = this.canvas.ctx;

        ctx.fillStyle = this.options.dotColor;
        for (let i = 0; i < this.options.lineNumber; i++) {
            for (let n = 0; n < this.points.length; n++) {
                ctx.beginPath();
                ctx.ellipse(
                    (canvasWidth - (this.options.lineNumber * this.options.pointSpacing / 2)) / 2 + this.points[n] - i * 10,
                    n * this.options.lineSpacing - i * 10,
                    this.options.maxDotSize * this.pointsZ[n],
                    this.options.maxDotSize * this.pointsZ[n],
                    0,
                    0,
                    2 * Math.PI
                );
                ctx.closePath();
                ctx.fill();
            }
        }
    }
}


let sineCanvas = new SineCanvas();

sineCanvas.addChild(
    new SineWave({
        lineNumber: 1,
        amplitude: 55,
        theta: 0.035,
        maxDotSize: 2.5,
        minDotSize: 0.4
    }, sineCanvas)
);

sineCanvas.addChild(
    new SineWave({
        periodOffset: Math.PI,
        lineNumber: 1,
        amplitude: 55,
        theta: 0.035,
        maxDotSize: 2.5,
        minDotSize: 0.4
    }, sineCanvas)
);
});
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

var renderer = Detector.webgl? new THREE.WebGLRenderer( { antialias: true } ): new THREE.CanvasRenderer();

var blue = 0x84D0F0;
var yellow = 0xFED162;
var purple = 0x651E59;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 20;

var tubeGeometry = new THREE.CylinderGeometry(0.3,0.3,6,32);
var ballGeometry = new THREE.SphereGeometry(0.8,32,32);
var blueMaterial = new THREE.MeshBasicMaterial( { color: blue } );
var yellowMaterial = new THREE.MeshBasicMaterial( { color: yellow } );
var purpleMaterial = new THREE.MeshBasicMaterial( { color: purple } );

var dna = new THREE.Object3D();
var holder = new THREE.Object3D();


for (var i = 0; i <= 40; i++) {
    var blueTube = new THREE.Mesh(tubeGeometry, blueMaterial);
    blueTube.rotation.z = 90 * Math.PI/180; 
    blueTube.position.x = -3;

    var yellowTube = new THREE.Mesh(tubeGeometry, yellowMaterial );
    yellowTube.rotation.z = 90 * Math.PI/180;
    yellowTube.position.x = 3;


    var ballRight = new THREE.Mesh( ballGeometry, purpleMaterial );
    ballRight.position.x = 6;

    var ballLeft = new THREE.Mesh( ballGeometry, purpleMaterial );
    ballLeft.position.x = -6;

    var row = new THREE.Object3D();
    row.add(blueTube);
    row.add(yellowTube);
    row.add(ballRight);
    row.add(ballLeft);

    row.position.y = i*2;
    row.rotation.y = 30*i * Math.PI/180;

    dna.add(row);

};


dna.position.y = -40;

scene.add(dna);

dna.position.y = -40;
holder.add(dna)
scene.add(holder);

var CubeConfigData = function() {
    this.zoom = 20;
};

var view = new CubeConfigData();
var gui = new dat.GUI();
gui.close();

gui.add( view, 'zoom', 0, 20 ).onChange( function(value) {
    camera.position.z = value;
});


var render = function () {

    requestAnimationFrame(render);

    holder.rotation.x += 0.01;
    holder.rotation.y += 0.01;
    renderer.render(scene, camera);
}

render();