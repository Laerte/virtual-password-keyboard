function generateDigitsGroups() {
  let digitGroups = {};

  for (var i = 0; i < 5; i++) {
    digitGroups[i] = [];
    for (var y = 0; y < 2; y++) {
      // get all numbers generated until now
      let onlyNumbers = Object.keys(digitGroups)
                        .map((groupKey) => digitGroups[groupKey])
                        .flat();

      let randomNumber = Math.floor(Math.random() * 10);

      // verify if number is already taken
      while (onlyNumbers.indexOf(randomNumber) != -1) {
        randomNumber = Math.floor(Math.random() * 10);
      }

      digitGroups[i].push(randomNumber);
    }
  }

  return digitGroups;
}

function createKeyboardKeys() {
  digitGroups = generateDigitsGroups();
  currentPassword = [];

  let keyboardElement = document.getElementById('keyboard');

  for (var i = 0; i < 5; i++) {
    let digits = digitGroups[i];

    let digitsElement = document.createElement("div");
    digitsElement.className = "virtual-keyboard-key";
    digitsElement.dataset.groupKey = i;
    let digitsContent = document.createTextNode(digits.join(" or "));

    digitsElement.onclick = function() {
      let groupKey = this.dataset.groupKey;
      let passwordInput = document.getElementById("password");
      passwordInput.value += groupKey;

      currentPassword.push(groupKey);
    };

    digitsElement.appendChild(digitsContent);
    keyboardElement.appendChild(digitsElement);
  }

  let clearElement = document.createElement("div");
  clearElement.className = "virtual-keyboard-key";
  clearElement.onclick = () => {
    let passwordInput = document.getElementById("password");
    let passwordValue = passwordInput.value;

    if (passwordValue != ""){
      passwordInput.value = passwordValue.substr(0, passwordValue.length -1);
      currentPassword.pop();
    }
  }
  let clearContent = document.createTextNode("Clear");
  clearElement.appendChild(clearContent);
  keyboardElement.appendChild(clearElement);
}

function verifyPassword() {
    let testPassword = document.getElementById("testPassword").value;
    let sequencePassword = [];
    let testPasswordSplited = testPassword.split("");

    testPasswordSplited.forEach(number => {
      Object.keys(digitGroups).forEach(groupKey => {
        if ( digitGroups[groupKey].indexOf(+number) != -1 ) {
          sequencePassword.push(groupKey);
        }
      })
    });

    if (JSON.stringify(sequencePassword) === JSON.stringify(currentPassword)) {
        alert("It's a match!");
    } else {
        alert("Invalid password.")
    }
}
