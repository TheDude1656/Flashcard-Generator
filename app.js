var inquirer = require("inquirer");
var BasicCard = require("./BasicCard");
var ClozeCard = require("./ClozeCard");


var firstPresident = new BasicCard("Who was the first president of the United States?", "George Washington");

console.log(firstPresident.question);
console.log(firstPresident.answer);

var firstPresidentCloze = new ClozeCard("George Washington was the first president of the United States.", "George Washington");

console.log(firstPresidentCloze.text);
console.log(firstPresidentCloze.cloze);
