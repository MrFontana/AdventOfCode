// --- Day 13: Knights of the Dinner Table ---
//
// In years past, the holiday feast with your family hasn't gone so well. Not everyone gets along! This year, you resolve, will be different. You're going to find the optimal seating arrangement and avoid all those awkward conversations.
//
// You start by writing up a list of everyone invited and the amount their happiness would increase or decrease if they were to find themselves sitting next to each other person. You have a circular table that will be just big enough to fit everyone comfortably, and so each person will have exactly two neighbors.
//
// For example, suppose you have only four attendees planned, and you calculate their potential happiness as follows:
//
// Alice would gain 54 happiness units by sitting next to Bob.
// Alice would lose 79 happiness units by sitting next to Carol.
// Alice would lose 2 happiness units by sitting next to David.
// Bob would gain 83 happiness units by sitting next to Alice.
// Bob would lose 7 happiness units by sitting next to Carol.
// Bob would lose 63 happiness units by sitting next to David.
// Carol would lose 62 happiness units by sitting next to Alice.
// Carol would gain 60 happiness units by sitting next to Bob.
// Carol would gain 55 happiness units by sitting next to David.
// David would gain 46 happiness units by sitting next to Alice.
// David would lose 7 happiness units by sitting next to Bob.
// David would gain 41 happiness units by sitting next to Carol.
// Then, if you seat Alice next to David, Alice would lose 2 happiness units (because David talks so much), but David would gain 46 happiness units (because Alice is such a good listener), for a total change of 44.
//
// If you continue around the table, you could then seat Bob next to Alice (Bob gains 83, Alice gains 54). Finally, seat Carol, who sits next to Bob (Carol gains 60, Bob loses 7) and David (Carol gains 55, David gains 41). The arrangement looks like this:
//
//      +41 +46
// +55   David    -2
// Carol       Alice
// +60    Bob    +54
//      -7  +83
// After trying every other seating arrangement in this hypothetical scenario, you find that this one is the most optimal, with a total change in happiness of 330.
//
// What is the total change in happiness for the optimal seating arrangement of the actual guest list?
//
// Your puzzle answer was 618.
//
// --- Part Two ---
//
// In all the commotion, you realize that you forgot to seat yourself. At this point, you're pretty apathetic toward the whole thing, and your happiness wouldn't really go up or down regardless of who you sit next to. You assume everyone else would be just as ambivalent about sitting next to you, too.
//
// So, add yourself to the list, and give all happiness relationships that involve you a score of 0.
//
// What is the total change in happiness for the optimal seating arrangement that actually includes yourself?
//
// Your puzzle answer was 601.

var input = require('./input.js');

var getAllNames = function(arr) {
  var newArr = [];

  for (var i = 0; i < arr.length; i++) {
    var dup = false;
    var str = arr[i].split(' ');
    for (var j = 0; j < newArr.length; j++) {
      if (newArr[j] === str[0]) {
        dup = true;
      }
    }
    if (!dup) {
      newArr.push(str[0]);
    }
  }

  return newArr;
};
var combs = function(arr) {
  var permArr = [],
    usedChars = [];

  function permute(input) {
    var i, ch;
    for (i = 0; i < input.length; i++) {
      ch = input.splice(i, 1)[0];
      usedChars.push(ch);
      if (input.length === 0) {
        permArr.push(usedChars.slice());
      }
      permute(input);
      input.splice(i, 0, ch);
      usedChars.pop();
    }
    return permArr;
  }

  return permute(arr);
};

var toObject = function(arr) {
  var newObj = {};
  var me = 'Stephen';

  for (var i = 0; i < arr.length; i++) {
    var split = arr[i].split(' ');
    if (!newObj[split[0]])
      newObj[split[0]] = {};
    newObj[split[0]][split[split.length - 1]] = addOrSub(split[3], split[2]);
  }

  for (var key in newObj) {
    if (!newObj[me])
      newObj[me] = {};
    newObj[key][me] = 0;
    newObj[me][key] = 0;
  }

  return newObj;
};
var addOrSub = function(num, mod) {
  num = parseInt(num);

  if (mod === 'lose') {
    num = num - (num * 2);
  }

  return num;
};

var getTotal = function(obj, arr) {
  var total = 0;

  for (var i = 0; i < arr.length - 1; i++) {
    total += obj[arr[i]][arr[i+1]];
    total += obj[arr[i+1]][arr[i]];
  }
  total += obj[arr[0]][arr[arr.length - 1]];
  total += obj[arr[arr.length - 1]][arr[0]];

  return total;
};
var getHighestScore = function(arr) {
  var highest = 0;

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > highest) {
      highest = arr[i];
    }
  }

  return highest;
};

var run = function(input) {
  var names = getAllNames(input);
  names.push('Stephen');
  var combos = combs(names);
  var obj = toObject(input);
  var totals = [];

  for (var i = 0; i < combos.length; i++) {
    totals.push(getTotal(obj, combos[i]));
  }

  return getHighestScore(totals);
};

console.log(run(input));
