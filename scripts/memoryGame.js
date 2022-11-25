const cardColors = [
   "red",
   "red",
   "green",
   "green",
   "blue",
   "blue",
   "brown",
   "brown",
   "yellow",
   "yellow",
   "gray",
   "gray",
   "cadetblue",
   "cadetblue",
   "violet",
   "violet",
   "lightgreen",
   "lightgreen",
 ];
 
 let panels = [...document.querySelectorAll("div")];
 
 let firstClass = "";
 let secondClass = "";
 let firstIndex = "";
 let secondIndex = "";
 let timer;
 let time = 0;
 
 const init = function () {
   panels.forEach((panel) => {
     const index = Math.floor(Math.random() * cardColors.length);
     panel.classList.add(cardColors[index]);
     cardColors.splice(index, 1);
   });
   setTimeout(() => {
     panels.forEach((panel) => {
       panel.classList.add("hidden");
     });
   }, 2000);
   timer = setInterval(() => {
     time++;
   }, 10);
   panels.forEach((panel) => {
     panel.addEventListener("click", game);
   });
 };
 
 const game = function () {
   if (this.classList.contains("hidden") && !(firstClass && secondClass)) {
     if (firstClass) {
       if (!secondClass) {
         this.classList.remove("hidden");
         secondClass = this.classList.value;
         secondIndex = panels.indexOf(this);
         if (firstClass === secondClass) {
           setTimeout(() => {
             panels[firstIndex].classList.add("off");
             panels[secondIndex].classList.add("off");
             firstIndex = "";
             secondIndex = "";
             firstClass = "";
             secondClass = "";
           }, 200);
           panels.forEach((el) => {
             console.log(el.className.includes("hidden"));
           });
           let isAnyPanelIsHidden = false;
           panels.forEach((panel) => {
             panel.className.includes("hidden")
               ? (isAnyPanelIsHidden = true)
               : null;
           });
           if (!isAnyPanelIsHidden) {
             clearInterval(timer);
             alert(
               `Gratulacje, twój czas to: ${
                 time / 100
               } sekundy ;) Spróbuj ponownie!`
             );
           }
         } else {
           setTimeout(() => {
             panels[firstIndex].classList.add("hidden");
             panels[secondIndex].classList.add("hidden");
             firstClass = "";
             secondClass = "";
           }, 500);
         }
       }
     } else {
       this.classList.remove("hidden");
       firstClass = this.classList.value;
       firstIndex = panels.indexOf(this);
     }
   }
 };
 
 init();
 