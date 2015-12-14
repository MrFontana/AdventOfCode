var simpleSymbols = function(str) {
 for (var i = 0; i < str.length; i++){
   if (str[i] !== "+" && str[i] !== "=") {
     if ((str[i - 1] !== "+") || (str[i + 1] !== "+")) {
       return false;
     }
   }
 }
 return true;
};
