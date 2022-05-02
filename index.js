const square = document.querySelectorAll('.grid')
const canvas = document.getElementById('canvas')
const mainWrapper = document.getElementById('main-wrapper')
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
const extraTime = document.getElementById('extraTime')
const counter = document.getElementById('counter')
const moviesDiv = document.getElementById('movies')
const movies = moviesDiv.querySelectorAll('.movie')
const timesep = document.getElementById('timeSep')

const LEADERBOARD_URL = 'https://docs.google.com/spreadsheets/d/1EDHaR9mGXRL6GzFoPadh9dlbT0dqbawoGN5RRrpljBY/gviz/tq?tqx=out:json'
const colors = ['red', 'green', 'purple', 'white', 'black', 'blue', 'pink']
let count = 0
let bonus = [false, false, false]
let easyLen = 0
let normalLen = 0
let hardLen = 0
let isMobile = false
let isDesktop = false
let gameOver = false

let easyScoresArray = []
let normalScoresArray = []
let hardScoresArray = []
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

const countDown = (timerFuncMin, timerFuncSec, setting) => {
  currentMode = setting
  let countdownTimer = setInterval(() => {
    if(timerFuncMin === 0 && timerFuncSec === 0) {
      clearInterval(countdownTimer)
      gameOver = true
      square.forEach((el) => {
        if(el.matches('.happy')) {
          el.style.opacity = '.08'
        }else {
          el.style.opacity = '.1'
        }
        report.style.display = 'flex';
        canvas.style.transform = 'scale(8)'
        canvas.style.transition = 'all 15s'
        canvas.style.border = 'none'
        counter.style.opacity = '0'
        counter.style.transition = 'all 3s'
        if(count <= 10) {
          displayBox.textContent = `Ok, you got ${count} happies on ${setting} mode. Maybe try again.`
          
        } else if (count <= 20) {
          displayBox.textContent = `You got ${count} happies on ${setting} mode. Not Bad.`
          
        }else if(count <= 50) {
          displayBox.textContent = `You got ${count} happies on ${setting} mode! So close to a good score! Try again.`
          
        } else if(count <= 70) {
          displayBox.textContent = `Holy COW! You got ${count} happies on ${setting} mode! Now that's happy! You're a HAPPY BEAST!`
          
        } else if(count <= 90) {
          displayBox.textContent = `You gaming legend! You got ${count} happies on ${setting} mode! You better go tell somebody! You're a HAPPY CAMPER!`
          
        } else if(count === 100) {
          displayBox.textContent = `You are a GOD. You got ${count} happies on ${setting} mode and you might be the only person to get it. Get on the leaderboard. Email me andre@knucklecuts.com`
          
        } else {
          displayBox.textContent = `Mind Blown. You got ${count} happies on ${setting} mode. You're elite.`
        }
        play.style.zIndex = 99
        displayBox.append(play)
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
      if(setting === 'Hard' && count >= 10 && count <= 14 && bonus[0] !== true) {
        timerFuncSec += 10
        extraTime.style.visibility = 'visible'
        extraTime.classList.add('float')
        bonus[0] = true
        setTimeout(()=> {
          extraTime.style.visibility = 'hidden'
          extraTime.classList.remove('float')
        }, 2000)
      }
      if(setting === 'Hard' && count >= 20 && count <= 24 && bonus[1] !== true) {
        timerFuncSec += 10
        extraTime.style.visibility = 'visible'
        extraTime.classList.add('float')
        bonus[1] = true
        setTimeout(()=> {
          extraTime.style.visibility = 'hidden'
          extraTime.classList.remove('float')
        }, 2000)
      }
      if(setting === 'Hard' && count >= 30 && count <= 34 && bonus[2] !== true) {
        timerFuncSec += 10
        extraTime.style.visibility = 'visible'
        extraTime.classList.add('float')
        bonus[2] = true
        setTimeout(()=> {
          extraTime.style.visibility = 'hidden'
          extraTime.classList.remove('float')
        }, 2000)
      }
      if((setting === 'Easy' || setting === 'Normal') && count >= 50 && count <= 55 && bonus[3] !== true) {
        timerFuncSec += 10
        extraTime.style.visibility = 'visible'
        extraTime.classList.add('float')
        bonus[3] = true
        setTimeout(()=> {
          extraTime.style.visibility = 'hidden'
          extraTime.classList.remove('float')
        }, 2000)
      }
    }
  
  }, 1000)
}
const colorSquare = (div, difficulty) => {
  console.log("difficulty", difficulty)
  let rnd = Math.floor(Math.random() * difficulty)
  let colorRnd = Math.floor(Math.random() * (colorSet[rndTheme].max - colorSet[rndTheme].min) + colorSet[rndTheme].min)
  let percentRnd1 = Math.floor(Math.random() * (101-20) + 20)
  let percentRnd2 = Math.floor(Math.random() * (91-20) + 20)
  const flashy1 = document.createElement('div')
  const flashy2 = document.createElement('div')
  const flashy3 = document.createElement('div')
  const flashy4 = document.createElement('div')
  flashy1.classList.add('flash1')
  flashy2.classList.add('flash2')
  flashy3.classList.add('flash3')
  flashy4.classList.add('flash4')
  div.style.outline = '1px solid red'
  div.style.boxShadow = '5px 5px 5px 2px hsla(210, 50%, 30%, .9)'
  div.style.position = 'relative'
  div.style.zIndex = 1

  if(div.matches('.sad')){
    return;
  } else if(div.matches('.happy')) {
    div.classList.remove('happy')
    div.classList.add('sad')
    div.append(flashy3)
    div.append(flashy4)
    count -= 1
    score.textContent = `Score: ${count}`
    setTimeout(()=> {
      div.removeChild(flashy3)
      div.removeChild(flashy4)
    }, 1000)
  }else if((rnd === 6 || rnd === 2) && !div.matches('.happy')) {
    div.classList.add('happy')
    div.append(flashy1)
    div.append(flashy2)
    count += 1
    score.textContent = `Score: ${count}`
    setTimeout(()=> {
      div.removeChild(flashy1)
      div.removeChild(flashy2)
    }, 1000)

  } else div.style.backgroundColor = `hsl(${colorRnd}, ${percentRnd1}%, ${percentRnd2}%)`
}

const mobileStart = (timerFuncMin, timerFuncSec, difficulty, setting) => {
  console.log("setting", setting)
  let startingX, startingY, movingX, movingY;
  countDown(timerFuncMin, timerFuncSec, setting)

  // const colorSquare = (div) => {
  //   let rnd = Math.floor(Math.random() * difficulty)
  //   let colorRnd = Math.floor(Math.random() * (colorSet[rndTheme].max - colorSet[rndTheme].min) + colorSet[rndTheme].min)
  //   let percentRnd1 = Math.floor(Math.random() * (101-20) + 20)
  //   let percentRnd2 = Math.floor(Math.random() * (91-20) + 20)
  //   const flashy1 = document.createElement('div')
  //   const flashy2 = document.createElement('div')
  //   const flashy3 = document.createElement('div')
  //   const flashy4 = document.createElement('div')
  //   flashy1.classList.add('flash1')
  //   flashy2.classList.add('flash2')
  //   flashy3.classList.add('flash3')
  //   flashy4.classList.add('flash4')
  //   div.style.outline = '1px solid red'
  //   div.style.boxShadow = '5px 5px 5px 2px hsla(210, 50%, 30%, .9)'
  //   div.style.position = 'relative'
  //   div.style.zIndex = 1

  //   if(div.matches('.sad')){
  //     return;
  //   } else if(div.matches('.happy')) {
  //     div.classList.remove('happy')
  //     div.classList.add('sad')
  //     div.append(flashy3)
  //     div.append(flashy4)
  //     count -= 1
  //     score.textContent = `Score: ${count}`
  //     setTimeout(()=> {
  //       div.removeChild(flashy3)
  //       div.removeChild(flashy4)
  //     }, 1000)
  //   }else if((rnd === 6 || rnd === 2) && !div.matches('.happy')) {
  //     div.classList.add('happy')
  //     div.append(flashy1)
  //     div.append(flashy2)
  //     count += 1
  //     score.textContent = `Score: ${count}`
  //     setTimeout(()=> {
  //       div.removeChild(flashy1)
  //       div.removeChild(flashy2)
  //     }, 1000)

  //   } else div.style.backgroundColor = `hsl(${colorRnd}, ${percentRnd1}%, ${percentRnd2}%)`
  // }
  let x = Math.floor(Math.random() * 101)
  let mobileTarget = square[x]
  mobileTarget.style.outline = '1px solid red'
  mobileTarget.style.boxShadow = '5px 5px 5px 2px hsla(210, 50%, 30%, .9)'

  mainWrapper.addEventListener("touchstart", e => {
    e.preventDefault()
    startingX = e.touches[0].clientX
    startingY = e.touches[0].clientY
    // touched = e.touches[0].target
  }, {capture: false, passive: false})

  mainWrapper.addEventListener("touchmove", e => {
    e.preventDefault()
    movingX = e.touches[0].clientX
    movingY = e.touches[0].clientY
  }, {capture: false, passive: false})

  mainWrapper.addEventListener("touchend", e => {
    // RIGHT
    e.preventDefault()
    if(setting === 'Hard'){
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
        colorSquare(mobileTarget, difficulty)
      }else if(startingX-20 > movingX) {
        //LEFT
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
        colorSquare(mobileTarget, difficulty)
      }
      if(startingY+20 < movingY) {
        // DOWN
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
        colorSquare(mobileTarget, difficulty)
      } else if(startingY-20 > movingY) {
        // UP
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
        colorSquare(mobileTarget, difficulty)
      }

    } else {
      if(startingX+75 < movingX) {
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
        colorSquare(mobileTarget, difficulty)
      }else if(startingX-75 > movingX) {
        //LEFT
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
        colorSquare(mobileTarget, difficulty)
      }
      if(startingY+75 < movingY) {
        // DOWN
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
        colorSquare(mobileTarget, difficulty)
      } else if(startingY-75 > movingY) {
        // UP
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
        colorSquare(mobileTarget, difficulty)
      }

    }
  }, {capture: false, passive: false})
  square.forEach((el) => {
    if(gameOver) {
      console.log('Game Over')
      return
    }else {
      el.addEventListener('click', () => {
        alert("Hey don't cheat! No clicking!")
        window.location.href=window.location.href
      })
    }
  })
}
const start = (timerFuncMin, timerFuncSec, difficulty, setting) => {
  instructions.textContent = '(Hint: drag the mouse across the square)'
  countDown(timerFuncMin, timerFuncSec, setting)
  square.forEach((el) => {
    el.addEventListener('mouseenter', (e) => {
      // console.log(e.target.previousSibling)
      let deskTarget = e.target;
      // prevSquare = deskTarget;
      // deskTarget.style.outline = "1px solid red"
      // deskTarget.style.boxShadow = '5px 5px 5px 2px hsla(210, 50%, 30%, .9)'
      colorSquare(deskTarget, difficulty)
      // let rnd = Math.floor(Math.random() * difficulty)
      // let colorRnd = Math.floor(Math.random() * (220 - 150) + 150)
      // let percentRnd1 = Math.floor(Math.random() * (101-20) + 20)
      // let percentRnd2 = Math.floor(Math.random() * (91-20) + 20)
      // if(el.textContent === '☹' ){
      //   return;
      // } else if(el.textContent === '🤩') {
      //   el.textContent = '☹'
      //   count -= 1
      //   score.textContent = `Score: ${count}`
      // }else if((rnd === 6 || rnd === 2) && el.textContent !== '🤩') {
      //   el.textContent = '🤩'
      //   count += 1
      //   score.textContent = `Score: ${count}`
      // } else el.style.backgroundColor = `hsl(${colorRnd}, ${percentRnd1}%, ${percentRnd2}%)`
    })
    el.addEventListener('mouseout', (e) => {
      e.target.style.outline = 'none'
    })
  })
    // square.forEach((el) => {
    //   if(gameOver) {
    //     console.log('Game Over')
    //     return
    //   } else {
    //     el.addEventListener('click', () => {
    //       alert("Hey don't cheat! No clicking!")
    //       window.location.href=window.location.href
    //     })
    //   }
    // })
}

const loadLeaderBoard = (easyArr, normalArr, hardArr, eLen, nLen, hLen) => {
  // let canvasHeight = canvas.getBoundingClientRect().height
  let colorRnd = Math.floor(Math.random() * 361)
  let percentRnd1 = Math.floor(Math.random() * 101)
  let percentRnd2 = Math.floor(Math.random() * (101 - 10) + 10)
  easyArr.sort((a, b) => {
    return b.score - a.score
  })
  normalArr.sort((a, b) => {
    return b.score - a.score
  })
  hardArr.sort((a, b) => {
    return b.score - a.score
  })
  let closeBtn = document.createElement('span')
  const easyTBody = document.getElementById('easyTBody')
  const normalTBody = document.getElementById('normalTBody')
  const hardTBody = document.getElementById('hardTBody')
  closeBtn.textContent = '❌'
  closeBtn.style.position = 'absolute'
  closeBtn.style.top = '1em'
  closeBtn.style.right = '1em'
  closeBtn.style.cursor = 'pointer'
  highScores.style.backgroundColor = 'hsl(125, 25%, 0%)'
  highScores.style.height = `100vh`
  highScores.style.position = 'absolute'
  highScores.style.boxSizing = 'border-box'
  highScores.style.top = '0'
  highScores.style.left = '0'
  highScores.style.flexFlow = 'column'
  highScores.style.color = 'white'
  highScores.append(closeBtn)
  // EASY
  for(let i = 0; i < eLen; i++) {
    let tr = document.createElement('tr')
    let rank = document.createElement('td')
    let user = document.createElement('td')
    let userScore = document.createElement('td')
    if(i === 0) {
      rank.textContent = `#${i+1}👑`
      user.innerHTML = `<span class="usrName">${easyArr[i].username}</span>`
      userScore.textContent = `${easyArr[i].score}`
    } else {
      rank.textContent = `#${i+1}`
      user.innerHTML = `<span class="usrName">${easyArr[i].username}</span>`
      userScore.textContent = `${easyArr[i].score}`
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
    tr.append(rank)
    tr.append(user)
    tr.append(userScore)
    easyTBody.append(tr)
  }
  // Normal
  for(let i = 0; i < nLen; i++) {
    let tr = document.createElement('tr')
    let rank = document.createElement('td')
    let user = document.createElement('td')
    let userScore = document.createElement('td')
    if(i === 0) {
      rank.textContent = `#${i+1}👑`
      user.innerHTML = `<span class="usrName">${normalArr[i].username}</span>`
      userScore.textContent = `${normalArr[i].score}`
    } else {
      rank.textContent = `#${i+1}`
      user.innerHTML = `<span class="usrName">${normalArr[i].username}</span>`
      userScore.textContent = `${normalArr[i].score}`
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
    tr.append(rank)
    tr.append(user)
    tr.append(userScore)
    normalTBody.append(tr)
  }
  // Hard
  for(let i = 0; i < hLen; i++) {
    let tr = document.createElement('tr')
    let rank = document.createElement('td')
    let user = document.createElement('td')
    let userScore = document.createElement('td')
    if(i === 0) {
      rank.textContent = `#${i+1}👑`
      user.innerHTML = `<span class="usrName">${hardArr[i].username}</span>`
      userScore.textContent = `${hardArr[i].score}`
    } else {
      rank.textContent = `#${i+1}`
      user.innerHTML = `<span class="usrName">${hardArr[i].username}</span>`
      userScore.textContent = `${hardArr[i].score}`
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
    tr.append(rank)
    tr.append(user)
    tr.append(userScore)
    hardTBody.append(tr)
  }
  closeBtn.addEventListener('click', () => {
    highScores.style.display = 'none'
    timesep.style.visibility = 'visible'
  })
}
const createObj = (obj, objLen) => {
  for(let i = 0; i < objLen; i++) {
    if(obj[i].c[1].v === 'Easy') {
      easyScoresArray[i] = {
        username : obj[i].c[0].v,
        mode: obj[i].c[1].v,
        score: obj[i].c[2].v,
      }
      easyLen++
    }
    
    if(obj[i].c[1].v === 'Normal') {
      normalScoresArray[i] = {
        username : obj[i].c[0].v,
        mode: obj[i].c[1].v,
        score: obj[i].c[2].v,
      }
      normalLen++
    }
    
    if(obj[i].c[1].v === 'Hard') {
      hardScoresArray[i] = {
        username : obj[i].c[0].v,
        mode: obj[i].c[1].v,
        score: obj[i].c[2].v,
      }
      hardLen++
    }
    
  }
  if(easyLen > 20) easyLen = 20
  if(normalLen > 20) normalLen = 20
  if(hardLen > 20) hardLen = 20

  loadLeaderBoard(easyScoresArray,normalScoresArray,hardScoresArray, easyLen, normalLen, hardLen)

}

const buildBoard = async () => {
  const fetchedGoogleSheetData = fetch(LEADERBOARD_URL)
    .then(response => response.text())
    .then(data => {
      let colStart = data.indexOf("cols") -2
      const result = (JSON.parse(data.slice(colStart, data.length - 3))).rows
      let resultLength = Object.keys(result).length
      createObj(result, resultLength)
    })



    form.addEventListener('submit', (e) => {
      e.preventDefault()
      modeInput.value = currentMode
      scoreInput.value = count
      const userData = new FormData(form);

      const action = e.target.action
      const submitBtn = document.getElementById('submitBtn')
      play.disabled = true
      play.textContent = 'One more time'
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

document.getElementById('usernameInput').onkeydown = (e) => {
  if(/=/.test(e.key)) {
    return false
  }
}

const leaderboardShow = () => {
  highScores.style.display = 'flex'
  timesep.style.visibility = 'hidden'
}

leaderBtn.addEventListener('click', leaderboardShow)

const contentDivs = document.querySelectorAll('.content')

moviesDiv.addEventListener('scroll', ()=> {
  for (const movie of movies) {
    if(isMobile) {
      if(movie.getBoundingClientRect().left <= window.innerWidth * 0.75  && movie.getBoundingClientRect().left > 0) {
        movie.classList.add('visible')
        handleContentChange(movie.dataset.movie)
      } else {
        movie.classList.remove('visible')
      }
    } else {
      if(movie.getBoundingClientRect().left <= Number(getComputedStyle(highScores).width.substring(0,3)) * 0.75  && movie.getBoundingClientRect().left > 0) {
        movie.classList.add('visible')
        handleContentChange(movie.dataset.movie)
      } else {
        movie.classList.remove('visible')
      }
    }
  }
})

const handleContentChange = id => {
  if(!id) return

  for( const contentDiv of contentDivs) {
    contentDiv.classList.remove('visible')
  }

  document.getElementById(id).classList.add('visible')

}
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
    isMobile = true
    mobileStart(2, 0o0, 4, 'Easy')
  } else {
    isDesktop = true
    start(2, 0o0, 4, 'Easy')
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
    isMobile = true
    mobileStart(1, 0o0, 7, 'Normal')
  } else {
    isDesktop = true
    start(1, 0o0, 7, 'Normal')
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
    isMobile = true
    mobileStart(0, 30, 13, 'Hard')
  } else {
    isDesktop = true
    start(0, 30, 13, 'Hard')
  }
})

play.addEventListener('click', () => {
  window.location.href=window.location.href
})
window.addEventListener("DOMContentLoaded", ()=>{
  window.scrollBy({
    top: window.innerHeight, 
    left: 0,
    behavior: "smooth"})
  buildBoard()
})