class VirtualPasswordKeyboard extends HTMLElement {
    constructor(){
        super();
        this.className = 'keyboard';
        this.currentPassword = [];
        this.digitGroups = generateDigitsGroups();

        for (var i = 0; i < 5; i++) {
            let digits = this.digitGroups[i];
            this.innerHTML += `<div class='virtual-keyboard-key' data-group-key=${i}>${digits.join(" or ")}</div>`;
        }

        this.innerHTML += `<div class='virtual-keyboard-key'>Clear</div>`;
    }

    generateDigitsGroups() {
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
}

window.customElements.define('virtual-password-keyboard', VirtualPasswordKeyboard);