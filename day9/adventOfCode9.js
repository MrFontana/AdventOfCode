// --- Day 9: All in a Single Night ---
//
// Every year, Santa manages to deliver all of his presents in a single night.
//
// This year, however, he has some new locations to visit; his elves have provided him the distances between every pair of locations. He can start and end at any two (different) locations he wants, but he must visit each location exactly once. What is the shortest distance he can travel to achieve this?
//
// For example, given the following distances:
//
// London to Dublin = 464
// London to Belfast = 518
// Dublin to Belfast = 141
// The possible routes are therefore:
//
// Dublin -> London -> Belfast = 982
// London -> Dublin -> Belfast = 605
// London -> Belfast -> Dublin = 659
// Dublin -> Belfast -> London = 659
// Belfast -> Dublin -> London = 605
// Belfast -> London -> Dublin = 982
// The shortest of these is London -> Dublin -> Belfast = 605, and so the answer is 605 in this example.
//
// What is the distance of the shortest route?
//
// Your puzzle answer was 117.
//
// --- Part Two ---
//
// The next year, just to show off, Santa decides to take the route with the longest distance instead.
//
// He can still start and end at any two (different) locations he wants, and he still must visit each location exactly once.
//
// For example, given the distances above, the longest route would be 982 via (for example) Dublin -> London -> Belfast.
//
// What is the distance of the longest route?
//
// Your puzzle answer was 909.

var input = require('./input.js');

var toObject = function(arr) {
  var newObj = {};
  for (var i = 0; i < arr.length; i++) {
    var split = arr[i].split(' ');
    if (!newObj[split[0]]) {
      newObj[split[0]] = {};
    }
    if (!newObj[split[2]]) {
      newObj[split[2]] = {};
    }
    newObj[split[0]][split[2]] = split[4];
    newObj[split[2]][split[0]] = split[4];
  }
  return newObj;
};
var toArray = function(obj) {
  var arr = [];
  for (var key in obj) {
    arr.push(key);
  }
  return arr;
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
var findDistance = function(arr, obj) {
  var distance = 0;
  for (var i = 0; i < arr.length - 1; i++) {
    distance += (obj[arr[i]][arr[i + 1]] * 1);
  }
  return distance;
};
var findShortest = function(arr) {
  var shortest = 0;
  for (var i = 0; i < arr.length; i++) {
    if (!shortest) {
      shortest = arr[i];
    }
    if (arr[i] > shortest) {
      shortest = arr[i];
    }
  }
  return shortest;
};

var run = function(input) {
  var distances = [];
  var obj = toObject(input);
  var arr = toArray(obj);
  var allCombs = combs(arr);

  for (var i = 0; i < allCombs.length; i++) {
    distances.push(findDistance(allCombs[i], obj));
  }

  console.log(distances);
  return findShortest(distances);
};

console.log(run(input));
