//const button = document.querySelector('.js-button')//
      //console.log(button.classList.contains('js-button');//

      function Gaming() {
        const gamingElem = document.querySelector('.js-game-button');

        if (gamingElem.innerText === 'Game') {
          gamingElem.innerHTML = 'Fola-Gaming';
          gamingElem.classList.add('updateGame-btn')
        } else {
          gamingElem.innerHTML = 'Game';
          gamingElem.classList.remove('updateGame-btn')
        };
      }

      function Music() {
        const musicElement = document.querySelector('.js-music-button');


        if (musicElement.innerText === 'Music') {
          musicElement.innerHTML = 'Reino';
          musicElement.classList.add('updateMusic-btn');
        } else {
          musicElement.innerHTML = 'Music';
          musicElement.classList.remove('updateMusic-btn');
        };
      }

      function tech() {
        const techElem = document.querySelector('.js-tech-button');

        if (techElem.innerText === 'Tech') {
          techElem.innerHTML = 'NazaTech';
          techElem.classList.add('updateTech-btn')
        } else {
          techElem.innerHTML = 'Tech';
          techElem.classList.remove('updateTech-btn')
        };
      }