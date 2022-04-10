const red = document.querySelector(".red");
const yellow = document.querySelector(".yellow");
const green = document.querySelector(".green");
const blue = document.querySelector(".blue");
const startBtn = document.querySelector("#startBtn");
const redS = document.getElementById('s-red')


let playerOrder = [];
let shuffled = []
let win = false


function playerChoice() {
    
    red.addEventListener('click', () => {
        red.style.animation = 'pulse 1s'
        playerOrder.push(red)
        
    })
    yellow.addEventListener('click', () => {
        yellow.style.animation = 'pulse 1s'
        playerOrder.push(yellow)
        
    })
    blue.addEventListener('click', () => {
        blue.style.animation = 'pulse 1s'
        playerOrder.push(blue)
        
    })
    green.addEventListener('click', () => {
        green.style.animation = 'pulse 1s'
        playerOrder.push(green)
        
    })

}


function randomClick() {
  let arr = [yellow, green, blue, red];

//   shuffled = arr.sort(() => 0.5 - Math.random()).splice(1);
   let shuffled = [green, green, red]

  for (let i = 0; i < shuffled.length; i++) {
    setInterval(() => {
      shuffled[i].classList.add('playAnimation')
      
    }, i * 500);
    
  }
}

startBtn.addEventListener("click", () => {
   randomClick();

});



function ifWin() {
    for(let i = 0;i < shuffled.length; i++) {
        if(shuffled[i] == playerOrder[i]) {
          win = true
        } else {
            win = false
            return
        }
    }
}

    function results() {
        if(win) {
            alert('Congratulations!');
            
        } else {
            alert('You have lost!');
        } 
    }


