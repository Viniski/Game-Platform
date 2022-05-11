const cardColors = ["red", "red", "green", "green", "blue", "blue", "brown", "brown", "yellow", "yellow", "gray", "gray", "cadetblue", "cadetblue", "violet", "violet", "lightgreen", "lightgreen"];

let panels = document.querySelectorAll('div');
panels = [...panels];

let first = '';
let second = '';
let who1 = '';
let who2 = '';
let time = 0;

const init = function () {
   timer = setInterval(() => {
      time++;
   }, 10);
   panels.forEach(panel => {
      const index = Math.floor(Math.random() * cardColors.length);
      panel.classList.add(cardColors[index]);
      cardColors.splice(index, 1);
   });
   setTimeout(() => {
      panels.forEach(panel => {
         panel.classList.add('hidden');
      });
   }, 2000);
   panels.forEach(panel => {
      panel.addEventListener('click', game)
   });
}

const game = function () {
   if (this.classList.contains('hidden') && !(first && second)) {
      if (first) {
         if (second) {} else {
            this.classList.remove('hidden');
            second = this.classList.value;
            who2 = panels.indexOf(this);
            if (first === second) {
               setTimeout(() => {
                  panels[who1].classList.add('off');
                  panels[who2].classList.add('off');
                  who1 = '';
                  who2 = '';
                  first = '';
                  second = '';
               }, 500);
               if 
               (!(panels[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].className.includes('hidden'))) {
               // (!(panels.slice[0, 18].className.includes('hidden'))) {
                  clearInterval(timer);
                  alert(`Gratulacje, twój czas to: ${time/100} sekundy ;)`);
               }
            } else {
               setTimeout(() => {
                  panels[who1].classList.add('hidden');
                  panels[who2].classList.add('hidden');
                  first = '';
                  second = '';
               }, 200);
            };
         }
      } else {
         this.classList.remove('hidden');
         first = this.classList.value;
         who1 = panels.indexOf(this);
      }
   }
}

init();