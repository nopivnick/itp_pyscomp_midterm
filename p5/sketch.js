/*
  Anna Oh and Noah Pivnick
  PhysComp 2301.003 (Tom Igoe)
  Halloween Midterm
  https://github.com/nopivnick/itp_team_halloween
*/

/*

Instructions to run this sketch on a localhost using two browser
windows one of which is fullcreen on an external monitor

- If running Arduino IDE, make sure serial monitor is closed
- Run P5.serialcontrol.app
- Select serial port w/ Arduino from dropdown menu
- Open serial port
- Enable serial port
- Check P5.serialcontrol.app for the IP address assigned to the serial port w/ Arduino
- Confirm `serial = new p5.SerialPort("<arduino-serial-port-IP>")` in function setup() is set correctly
- Save sketch in P5 web editor
- P5 web editor » File menu » Download sketch files to Desktop
- Change directory name to "halloween"
- Connect external monitor
- System Preferences » Displays » Arrangement » turn mirroring *off*
- Open Terminal
- $ cd ./halloween
- $ python -m SimpleHTTPServer
- Open two Chrome windows and enter http://<arduino-serial-port-IP>:8000 in each
- Push one Chrome window to external display and make fullscreen (Cmd+Shift+F )
*/


let serial; // declare a global variable for serial class
let portName = '/dev/cu.usbmodem1411';
let serialIn;
let coffins = [];
let coffinsIndex = 0;
let coffinImage;

function preload() {

  // TODO: ideally we'd use a for loop to preload all coffin images
  // for (let i = 0; i < 10; i++) {
  //   coffins[i] = loadImage("images/" + i + ".jpg");

  coffins[0] = loadImage('images/0.jpg');
  coffins[1] = loadImage('images/1.jpg');
  coffins[2] = loadImage('images/2.jpg');
  coffins[3] = loadImage('images/3.jpg');
  coffins[4] = loadImage('images/4.jpg');
  coffins[5] = loadImage('images/5.jpg');
  coffins[6] = loadImage('images/6.jpg');
  coffins[7] = loadImage('images/7.jpg');
  coffins[8] = loadImage('images/8.jpg');
  coffins[9] = loadImage('images/9.jpg');
}

function setup() {
  // instantiate a new serial object
  createCanvas(1920, 1080);
  serial = new p5.SerialPort("10.17.100.70");
  serial.on('list', printList); //Serial.list();
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose);
  serial.open(portName);
}

function draw() {
  background(0);

  // Test whether we can manually load an image from project-folder/images
  // coffinImage = loadImage('images/0.jpg', 0, 0);

  coffinImage = coffins[coffinsIndex];
  image(coffinImage, 0, 0);
}

function serialEvent() {
  // The pushbutton on the Arduino sends high (1) or low (0) over serial
  serialIn = Number(serial.read());

  // Uncomment below to test whether buttonState is reading correctly
  // print(serialIn); // <-

  // When the pushbutton on the Arduino is low, increment to the next coffin image
  if (serialIn == 0) {
    coffinsIndex++;

    if (coffinsIndex > coffins.length - 1) {
      coffinsIndex = 0;
    }
    print(coffinsIndex);
  }
}

/*
  The functions below are used as console diagnostics
*/

// get a list of serial port names and put them in an array called portList
function printList(portList) {
  // loop through the array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // and print the list to console
    print(i + " " + portList[i]);
  }
}

function serverConnected() {
  print('connected to server.');
}

function portOpen() {
  print('the serial port opened.')
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}

// // code to test serial communication with colored ellipses
// fill(255);
// text("Sensor Value: " + serialIn, 30, 30);

// // code to test serial communication with colored ellipses
// fill(255, 0, 0);
// ellipse(width / 2, height / 2, 100, 100);

// // code to test serial communication with colored ellipses
// fill(0, 255, 0);
// ellipse(width / 2, height / 2, 100, 100);