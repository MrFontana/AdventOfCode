// --- Day 14: Reindeer Olympics ---
//
// This year is the Reindeer Olympics! Reindeer can fly at high speeds, but must rest occasionally to recover their energy. Santa would like to know which of his reindeer is fastest, and so he has them race.
//
// Reindeer can only either be flying (always at their top speed) or resting (not moving at all), and always spend whole seconds in either state.
//
// For example, suppose you have the following Reindeer:
//
// Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
// Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.
// After one second, Comet has gone 14 km, while Dancer has gone 16 km. After ten seconds, Comet has gone 140 km, while Dancer has gone 160 km. On the eleventh second, Comet begins resting (staying at 140 km), and Dancer continues on for a total distance of 176 km. On the 12th second, both reindeer are resting. They continue to rest until the 138th second, when Comet flies for another ten seconds. On the 174th second, Dancer flies for another 11 seconds.
//
// In this example, after the 1000th second, both reindeer are resting, and Comet is in the lead at 1120 km (poor Dancer has only gotten 1056 km by that point). So, in this situation, Comet would win (if the race ended at 1000 seconds).
//
// Given the descriptions of each reindeer (in your puzzle input), after exactly 2503 seconds, what distance has the winning reindeer traveled?
//
// Your puzzle answer was 2696.
//
// --- Part Two ---
//
// Seeing how reindeer move in bursts, Santa decides he's not pleased with the old scoring system.
//
// Instead, at the end of each second, he awards one point to the reindeer currently in the lead. (If there are multiple reindeer tied for the lead, they each get one point.) He keeps the traditional 2503 second time limit, of course, as doing otherwise would be entirely ridiculous.
//
// Given the example reindeer from above, after the first second, Dancer is in the lead and gets one point. He stays in the lead until several seconds into Comet's second burst: after the 140th second, Comet pulls into the lead and gets his first point. Of course, since Dancer had been in the lead for the 139 seconds before that, he has accumulated 139 points by the 140th second.
//
// After the 1000th second, Dancer has accumulated 689 points, while poor Comet, our old champion, only has 312. So, with the new scoring system, Dancer would win (if the race ended at 1000 seconds).
//
// Again given the descriptions of each reindeer (in your puzzle input), after exactly 2503 seconds, how many points does the winning reindeer have?
//
// Your puzzle answer was 1084.

var input = require('./input.js');

var toObject = function(arr) {
  var newObj = {};

  for (var i = 0; i < arr.length; i++) {
    var split = arr[i].split(' ');
    newObj[split[0]] = {
      distance: split[3] * 1,
      time: split[6] * 1,
      rest: split[13] * 1,
      newDistance: 0,
      counter: 1,
      rnr: false,
      score: 0
    };
  }

  return newObj;
};
var reindeerRun = function(obj) {

  if (obj.rnr === false && obj.counter < obj.time) {
    obj.newDistance += obj.distance;
    obj.counter++;
  } else if (obj.rnr === false && obj.counter === obj.time) {
    obj.newDistance += obj.distance;
    obj.counter = 1;
    obj.rnr = true;
  } else if (obj.rnr === true && obj.counter < obj.rest) {
    obj.counter++;
  } else {
    obj.counter = 1;
    obj.rnr = false;
  }

  return obj;
};
var findLongestDistance = (function() {
  var longest = 0;
  var deer;
  return function(obj) {
    if (obj.newDistance > longest) {
      longest = obj.newDistance;
      deer = obj;
    }
    return deer;
  };
})();
var addScore = function(obj) {
  var longest = 0;
  var deer = [];

  for (var key in obj) {
    if (longest < obj[key].newDistance) {
      longest = obj[key].newDistance;
    }
  }

  for (var key2 in obj) {
    if (obj[key2].newDistance === longest) {
      deer.push(key2);
    }
  }

  for (var i = 0; i < deer.length; i++) {
    obj[deer[i]].score += 1;
  }

  return obj;
};


var run = function(input, time) {
  var obj = toObject(input);
  var deer;

  for (var i = 1; i <= time; i++) {
    for (var key in obj) {
      obj[key] = reindeerRun(obj[key]);
    }
    obj = addScore(obj);
  }
  for (var key2 in obj) {
    deer = findLongestDistance(obj[key2]);
  }


  console.log(obj);
  return deer;
};

console.log(run(input, 2503));
