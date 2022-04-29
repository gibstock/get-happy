const square = document.querySelectorAll('.grid')
const canvas = document.getElementById('canvas')
const score = document.getElementById('score')
const minuteDisplay = document.getElementById('minuteDisplay')
const secondDisplay = document.getElementById('secondDisplay')
const report = document.getElementById('report')
const displayBox = document.getElementById('displayBox')
const play = document.getElementById('play')
const easy = document.getElementById('easy')
const normal = document.getElementById('normal')
const hard = document.getElementById('hard')
const mobileInstruction = document.getElementById('mobileInstructions')
const leaderBtn = document.getElementById('leaderboard')
const highScores = document.getElementById('high-scores')
const leaderboardHeader = document.getElementById('leaderboardHeader')
const form = document.getElementById('leaderForm')
const modeInput = document.getElementById('modeInput')
const scoreInput = document.getElementById('scoreInput')
const instructions = document.getElementById('instructions')
const LEADERBOARD_URL = 'https://docs.google.com/spreadsheets/d/1EDHaR9mGXRL6GzFoPadh9dlbT0dqbawoGN5RRrpljBY/gviz/tq?tqx=out:json'
const colors = ['red', 'green', 'purple', 'white', 'black', 'blue', 'pink']
let count = 0
let scoresArray = []
let colorSet = [
  {
    max: 30,
    min: 0,
  },
  {
    max: 60,
    min: 31,
  },
  {
    max: 90,
    min: 61,
  },
  {
    max: 120,
    min: 91,
  },
  {
    max: 150,
    min: 121,
  },
  {
    max: 180,
    min: 151,
  },
  {
    max: 210,
    min: 181,
  },
  {
    max: 240,
    min: 211,
  },
  {
    max: 270,
    min: 241,
  },
  {
    max: 300,
    min: 271,
  },
  {
    max: 330,
    min: 301,
  },
  {
    max: 360,
    min: 331,
  },
]
let currentMode;
let currSquare;
let prevSquare;

let rndTheme = Math.floor(Math.random() * (colorSet.length))
console.log(rndTheme)
score.textContent = `Score: ${count}`




const mobileStart = (timerFuncMin, timerFuncSec, difficulty, setting) => {
  let startingX, startingY, movingX, movingY;
  currentMode = setting
  let countdownTimer = setInterval(() => {
    if(timerFuncMin === 0 && timerFuncSec === 0) {
      clearInterval(countdownTimer)
      square.forEach((el) => {
        if(el.textContent !== '🤩') {
          el.style.opacity = '.08'
        }else {
          el.style.opacity = '.1'
        }
        report.style.display = 'flex';
        if(count <= 10) {
          displayBox.textContent = `Ok, you got ${count} happies on ${setting} mode. Maybe try again.`
          play.style.zIndex = 99
          displayBox.append(play)
          
        } else if (count <= 20) {
          displayBox.textContent = `You got ${count} happies on ${setting} mode. Not Bad.`
          play.style.zIndex = 99
          displayBox.append(play)
          
        }else if(count <= 50) {
          displayBox.textContent = `You got ${count} happies on ${setting} mode! So close to a good score! Try again.`
          play.style.zIndex = 99
          displayBox.append(play)
          
        } else if(count <= 70) {
          displayBox.textContent = `Holy COW! You got ${count} happies on ${setting} mode! Now that's happy! You're a HAPPY BEAST!`
          play.style.zIndex = 99
          displayBox.append(play)
          
        } else if(count <= 90) {
          displayBox.textContent = `You gaming legend! You got ${count} happies on ${setting} mode! You better go tell somebody! You're a HAPPY CAMPER!`
          play.style.zIndex = 99
          displayBox.append(play)
          
        } else if(count === 100) {
          displayBox.textContent = `You are a GOD. You got ${count} happies on ${setting} mode and you might be the only person to get it. Get on the leaderboard. Email me andre@knucklecuts.com`
          play.style.zIndex = 99
          displayBox.append(play)
          
        } else {
          displayBox.textContent = `Mind Blown. You got ${count} happies on ${setting} mode. You're elite.`
          play.style.zIndex = 99
          displayBox.append(play)

        }
      })
    } else if(timerFuncMin !== 0 && timerFuncSec === 0) {
      timerFuncMin--
      timerFuncSec = 59
      minuteDisplay.innerText = timerFuncMin.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })
      secondDisplay.innerText = timerFuncSec.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })
    } else if(timerFuncMin >= 0 && timerFuncSec >= 0) {
      timerFuncSec--
      secondDisplay.innerText = timerFuncSec.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })
    }
  
  }, 1000)

  const colorSquare = (div) => {
    let rnd = Math.floor(Math.random() * difficulty)
    let colorRnd = Math.floor(Math.random() * (colorSet[rndTheme].max - colorSet[rndTheme].min) + colorSet[rndTheme].min)
    let percentRnd1 = Math.floor(Math.random() * (101-20) + 20)
    let percentRnd2 = Math.floor(Math.random() * (91-20) + 20)
    div.style.outline = '1px solid red'
    div.style.boxShadow = '5px 5px 5px 2px hsla(210, 50%, 30%, .9)'
    div.style.position = 'relative'
    div.style.zIndex = 1

    if(div.textContent === '☹' ){
      return;
    } else if(div.textContent === '🤩') {
      div.textContent = '☹'
      count -= 1
      score.textContent = `Score: ${count}`
    }else if((rnd === 6 || rnd === 2) && div.textContent !== '🤩') {
      div.textContent = '🤩'
      count += 1
      score.textContent = `Score: ${count}`
    } else div.style.backgroundColor = `hsl(${colorRnd}, ${percentRnd1}%, ${percentRnd2}%)`
  }
  let x = Math.floor(Math.random() * 101)
  let mobileTarget = square[x]
  mobileTarget.style.outline = '1px solid red'
  mobileTarget.style.boxShadow = '5px 5px 5px 2px hsla(210, 50%, 30%, .9)'

  canvas.addEventListener("touchstart", e => {
    e.preventDefault()
    startingX = e.touches[0].clientX
    startingY = e.touches[0].clientY
    touched = e.touches[0].target
    console.log(touched)
    console.log("start")
  }, {capture: false, passive: false})

  canvas.addEventListener("touchmove", e => {
    e.preventDefault()
    movingX = e.touches[0].clientX
    movingY = e.touches[0].clientY
  }, {capture: false, passive: false})

  canvas.addEventListener("touchend", e => {
    e.preventDefault()
    console.log("distance", movingX - startingX)
    if(startingX+20 < movingX) {
      mobileTarget.style.outline = 'none'
      mobileTarget.style.boxShadow = 'none'
      mobileTarget.style.zIndex = '0'
      if(square[x + 1] === undefined) {
        x = x - 9
        mobileTarget = square[x]
      }if ((x - 9) % 10 === 0) {
        x = x - 9
        mobileTarget = square[x]
      } else {
        x = x + 1
        mobileTarget = square[x]
      }
      colorSquare(mobileTarget)
      console.log('right')
    }else if(startingX-20 > movingX) {
      mobileTarget.style.outline = 'none'
      mobileTarget.style.boxShadow = 'none'
      mobileTarget.style.zIndex = '0'

      if(square[x - 1] === undefined) {
        x = x + 9
        mobileTarget = square[x]
      }if (x % 10 === 0) {
        x = x + 9
        mobileTarget = square[x]
      } else {
        x = x - 1
        mobileTarget = square[x]
      }
      colorSquare(mobileTarget)
      console.log('left')
    }
    if(startingY+20 < movingY) {
      mobileTarget.style.outline = 'none'
      mobileTarget.style.boxShadow = 'none'
      mobileTarget.style.zIndex = '0'

      if(square[x + 10] === undefined) {
        x = x - 90
        mobileTarget = square[x]
      }else {
        x = x + 10
        mobileTarget = square[x]
      }
      colorSquare(mobileTarget)
      console.log('down')
    } else if(startingY-20 > movingY) {
      mobileTarget.style.outline = 'none'
      mobileTarget.style.boxShadow = 'none'
      mobileTarget.style.zIndex = '0'

      if(square[x - 10] === undefined) {
        x = x + 90
        mobileTarget = square[x]
      }else {
        x = x - 10
        mobileTarget = square[x]
      }
      colorSquare(mobileTarget)
      console.log('up')
    }
  }, {capture: false, passive: false})
  square.forEach((el) => {
    el.addEventListener('click', () => {
      alert("Hey don't cheat! No clicking!")
      window.location.href=window.location.href
    })
  })
}
const start = (timerFuncMin, timerFuncSec, difficulty, setting) => {
  instructions.textContent = '(Hint: drag the mouse across the square)'
  currentMode = setting
  let countdownTimer = setInterval(() => {
    if(timerFuncMin === 0 && timerFuncSec === 0) {
      clearInterval(countdownTimer)
      square.forEach((el) => {
        if(el.textContent !== '🤩') {
          el.style.visibility = 'hidden'
        }
        report.style.display = 'flex';
        if(count <= 10) {
          displayBox.textContent = `Ok, you got ${count} happies on ${setting} mode. Maybe try again.`
          play.style.zIndex = 99
          
          displayBox.append(play)
          
        } else if (count <= 20) {
          displayBox.textContent = `You got ${count} happies on ${setting} mode. Not Bad.`
          play.style.zIndex = 99
          displayBox.append(play)
          
        }else if(count <= 50) {
          displayBox.textContent = `You got ${count} happies on ${setting} mode! So close to a good score! Try again.`
          play.style.zIndex = 99
          displayBox.append(play)
          
        } else if(count <= 70) {
          displayBox.textContent = `Holy COW! You got ${count} happies on ${setting} mode! Now that's happy! You're a HAPPY BEAST!`
          play.style.zIndex = 99
          displayBox.append(play)
          
        } else if(count <= 90) {
          displayBox.textContent = `You gaming legend! You got ${count} happies on ${setting} mode! You better go tell somebody! You're a HAPPY CAMPER!`
          play.style.zIndex = 99
          displayBox.append(play)
          
        } else if(count === 100) {
          displayBox.textContent = `You are a GOD. You got ${count} happies on ${setting} mode and you might be the only person to get it. Get on the leaderboard. Email me andre@knucklecuts.com`
          play.style.zIndex = 99
          displayBox.append(play)
          
        } else {
          displayBox.textContent = `Mind Blown. You got ${count} happies on ${setting} mode. You're elite.`
          play.style.zIndex = 99
          displayBox.append(play)

        }
      })
    } else if(timerFuncMin !== 0 && timerFuncSec === 0) {
      timerFuncMin--
      timerFuncSec = 59
      minuteDisplay.innerText = timerFuncMin.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })
      secondDisplay.innerText = timerFuncSec.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })
    } else if(timerFuncMin >= 0 && timerFuncSec >= 0) {
      timerFuncSec--
      secondDisplay.innerText = timerFuncSec.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })
    }
  
  }, 1000)

  square.forEach((el) => {
    el.addEventListener('mouseover', () => {
      let rnd = Math.floor(Math.random() * difficulty)
      let colorRnd = Math.floor(Math.random() * (220 - 150) + 150)
      let percentRnd1 = Math.floor(Math.random() * (101-20) + 20)
      let percentRnd2 = Math.floor(Math.random() * (91-20) + 20)
      if(el.textContent === '☹' ){
        return;
      } else if(el.textContent === '🤩') {
        el.textContent = '☹'
        count -= 1
        score.textContent = `Score: ${count}`
      }else if((rnd === 6 || rnd === 2) && el.textContent !== '🤩') {
        el.textContent = '🤩'
        count += 1
        score.textContent = `Score: ${count}`
      } else el.style.backgroundColor = `hsl(${colorRnd}, ${percentRnd1}%, ${percentRnd2}%)`
    })
  })
  square.forEach((el) => {
    el.addEventListener('click', () => {
      alert("Hey don't cheat! No clicking!")
      window.location.href=window.location.href
    })
  })
}

const loadLeaderBoard = (arr, len) => {
  let canvasHeight = canvas.getBoundingClientRect().height
  let colorRnd = Math.floor(Math.random() * 361)
  let percentRnd1 = Math.floor(Math.random() * 101)
  let percentRnd2 = Math.floor(Math.random() * (101 - 10) + 10)
  arr.sort((a, b) => {
    return b.score - a.score
  })
  let closeBtn = document.createElement('span')
  closeBtn.textContent = '❌'
  closeBtn.style.position = 'absolute'
  closeBtn.style.top = '1em'
  closeBtn.style.right = '1em'
  closeBtn.style.cursor = 'pointer'
  highScores.style.backgroundColor = 'hsl(125, 25%, 0%)'
  highScores.style.height = `${canvasHeight}px`
  highScores.style.position = 'absolute'
  highScores.style.boxSizing = 'border-box'
  highScores.style.top = '20%'
  highScores.style.left = '50%'
  highScores.style.transform = 'translateX(-50%)'
  highScores.style.flexFlow = 'column'
  highScores.style.color = 'white'
  highScores.children[1].style.listStyle = 'none'
  highScores.children[1].style.padding = 0
  leaderboardHeader.textContent = 'Leaderboard'
  highScores.append(closeBtn)
  for(let i = 0; i < len; i++) {
    let li = document.createElement('li')
    if(i === 0) {
      li.innerHTML = `#${i+1} <span class="usrName">${arr[i].username}</span> scored ${arr[i].score} on ${arr[i].mode} mode 👑`
    } else {
      li.innerHTML = `#${i +1} <span class="usrName">${arr[i].username}</span> scored ${arr[i].score} on ${arr[i].mode} mode`
    }
    const usrNameClass = document.querySelectorAll('.usrName')
    usrNameClass.forEach((span) => {
      span.style.color = `hsl(${colorRnd}, ${percentRnd1}%, ${percentRnd2}%)`
      if(colorRnd + 5 <= 360) {
        colorRnd += 10
      } else {
        colorRnd = 0
      }
      if(percentRnd1 + 5 <= 100) {
        percentRnd1 += 5
      } else {
        percentRnd1 = 50
      }
      if(percentRnd2 + 5 <= 90){
        percentRnd2 += 5
      } else {
        percentRnd2 = 50
      }
    })
    highScores.children[1].append(li)
  }
  closeBtn.addEventListener('click', () => {
    highScores.style.display = 'none'
  })
}
const createObj = (obj, objLen) => {
  for(let i = 0; i < objLen; i++) {
    scoresArray[i] = {
      username : obj[i].c[0].v,
      mode: obj[i].c[1].v,
      score: obj[i].c[2].v,
    }
  }
  loadLeaderBoard(scoresArray, objLen)

}

const buildBoard = async () => {
  console.log(navigator.userAgent)
  const fetchedGoogleSheetData = fetch(LEADERBOARD_URL)
    .then(response => response.text())
    .then(data => {
      let colStart = data.indexOf("cols") -2
      const result = (JSON.parse(data.slice(colStart, data.length - 3))).rows
      let resultLength = Object.keys(result).length // set length for dynamic variable rendering
      
      createObj(result, resultLength)


    })

    form.addEventListener('submit', (e) => {
      e.preventDefault()
      modeInput.value = currentMode
      scoreInput.value = count
      const userData = new FormData(form);

      const action = e.target.action
      const submitBtn = document.getElementById('submitBtn')
      submitBtn.textContent = 'Sending...'
      submitBtn.disabled = true
      fetch(action, {
        method: 'POST',
        body: userData,
      })
      .then(() => {
        alert("Added to leaderboard")
        window.location.href=window.location.href
      })
    })
}


const leaderboardShow = () => {
  highScores.style.display = 'flex'

}

leaderBtn.addEventListener('click', leaderboardShow)

easy.addEventListener('click', () => {
  easy.textContent = 'GO!'
  easy.style.border = '2px solid hsla(210, 50%, 90%, .8)'

  easy.disabled = true
  normal.disabled = true
  normal.style.visibility = 'hidden'
  hard.disabled = true
  hard.style.visibility = 'hidden'
  if(/Android|Pixel|iPhone|iPad|iPod/i.test(navigator.userAgent)){
    mobileInstruction.style.display = 'flex'
    mobileStart(2, 00, 4, 'Easy')
  } else {
    start(2, 00, 4, 'Easy')
  }
})
normal.addEventListener('click', () => {
  mobileInstruction.style.display = 'flex'
  normal.textContent = 'GO!'
  normal.style.border = '2px solid hsla(210, 50%, 90%, .8)'

  normal.disabled = true
  hard.disabled = true
  hard.style.visibility = 'hidden'
  easy.disabled = true
  easy.style.visibility = 'hidden'
  if(/Android|Pixel|iPhone|iPad|iPod/i.test(navigator.userAgent)){
    mobileInstruction.style.display = 'flex'
    mobileStart(1, 00, 7, 'Normal')
  } else {
    start(1, 00, 7, 'Normal')
  }
})
hard.addEventListener('click', () => {
  hard.textContent = 'GO!'
  hard.style.border = '2px solid hsla(210, 50%, 90%, .8)'
  hard.disabled = true
  normal.disabled = true
  normal.style.visibility = 'hidden'
  easy.disabled = true
  easy.style.visibility = 'hidden'
  if(/Android|Pixel|iPhone|iPad|iPod/i.test(navigator.userAgent)){
    mobileInstruction.style.display = 'flex'
    mobileStart(0, 30, 13, 'Hard')
  } else {
    start(0, 30, 13, 'Hard')
  }
})

play.addEventListener('click', () => {
  window.location.href=window.location.href
})
window.addEventListener("DOMContentLoaded",buildBoard)