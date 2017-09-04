var input = process.argv[2];

if (input === "basic") {
  var basic = require("./BasicCard");
  basic();

} else if (input === "cloze") {
  var cloze = require("./ClozeCard");
  cloze();

} else {
  console.log("Please use basic or cloze as options to run!");
}
