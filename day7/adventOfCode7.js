// --- Day 7: Some Assembly Required ---
//
// This year, Santa brought little Bobby Tables a set of wires and bitwise logic gates! Unfortunately, little Bobby is a little under the recommended age range, and he needs help assembling the circuit.
//
// Each wire has an identifier (some lowercase letters) and can carry a 16-bit signal (a number from 0 to 65535). A signal is provided to each wire by a gate, another wire, or some specific value. Each wire can only get a signal from one source, but can provide its signal to multiple destinations. A gate provides no signal until all of its inputs have a signal.
//
// The included instructions booklet describes how to connect the parts together: x AND y -> z means to connect wires x and y to an AND gate, and then connect its output to wire z.
//
// For example:
//
// 123 -> x means that the signal 123 is provided to wire x.
// x AND y -> z means that the bitwise AND of wire x and wire y is provided to wire z.
// p LSHIFT 2 -> q means that the value from wire p is left-shifted by 2 and then provided to wire q.
// NOT e -> f means that the bitwise complement of the value from wire e is provided to wire f.
// Other possible gates include OR (bitwise OR) and RSHIFT (right-shift). If, for some reason, you'd like to emulate the circuit instead, almost all programming languages (for example, C, JavaScript, or Python) provide operators for these gates.
//
// For example, here is a simple circuit:
//
// 123 -> x
// 456 -> y
// x AND y -> d
// x OR y -> e
// x LSHIFT 2 -> f
// y RSHIFT 2 -> g
// NOT x -> h
// NOT y -> i
// After it is run, these are the signals on the wires:
//
// d: 72
// e: 507
// f: 492
// g: 114
// h: 65412
// i: 65079
// x: 123
// y: 456
// In little Bobby's kit's instructions booklet (provided as your puzzle input), what signal is ultimately provided to wire a?
//
// Your puzzle answer was 16076.
//
// --- Part Two ---
//
// Now, take the signal you got on wire a, override wire b to that signal, and reset the other wires (including wire a). What new signal is ultimately provided to wire a?
//
// Your puzzle answer was 2797.

var instructions = require('./input.js');

// var instructions = ["d -> a", "x AND y -> d", "x OR y -> e", "x LSHIFT 2 -> f", "y RSHIFT 2 -> g", "NOT x -> h", "NOT y -> i", "123 -> x", "456 -> y"];

var circut = {};

var toBinary = function(num) {
  return sixteenBit((num >>> 0).toString(2));
};
var sixteenBit = function(string) {
  if (string.length < 16) {
    return sixteenBit("0" + string);
  }
  return string;
};
var toInt = function(num) {
  return parseInt(num,2);
};
var isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
var checkForNumbers = function(val1, val2) {
  var nums = [];
  if (isNumber(val1)) {
    nums.push(parseInt(val1));
  } else if (isNumber(circut[val1])) {
    nums.push(parseInt(circut[val1]));
  } else {
    return false;
  }
  if (isNumber(val2)) {
    nums.push(parseInt(val2));
  } else if (isNumber(circut[val2])) {
    nums.push(parseInt(circut[val2]));
  } else {
    return false;
  }
  return nums;
};

var and = function(num1, num2) {
  var binary1 = toBinary(num1);
  var binary2 = toBinary(num2);
  var result = [];
  for (var i = 0; i < 16; i++) {
    if (binary1[i] === '0' || binary2[i] === '0') {
      result[i] = "0";
    } else {
      result[i] = "1";
    }
  }
  return toInt(result.join(''));
};
var or = function(num1, num2) {
  var binary1 = toBinary(num1);
  var binary2 = toBinary(num2);
  var result = [];
  for (var i = 0; i < 16; i++) {
    if (binary1[i] === '1' || binary2[i] === '1') {
      result[i] = "1";
    } else {
      result[i] = "0";
    }
  }
  return toInt(result.join(''));
};
var not = function(num1) {
  var binary1 = toBinary(num1);
  var result = [];
  for (var i = 0; i < 16; i++) {
    if (binary1[i] === '0') {
      result[i] = "1";
    } else {
      result[i] = "0";
    }
  }
  return toInt(result.join(''));
};
var lShift = function(num, amount) {
  return parseInt(num << amount);
};
var rShift = function(num, amount) {
  return parseInt(num >> amount);
};

var setup = function(instructions) {
  for (var i = 0; i < instructions.length; i++) {
    var steps = instructions[i].split(' ');
    if (steps.length === 3) {
      circut[steps[2]] = steps[0];
    } else if (steps.length === 5) {
      circut[steps[4]] = steps[0] + ' ' + steps[1] + ' ' + steps[2];
    } else {
      circut[steps[3]] = steps[0] + ' ' + steps[1];
    }
  }
};
var check = function() {
  for (var wire in circut) {
    var steps = circut[wire].toString();
    steps = steps.split(' ');
    if (steps.length === 3) {
      var nums = checkForNumbers(steps[0], steps[2]);
      if (nums) {
        if (steps[1] === 'AND') {
          circut[wire] = and(nums[0], nums[1]);
        } else if (steps[1] === 'OR') {
          circut[wire] = or(nums[0], nums[1]);
        } else if (steps[1] === 'LSHIFT') {
          circut[wire] = lShift(nums[0], nums[1]);
        } else if (steps[1] === 'RSHIFT') {
          circut[wire] = rShift(nums[0], nums[1]);
        }
      }
    } else if (steps.length === 2) {
      var num =  checkForNumbers(steps[1], 0);
      if (num) {
        circut[wire] = not(num[0]);
      }
    } else {
      var num2 =  checkForNumbers(steps[0], 0);
      if (num2) {
        circut[wire] = num2[0];
      }
    }
  }
  if (isNumber(circut.a)) {
    return true;
  } else {
    return false;
  }
};

var read = function(instructions) {
  setup(instructions);

  var done = false;
  while (!done) {
    done = check();
  }

  var hold = circut.a;

  setup(instructions);
  circut.b = hold;

  done = false;
  while (!done) {
    done = check();
  }
};

read(instructions);
console.log(circut.a);
