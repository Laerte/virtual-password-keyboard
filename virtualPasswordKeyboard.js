const PASSWORD_EXAMPLE = '426849';

class VirtualPasswordKeyboard extends HTMLElement {
    constructor(){
        super();
        this.className = 'keyboard';
        this.currentPassword = [];
        this.digitGroups = this.generateDigitsGroups();

        for (var i = 0; i < 5; i++) {
            let digits = this.digitGroups[i];
            let digitsElement = document.createElement("div");
            digitsElement.className = "virtual-keyboard-key";
            digitsElement.dataset.groupKey = i;
            digitsElement.innerText = digits.join(" or ");
            this.appendChild(digitsElement);
        }

        let keysElements = document.querySelectorAll('.virtual-keyboard-key');
        keysElements.forEach((keyElement) => {
            keyElement.onclick = () => {
                let groupKey = keyElement.dataset.groupKey;
                let passwordInput = document.getElementById("password");
                passwordInput.value += groupKey;

                this.currentPassword.push(groupKey);
            }
        });

        let clearElement = document.createElement("div");
        clearElement.className = "virtual-keyboard-key";
        clearElement.innerText = 'Clear'
        clearElement.onclick = () => {
            let passwordInput = document.getElementById("password");
            let passwordValue = passwordInput.value;

            if (passwordValue != ""){
              passwordInput.value = passwordValue.substr(0, passwordValue.length -1);
              this.currentPassword.pop();
            }
        }
        this.appendChild(clearElement);
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

    verifyPassword() {
        let sequencePassword = [];
        let examplePasswordSplited = PASSWORD_EXAMPLE.split("");
    
        examplePasswordSplited.forEach(number => {
          Object.keys(this.digitGroups).forEach(groupKey => {
            if ( this.digitGroups[groupKey].indexOf(+number) != -1 ) {
              sequencePassword.push(groupKey);
            }
          })
        });
    
        if (JSON.stringify(sequencePassword) === JSON.stringify(this.currentPassword)) {
            alert("It's a match!");
        } else {
            alert("Invalid password.")
        }
    }

    connectedCallback() {
        let verifyPasswordButton = document.getElementById("verifyPassword");
        verifyPasswordButton.onclick = this.verifyPassword.bind(this);
    }
}

window.customElements.define('virtual-password-keyboard', VirtualPasswordKeyboard);