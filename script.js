const red = document.querySelector(".red");
const yellow = document.querySelector(".yellow");
const green = document.querySelector(".green");
const blue = document.querySelector(".blue");
const startBtn = document.querySelector("#startBtn");
const resetBtn = document.querySelector("#resetBtn");
const redS = document.getElementById('s-green')






function getRandomPanel() {
    const panels = [red, yellow, blue, green]
    return panels[parseInt(Math.random() * panels.length)]
  
    
  }

  const sequence = [getRandomPanel()]
  let sequenceToMatch = [...sequence]

const flash = (panel) => {
    return new Promise((resolve, reject) => {
        panel.classList.add('active')
        redS.play()
        setTimeout(() => {
             panel.classList.remove('active');

             setTimeout(() => {
                 resolve()
             }, 250);
        },1000)
    })
} 

let canClick = false

const panelClicked = (panelClicked) => {
    if(!canClick) return
    const expectedPanel = sequenceToMatch.shift()
    if(expectedPanel === panelClicked) {
        if(sequenceToMatch.length === 0) {
            //start new round
            sequence.push(getRandomPanel())
            sequenceToMatch = [...sequence]
            startFlashing()
        }
    } else {
        //end game
        alert('GAME OVER')
    }
}

const startFlashing = async () => {
    canClick = false
    for(let panel of sequence) {
        await flash(panel)
      }
      canClick = true
}
    

    startBtn.addEventListener('click',startFlashing)
    resetBtn.addEventListener('click',() => location.reload())


