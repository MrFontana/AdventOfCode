// --- Day 10: Elves Look, Elves Say ---
//
// Today, the Elves are playing a game called look-and-say. They take turns making sequences by reading aloud the previous sequence and using that reading as the next sequence. For example, 211 is read as "one two, two ones", which becomes 1221 (1 2, 2 1s).
//
// Look-and-say sequences are generated iteratively, using the previous value as input for the next step. For each step, take the previous value, and replace each run of digits (like 111) with the number of digits (3) followed by the digit itself (1).
//
// For example:
//
// 1 becomes 11 (1 copy of digit 1).
// 11 becomes 21 (2 copies of digit 1).
// 21 becomes 1211 (one 2 followed by one 1).
// 1211 becomes 111221 (one 1, one 2, and two 1s).
// 111221 becomes 312211 (three 1s, two 2s, and one 1).
// Starting with the digits in your puzzle input, apply this process 40 times. What is the length of the result?
//
// Your puzzle answer was 329356.
//
// --- Part Two ---
//
// Neat, right? You might also enjoy hearing John Conway talking about this sequence (that's Conway of Conway's Game of Life fame).

var input = require('./input.js');

var toArray = function(str) {
  var arr = [];
  for (var i = 0; i < str.length; i++) {
    arr.push(str[i]);
  }
  return arr;
};

var newInput = function(arr) {
  var str = "";
  for (var i = 0; i < arr.length; i++) {
    str += arr[i].length + arr[i][0];
  }
  return str;
};

var lookAndSay = function(str) {
  var input = toArray(str);
  var split = [];
  for (var i = input.length - 1; i >= 0; i--) {
    if (input[i] !== input[i-1]) {
      split.push(input.splice(i, input.length - i));
    }
  }
  return newInput(split.reverse());
};

var run = function(input) {
  var str = input;
  for (var i = 0; i < 50; i++) {
    str = lookAndSay(str);
  }
  return str;
};

console.log(run(input).length);
