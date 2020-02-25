function createKeyboardKeys(){
  let keyboardElement = document.getElementById('keyboard');

  let digitGroups = {};

  for (var i = 0; i < 5; i++) {
    digitGroups[i] = [];
    for (var y = 0; y < 2; y++) {
      let randomNumber = Math.floor(Math.random() * 10);
      digitGroups[i].push(randomNumber);
    }
  }

  console.log(digitGroups);
}

createKeyboardKeys();
