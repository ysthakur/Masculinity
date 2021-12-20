/**
 * Every page is a dictionary with the following attributes:
 * prompt - The text to be displayed
 * actions - A dictionary of the possible actions to do from here.
 *           It's optional, the game's considered over if no actions are given
 */

const day1 = {
  prompt: "You hear someone behind you. Though you have no idea who it is, your Useless Info device (TM) tells you he speaks Tsonga.",
  actions: {
    "Turn around to great them in Tsonga": {
      prompt: "Oh no, it's Abel! He catches you and whoops you."
    },
    "It's just some random person, keep walking": {
      prompt: "The person behind you catches up. It's Abel! He catches you and whoops you."
    },
    "Run": {
      prompt: "Congrats, it was Abel, but you've escaped from him for now",
      actions: {
        //todo
      }
    }
  }
};

//Start page
const firstPage = {
  //todo make this backstory even worse so it can maybe wrap back around to being good
  prompt: "Greetings, traveller! Your mission, if you choose to accept it, is to go back in time and live the life of Trevor Noah so that we may understand masculinity better. Back in the 21st century, they had toxic masculinity, apartheid, poverty, all kinds of terrible things. We need to learn that history so that we won't repeat it.",
  actions: {
    "Ok": day1,
    "I don't accept": {
      prompt: "Sorry, you kinda don't have a choice here",
      actions: {
        "Oh, alright then. Trevor Noah's pretty cool anyway": day1
      }
    }
  }
};

let currPage = null;

function loadPage(page) {
  currPage = page;

  const promptElem = document.getElementById("prompt");
  promptElem.innerHTML = page.prompt;

  const actionsElem = document.getElementById("actions");
  actionsElem.innerHTML = "";
  if (page.actions) {
    //ind is just so that each action has a unique id
    let ind = 0;
    actionsElem.innerHTML = "<br>";
    for (const actionText in page.actions) {
      //TODO this is a hack
      actionsElem.innerHTML += `
        <p type="button" onclick="nextPage('${actionText.replace("'", "\\'")}')" class="masculine">&gt; ${actionText}</p>
      `.trim();
      ind++;
    }
  }
}

function nextPage(chosen) {
  const action = currPage.actions[chosen];
  if (typeof action === "function") {
    action();
  } else {
    loadPage(action);
  }
}

loadPage(firstPage);
