var fs = require("fs");
var inquirer = require("inquirer");
var cards = [];

function clozeCard() {
  inquirer.prompt([{
    type: 'list',
    name: 'create',
    message: 'Would you like to create or see the created flashcards? ',
    choices: ["create", "view"],
    default: "create"
  }]).then((clozeCard) => {
    if (clozeCard.create === "create") {
      inquirer.prompt([{
        type: 'input',
        name: 'partial',
        message: 'Please give the partial text of the question. '
      }, {
        type: 'input',
        name: 'cloze',
        message: 'Now type in the cloze deletion of the question. '
      }]).then((answers) => {
        var newCard = new ClozeCard(answers.partial, answers.cloze, answers.full);
        console.log("Front of the card shows: " + "\n" + answers.partial);
        console.log("Back of the card shows: " + "\n" + answers.cloze);

        cards.push(newCard);
        fs.appendFile('./clozecards.txt', JSON.stringify(newCard) + "\n", (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Card saved to file!");
          }
        })
      });
    } else {
      fs.readFile('./clozecards.txt', 'utf8', (err, data) => {
        data = data.split('\n');
        data.pop();
        for (card in data) {
          let response = JSON.parse(data[card]);
          console.log("********************************");
          console.log("*The front of this card reads: " + response.partial);
          console.log("*The back of this card reads: " + response.cloze);
          console.log("********************************");
        }
      })
    }
  })
}

clozeCard();

function ClozeCard(partial, cloze) {
  this.partial = "..." + partial;
  this.cloze = cloze;
  this.full = cloze + " " + partial;
}


module.exports = ClozeCard;
