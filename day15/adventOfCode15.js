var input = require('./input.js');

var toObj = function(arr) {
  var obj = {};

  for (var i = 0; i < arr.length; i++) {
    var split = arr[i].split(' ');
    var name = split[0].split(':'),
        capacity = split[2].split(','),
        durability = split[4].split(','),
        flavor = split[6].split(','),
        texture = split[8].split(','),
        calories = split[10];
    obj[name[0]] = {
      capacity: capacity[0] * 1,
      durability: durability[0] * 1,
      flavor: flavor[0] * 1,
      texture: texture[0] * 1,
      calories: calories[0] * 1
    };
  }

  return obj;
};
var checkTotalScore = function(obj, totals) {
  var calories = 0;
  var capacity = 0;
  var durability = 0;
  var flavor = 0;
  var texture = 0;

  for (var ingredient in obj) {
    capacity += (obj[ingredient].capacity * totals[ingredient]);
    durability += (obj[ingredient].durability * totals[ingredient]);
    flavor += (obj[ingredient].flavor * totals[ingredient]);
    texture += (obj[ingredient].texture * totals[ingredient]);
    calories += (obj[ingredient].calories * totals[ingredient]);
  }

  if (capacity < 0) {
    capacity = 0;
  }
  if (durability < 0) {
    durability = 0;
  }
  if (flavor < 0) {
    flavor = 0;
  }
  if (texture < 0) {
    texture = 0;
  }

  return {total: capacity * durability * flavor * texture, calories: calories};
};
var findBiggest = function(arr) {
  var biggest = 0;

  for (var i = 0; i < arr.length; i++) {
    if (arr[i].total > biggest) {
      biggest = arr[i].total;
    }
  }

  return biggest;
};
var getBestCalories = function(arr) {
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].calories === 500) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
};

var run = function(input) {
  var obj = toObj(input);
  var ingredients = [];
  var score = [];

  for (var key in obj) {
    ingredients.push(key);
  }

  for (var i = 0; i <= 100; i++) {
    for (var j = 0; j <= 100 - i; j++) {
      for (var k = 0; k <= 100 - i - j; k++) {
        score.push(checkTotalScore(obj, {Frosting: i, Candy: j, Butterscotch: k, Sugar: 100 - i - j - k}));
      }
    }
  }

  var newScores = getBestCalories(score);
  return findBiggest(newScores);
};

console.log(run(input));
