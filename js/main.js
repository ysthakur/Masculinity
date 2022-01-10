/**
 * Every page is a dictionary with the following attributes:
 * prompt - The text to be displayed
 * actions - A dictionary of the possible actions to do from here.
 *           It's optional, the game's considered over if no actions are given
 */

//You start out with this much money
let money = 123;

const rickroll = { prompt: "Here's a nice rickroll" }

const day2 = {
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
        "Listen to Rick Astley": rickroll
      }
    }
  }
};

const day1 = {
  prompt: "Your dog is nowhere to be found",
  actions: {
    "Ask your neighbors if they've seen Fufi": {
      prompt: "None of your neighbors have seen Fufi, but the kid next door has a dog that looks a lot like her",
      actions: {
        "Leave it alone and go back home because you dislike confrontation": {
          prompt: "Coward."
        },
        "Tell the kid that it's your dog and she must have accidentally jumped over his fence": {
          prompt: "The kid says Fufi's definitely his dog",
          actions: {
            "Beat him up": {
              prompt: "You're a disgusting bully"
            },
            "Tell his mom about it": {
              prompt: "She says she's sorry you've lost your dog but this is one is theirs"
            },
            "Buy Fufi back from the kid": {
              prompt: "You got your dog back! But at what cost?",
              actions: {
                "Continue": () => { money -= 50; loadPage(day2) }
              }
            },
            "Accept that Fufi was always also the boy's dog and that you can't have her for yourself forever": {
              prompt: "You have learned an important lesson today. Not sure exactly what but whatever",
              actions: {
                "Continue": day2
              }
            }
          }
        }
      }
    },
    "Call out \"Fufi! Fufi\"": { prompt: "Fufi's deaf, idiot." },
    "Call out \"Panther! Panther\"": { prompt: "Panther's your mom's dog, idiot." }
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
        <p type="button" onclick="nextPage('${nicify(actionText)}')" class="masculine masculineOption">&gt; ${actionText}</p>
      `.trim();
      ind++;
    }
  } else {
    //game over
    actionsElem.innerHTML = `
      <iframe id="ytplayer" type="text/html" width="560" height="315" frameborder="0"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe>
    `.trim();
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank")
  }
}

/**
 * Replace double quotes with single quotes
 * @param {*} string 
 * @returns 
 */
function nicify(string) {
  return string.replaceAll(/["']/g, "\\'")
}

function nextPage(chosen) {
  for (let actionText in currPage.actions) {
    console.log(nicify(actionText))
    if (nicify(actionText) === nicify(chosen)) {
      const action = currPage.actions[actionText];
      if (typeof action === "function") {
        action();
      } else {
        loadPage(action);
      }
      return;
    }
  }
  console.error("No such page: " + chosen);
}

loadPage(firstPage);
