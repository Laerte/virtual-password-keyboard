function createKeyboardKeys(){
  let keyboardElement = document.getElementById('keyboard');

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
}

createKeyboardKeys();
