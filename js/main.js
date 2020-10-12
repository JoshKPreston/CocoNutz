
// classes
class Modifier {
  constructor(name, price, multiplier, isAuto) {
    this.name = name
    this.price = price
    this.multiplier = multiplier
    this.inventory = 0
    this.isAuto = isAuto
    this.isAvailable = false
  }
}

let mods = {
  machete: new Modifier('Machete', 30, 1, false),
  toucan: new Modifier('Toucan', 90, 1, true),
  monkey: new Modifier('Monkey', 270, 10, true),
  troop: new Modifier('Troop', 810, 15, true)
}

let modElems = {
  machete: {
    macheteBtnElem: document.getElementById('macheteBtn'),
    machetePriceElem: document.getElementById('machetePrice'),
    machetePriceDivElem: document.getElementById('machetePriceDiv'),
    macheteCountElem: document.getElementById('macheteCount'),
    macheteMultiplierElem: document.getElementById('macheteMultiplier'),
    macheteOverlayElem: document.getElementById('macheteOverlay')
  },
  toucan: {
    toucanBtnElem: document.getElementById('toucanBtn'),
    toucanPriceElem: document.getElementById('toucanPrice'),
    toucanPriceDivElem: document.getElementById('toucanPriceDiv'),
    toucanCountElem: document.getElementById('toucanCount'),
    toucanMultiplierElem: document.getElementById('toucanMultiplier'),
    toucanOverlayElem: document.getElementById('toucanOverlay')
  },
  monkey: {
    monkeyBtnElem: document.getElementById('monkeyBtn'),
    monkeyPriceElem: document.getElementById('monkeyPrice'),
    monkeyPriceDivElem: document.getElementById('monkeyPriceDiv'),
    monkeyCountElem: document.getElementById('monkeyCount'),
    monkeyMultiplierElem: document.getElementById('monkeyMultiplier'),
    monkeyOverlayElem: document.getElementById('monkeyOverlay')
  },
  troop: {
    troopBtnElem: document.getElementById('troopBtn'),
    troopPriceElem: document.getElementById('troopPrice'),
    troopPriceDivElem: document.getElementById('troopPriceDiv'),
    troopCountElem: document.getElementById('troopCount'),
    troopMultiplierElem: document.getElementById('troopMultiplier'),
    troopOverlayElem: document.getElementById('troopOverlay')
  }
}

// declare global variables
let currentUser = {}
let coconutCount = 0
let staticModMultiplier = 0
let autoModMultiplier = 0
let priceIncrementValue = 0.15

// gather elements from DOM
let coconutCountElem = document.getElementById('coconutCount')
let targetElem = document.getElementById('target')
let totalStaticModMultiplierElem = document.getElementById('totalStaticModMultiplier')
let totalAutoModMultiplierElem = document.getElementById('totalAutoModMultiplier')
let modifiersElem = document.getElementsByClassName('modifier')
let messageBoxElem = document.getElementById('messageBox')
let userFormElem = document.getElementById('userForm')
let currentUserNameElem = document.getElementById('currentUserName')
let topScoreElem = document.getElementById('topScore')

// functions

let hasEnoughCocos = mod => coconutCount >= mod.price ? true : false
let setScores = () => {
  coconutCount += autoModMultiplier
  if (coconutCount > currentUser.topScore) {
    currentUser.topScore = coconutCount
    saveUsers()
  }
  draw()
}
let addClass = (elem, className) => elem.classList.add(className)
let removeClass = (elem, className) => elem.classList.remove(className)

// intervals
let autoGatherInterval = setInterval(setScores, 1000)

let checkModAvailability = () => {
  for (const key in mods) {
    if (mods.hasOwnProperty(key)) {
      const mod = mods[key];
      let elem = null
      switch (mod.name.toString().toLowerCase()) {
        case 'machete':
          elem = {
            overlay: modElems.machete.macheteOverlayElem,
            button: modElems.machete.macheteBtnElem,
            price: modElems.machete.machetePriceDivElem,
            inventory: modElems.machete.macheteCountElem
          }
          break
        case 'toucan':
          elem = {
            overlay: modElems.toucan.toucanOverlayElem,
            button: modElems.toucan.toucanBtnElem,
            price: modElems.toucan.toucanPriceDivElem,
            inventory: modElems.toucan.toucanCountElem
          }
          break
        case 'monkey':
          elem = {
            overlay: modElems.monkey.monkeyOverlayElem,
            button: modElems.monkey.monkeyBtnElem,
            price: modElems.monkey.monkeyPriceDivElem,
            inventory: modElems.monkey.monkeyCountElem
          }
          break
        case 'troop':
          elem = {
            overlay: modElems.troop.troopOverlayElem,
            button: modElems.troop.troopBtnElem,
            price: modElems.troop.troopPriceDivElem,
            inventory: modElems.troop.troopCountElem
          }
          break
        default:
          console.log('checkModAvailability function did not find any matching case statement for switch (mod.name)')
          break
      }

      // check mod availability and make class changes accordingly
      if (hasEnoughCocos(mod)) {
        removeClass(elem.overlay, 'mod-not-available')
        removeClass(elem.price, 'price-counter-red')
        removeClass(elem.button, 'roll-in-left')
        removeClass(elem.button, 'roll-in-bottom')
        removeClass(elem.button, 'roll-in-top')
        removeClass(elem.button, 'roll-in-right')
        addClass(elem.button, 'vibrate-3')
      } else {
        removeClass(elem.button, 'vibrate-3')
        addClass(elem.overlay, 'mod-not-available')
        addClass(elem.price, 'price-counter-red')
      }

      // check inventory and make class changes accordingly
      if (mod.inventory > 0) {
        addClass(elem.inventory, 'inv-counter-green')
      }

      if (coconutCount >= 10000) { acheivementPopup() }
    }
  }
}
let checkModAvailabilityInterval = setInterval(checkModAvailability, 100)


// functions
let popup1M = 0
let acheivementPopup = () => {
  if (!popup1M) {
    messageBoxElem.innerHTML = /* html */ `
    <div class="row h-100 justify-content-center align-items-center msg-box-row">
      <div class="col-12 col-md-8 col-lg-6 msg-box-col">
        <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
          <div class="card-header">Achievement Unlocked!</div>
          <div class="card-body">
            <h5 class="card-title">+10,000 CocoNutz!</h5>
            <p class="card-text">Somehow, you've managed to reach ultimate idleness! Some would call you nutz!<br>
            <small>Your purchasable CocoBuffs have been quadrupled for 5 minutes!</small></p>
          </div>
        </div>
      </div>
    </div>  
    `
    messageBoxElem.classList.remove("hidden")
    setTimeout(() => {
      messageBoxElem.classList.add("hidden")
    }, 10000);

    mods.machete.multiplier = mods.machete.multiplier * 4
    mods.toucan.multiplier = mods.toucan.multiplier * 4
    mods.monkey.multiplier = mods.monkey.multiplier * 4
    mods.troop.multiplier = mods.troop.multiplier * 4

    addClass(modElems.machete.macheteMultiplierElem, 'inv-counter-green')
    addClass(modElems.toucan.toucanMultiplierElem, 'inv-counter-green')
    addClass(modElems.monkey.monkeyMultiplierElem, 'inv-counter-green')
    addClass(modElems.troop.troopMultiplierElem, 'inv-counter-green')


    setTimeout(() => {
      mods.machete.multiplier = mods.machete.multiplier / 4
      mods.toucan.multiplier = mods.toucan.multiplier / 4
      mods.monkey.multiplier = mods.monkey.multiplier / 4
      mods.troop.multiplier = mods.troop.multiplier / 4

      removeClass(modElems.machete.macheteMultiplierElem, 'inv-counter-green')
      removeClass(modElems.toucan.toucanMultiplierElem, 'inv-counter-green')
      removeClass(modElems.monkey.monkeyMultiplierElem, 'inv-counter-green')
      removeClass(modElems.troop.troopMultiplierElem, 'inv-counter-green')

    }, 300000);

    popup1M = 1
  }
}

let sumMods = mod => {
  if (mod.isAuto) {
    autoModMultiplier += mod.multiplier
  } else {
    staticModMultiplier += mod.multiplier
  }
  draw()
}

let applyMod = strModName => {
  let mod = mods[strModName]
  if (hasEnoughCocos(mod)) {
    coconutCount -= mod.price
    mod.price += Math.ceil(mod.price * priceIncrementValue)
    mod.inventory++
    sumMods(mod)
  }
}

let gather = () => {
  coconutCount += staticModMultiplier
  coconutCount++
  draw()
}


let getSetUser = (event) => {
  event.preventDefault()
  let form = event.target
  let userName = form.userName.value
  currentUser = users.find(user => user.name == userName)
  if (!currentUser) {
    currentUser = {
      name: userName,
      topScore: 0
    }
    users.push(currentUser)
  }
  form.reset()
  messageBoxElem.classList.add("hidden")
  targetElem.classList.remove('hidden')
  modElems.machete.macheteBtnElem.classList.remove('hidden')
  modElems.toucan.toucanBtnElem.classList.remove('hidden')
  modElems.monkey.monkeyBtnElem.classList.remove('hidden')
  modElems.troop.troopBtnElem.classList.remove('hidden')
  targetElem.classList.add('roll-in-top')
  modElems.machete.macheteBtnElem.classList.add('roll-in-left')
  modElems.toucan.toucanBtnElem.classList.add('roll-in-bottom')
  modElems.monkey.monkeyBtnElem.classList.add('roll-in-top')
  modElems.troop.troopBtnElem.classList.add('roll-in-right')
  draw()
}

let saveUsers = () => window.localStorage.setItem("users", JSON.stringify(users))

let users = []
let loadUsers = () => {
  let usersData = JSON.parse(window.localStorage.getItem("users"))
  if (usersData) { users = usersData }
}
loadUsers()



// templates

$(document).ready(() => {
  messageBoxElem.innerHTML = /* html */ `
  <div class="row h-100 justify-content-center align-items-center msg-box-row">
    <div class="col-12 col-md-8 col-lg-6 msg-box-col">

      <form id="userForm" onsubmit="getSetUser(event)" class="form-group text-center msg-box-form">
        <label for="userName"></label>
        <input id="userName" type="text" class="form-control text-center" name="userName" 
          aria-describedby="emailHelpId" placeholder="Enter Name">
        <button id="userFormSubmit" type="submit" class="btn btn-danger btn-block">GO NUTZ!</button>
      </form>
        
    </div>
  </div>  
  `

  // prevent default action on form submit
  const userForm = document.getElementById('userForm')

  userForm.addEventListener('submit', (e) => {
    e.preventDefault(); console.log('User signed in...')
  })
})


let draw = () => {
  coconutCountElem.innerText = coconutCount.toString()
  totalStaticModMultiplierElem.innerText = staticModMultiplier.toString()
  totalAutoModMultiplierElem.innerText = autoModMultiplier.toString()
  if (currentUser.name) {
    currentUserNameElem.innerText = currentUser.name.toString()
    topScoreElem.innerText = currentUser.topScore.toString()
  }



  modElems.machete.machetePriceElem.innerText = mods.machete.price.toString()
  modElems.machete.macheteCountElem.innerText = mods.machete.inventory.toString()
  modElems.machete.macheteMultiplierElem.innerText = mods.machete.multiplier.toString()

  modElems.toucan.toucanPriceElem.innerText = mods.toucan.price.toString()
  modElems.toucan.toucanCountElem.innerText = mods.toucan.inventory.toString()
  modElems.toucan.toucanMultiplierElem.innerText = mods.toucan.multiplier.toString()

  modElems.monkey.monkeyPriceElem.innerText = mods.monkey.price.toString()
  modElems.monkey.monkeyCountElem.innerText = mods.monkey.inventory.toString()
  modElems.monkey.monkeyMultiplierElem.innerText = mods.monkey.multiplier.toString()

  modElems.troop.troopPriceElem.innerText = mods.troop.price.toString()
  modElems.troop.troopCountElem.innerText = mods.troop.inventory.toString()
  modElems.troop.troopMultiplierElem.innerText = mods.troop.multiplier.toString()

  // console.log('draw coconutCount = ' + coconutCount)
  // console.log('... regularClick ' + 1)
  // console.log('... staticModMultiplier ' + staticModMultiplier)
  // console.log('... autoModMultiplier ' + autoModMultiplier)
}

draw()