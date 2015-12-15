// --- Day 6: Probably a Fire Hazard ---
//
// Because your neighbors keep defeating you in the holiday house decorating contest year after year, you've decided to deploy one million lights in a 1000x1000 grid.
//
// Furthermore, because you've been especially nice this year, Santa has mailed you instructions on how to display the ideal lighting configuration.
//
// Lights in your grid are numbered from 0 to 999 in each direction; the lights at each corner are at 0,0, 0,999, 999,999, and 999,0. The instructions include whether to turn on, turn off, or toggle various inclusive ranges given as coordinate pairs. Each coordinate pair represents opposite corners of a rectangle, inclusive; a coordinate pair like 0,0 through 2,2 therefore refers to 9 lights in a 3x3 square. The lights all start turned off.
//
// To defeat your neighbors this year, all you have to do is set up your lights by doing the instructions Santa sent you in order.
//
// For example:
//
// turn on 0,0 through 999,999 would turn on (or leave on) every light.
// toggle 0,0 through 999,0 would toggle the first line of 1000 lights, turning off the ones that were on, and turning on the ones that were off.
// turn off 499,499 through 500,500 would turn off (or leave off) the middle four lights.
// After following the instructions, how many lights are lit?
//
// Your puzzle answer was 569999.
//
// --- Part Two ---
//
// You just finish implementing your winning light pattern when you realize you mistranslated Santa's message from Ancient Nordic Elvish.
//
// The light grid you bought actually has individual brightness controls; each light can have a brightness of zero or more. The lights all start at zero.
//
// The phrase turn on actually means that you should increase the brightness of those lights by 1.
//
// The phrase turn off actually means that you should decrease the brightness of those lights by 1, to a minimum of zero.
//
// The phrase toggle actually means that you should increase the brightness of those lights by 2.
//
// What is the total brightness of all lights combined after following Santa's instructions?
//
// For example:
//
// turn on 0,0 through 0,0 would increase the total brightness by 1.
// toggle 0,0 through 999,999 would increase the total brightness by 2000000.
// Your puzzle answer was 17836115.

var instructions = require('./input.js');

var lights = {};

function changeLights(instructions, lights) {
  for (var i = 0; i < instructions.length; i++) {
    var arr = instructions[i].split(' ');
    if (arr[0] === 'turn') {
      var coordinates = [arr[2].split(','), arr[4].split(',')];
      if (arr[1] === 'on') {
        for (var k = coordinates[0][0]; k <= coordinates[1][0]; k++) {
          for (var j = coordinates[0][1]; j <= coordinates[1][1]; j++) {
            lights[k + '-' + j] = true;
          }
        }
      } else {
        for (var l = coordinates[0][0]; l <= coordinates[1][0]; l++) {
          for (var m = coordinates[0][1]; m <= coordinates[1][1]; m++) {
            lights[l + '-' + m] = false;
          }
        }
      }
    } else {
      var coordinates2 = [arr[1].split(','), arr[3].split(',')];
      for (var n = coordinates2[0][0]; n <= coordinates2[1][0]; n++) {
        for (var o = coordinates2[0][1]; o <= coordinates2[1][1]; o++) {
          console.log(coordinates2);
          if (lights[n + '-' + o]) {
            console.log("toggleOn");
            lights[n + '-' + o] = true;

          } else {
            console.log("toggleOff");
            lights[n + '-' + o] = false;
          }
        }
      }
    }
  }
  var count = 0;
  for (var key in lights) {
    if (lights[key]) {
      count += 1;
    }
  }
  return count;
}

console.log(changeLights(instructions, lights));
