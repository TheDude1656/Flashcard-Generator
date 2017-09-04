var fs = require("fs");
var inquirer = require("inquirer");
var cards = [];

function basicCard() {
  inquirer.prompt([{
    type: 'list',
    name: 'create',
    message: 'Would you like to create or see the created flashcards? ',
    choices: ["create", "view"],
    default: "create"
  }]).then((basicCard) => {
    if (basicCard.create === "create") {
      inquirer.prompt([{
        type: 'input',
        name: 'question',
        message: 'Please type in the flashcard question. '
      }, {
        type: 'input',
        name: 'answer',
        message: 'Now type in the flashcard answer. '
      }]).then((answers) => {
        var newCard = new BasicCard(answers.question, answers.answer);
        console.log("Front of the card shows: " + "\n" + answers.question);
        console.log("\nBack of the card shows: " + "\n" + answers.answer);
        cards.push(newCard);
        fs.appendFile('./cards.txt', JSON.stringify(newCard) + "\n", (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Card saved to file!");
          }
        })
      });
    } else {
      fs.readFile('./cards.txt', 'utf8', (err, data) => {
        data = data.split('\n');
        data.pop();
        for (card in data) {
          let response = JSON.parse(data[card]);
          console.log("********************************");
          console.log("*The front of this card reads: " + response.question);
          console.log("*The back of this card reads: " + response.answer);
          console.log("********************************");
        }
      })
    }
  })
}

basicCard();

function BasicCard(question, answer) {
  this.question = question
  this.answer = answer;
}

module.exports = BasicCard;
