

// declare global variables
let coconutCount = 0
let staticModMultiplier = 0
let autoModMultiplier = 0
let autoModIntervalsArray = []
let modAvailabilityIntervalsArray = []
let intervalName = null
let priceIncrementValue = 0.15

// classes
class Modifier {
  constructor(name, price, multiplier, isAuto, seconds) {
    this.name = name
    this.price = price
    this.multiplier = multiplier
    this.inventory = 0
    this.isAvailable = false
    this.isAuto = isAuto
    if (this.isAuto) {
      this.autoInterval = 1000;
      this.seconds = seconds
    }
  }
}

// objects
/*
30
90
270
810
*/
let mods = {
  machete: new Modifier('Machete', 30, 1, false),
  toucan: new Modifier('Toucan', 90, 1, true, 1),
  monkey: new Modifier('Monkey', 270, 10, true, 5),
  troop: new Modifier('Troop', 810, 15, true, 3)
}


// gather elements from DOM
let coconutCountElem = document.getElementById('coconutCount')
let targetElem = document.getElementById('target')
let totalStaticModMultiplierElem = document.getElementById('totalStaticModMultiplier')
let totalAutoModMultiplierElem = document.getElementById('totalAutoModMultiplier')
let modifiersElem = document.getElementsByClassName('modifier')

// machete
let macheteBtnElem = document.getElementById('macheteBtn')
let machetePriceElem = document.getElementById('machetePrice')
let machetePriceDivElem = document.getElementById('machetePriceDiv')
let macheteCountElem = document.getElementById('macheteCount')
let macheteMultiplierElem = document.getElementById('macheteMultiplier')
let macheteOverlayElem = document.getElementById('macheteOverlay')

// toucan
let toucanBtnElem = document.getElementById('toucanBtn')
let toucanPriceElem = document.getElementById('toucanPrice')
let toucanPriceDivElem = document.getElementById('toucanPriceDiv')
let toucanCountElem = document.getElementById('toucanCount')
let toucanMultiplierElem = document.getElementById('toucanMultiplier')
let toucanOverlayElem = document.getElementById('toucanOverlay')

// monkey
let monkeyBtnElem = document.getElementById('monkeyBtn')
let monkeyPriceElem = document.getElementById('monkeyPrice')
let monkeyPriceDivElem = document.getElementById('monkeyPriceDiv')
let monkeyCountElem = document.getElementById('monkeyCount')
let monkeyMultiplierElem = document.getElementById('monkeyMultiplier')
let monkeyOverlayElem = document.getElementById('monkeyOverlay')

// troop
let troopBtnElem = document.getElementById('troopBtn')
let troopPriceElem = document.getElementById('troopPrice')
let troopPriceDivElem = document.getElementById('troopPriceDiv')
let troopCountElem = document.getElementById('troopCount')
let troopMultiplierElem = document.getElementById('troopMultiplier')
let troopOverlayElem = document.getElementById('troopOverlay')



// functions

let hasEnoughCocos = mod => coconutCount >= mod.price ? true : false

let addClass = (elem, className) => {
  elem.classList.add(className)
}

let removeClass = (elem, className) => {
  elem.classList.remove(className)
}

let checkModAvailability = mod => {
  let elem = null
  switch (mod.name.toString().toLowerCase()) {
    case 'machete':
      elem = {
        overlay: macheteOverlayElem, 
        button: macheteBtnElem,
        price: machetePriceDivElem
      }
      break
    case 'toucan':
      elem = {
        overlay: toucanOverlayElem, 
        button: toucanBtnElem,
        price: toucanPriceDivElem
      }
      break
    case 'monkey':
      elem = {
        overlay: monkeyOverlayElem, 
        button: monkeyBtnElem,
        price: monkeyPriceDivElem
      }
      break
    case 'troop':
      elem = {
        overlay: troopOverlayElem, 
        button: troopBtnElem,
        price: troopPriceDivElem
      }
      break
    default:
      console.log('checkModAvailability function did not find any matching case statement for switch (mod.name)')
      break
  }
  if (hasEnoughCocos(mod)) {
      removeClass(elem.overlay, 'mod-not-available')
      removeClass(elem.price, 'price-counter-red')
      removeClass(elem.button, 'roll-in-left')
      removeClass(elem.button, 'roll-in-top')
      removeClass(elem.button, 'roll-in-right')
      addClass(elem.button, 'vibrate-3')
  } else {
      addClass(elem.overlay, 'mod-not-available')
      addClass(elem.price, 'price-counter-red')
      removeClass(elem.button, 'vibrate-3')
  }
}

let setCheckModAvailabilityInterval = miliseconds => {
  for (const key in mods) {
    if (mods.hasOwnProperty(key)) {
      const mod = mods[key];
      intervalName = mod.name.toString().toLowerCase()
      modAvailabilityIntervalsArray[intervalName] = setInterval(checkModAvailability, miliseconds, mod)
    }
  }
}

let setAutoModInterval = (mod, seconds) => {
  intervalName = mod.name.toString().toLowerCase()
  autoModIntervalsArray[intervalName] = setInterval(() => {
    coconutCount += mod.multiplier; draw()
  }, mod.autoInterval * seconds)
}

let sumMods = mod => {
  if (mod.isAuto) {
    let seconds = mod.seconds
    autoModMultiplier += mod.multiplier
    setAutoModInterval(mod, seconds)
  } else {
    staticModMultiplier += mod.multiplier
  }
  draw()
}

let applyMod = strModName => {
  let mod = mods[strModName]
  if (hasEnoughCocos(mod)) {
    coconutCount -= mod.price
    mod.inventory++
    mod.price += Math.ceil(mod.price * priceIncrementValue)
    sumMods(mod)
  }
}

let gather = () => {
  coconutCount += staticModMultiplier
  coconutCount++
  draw()
}

let draw = () => {
  coconutCountElem.innerText = coconutCount.toString()
  totalStaticModMultiplierElem.innerText = staticModMultiplier.toString()
  totalAutoModMultiplierElem.innerText = autoModMultiplier.toString()

  machetePriceElem.innerText = mods.machete.price.toString()
  macheteCountElem.innerText = mods.machete.inventory.toString()
  macheteMultiplierElem.innerText = mods.machete.multiplier.toString()

  toucanPriceElem.innerText = mods.toucan.price.toString()
  toucanCountElem.innerText = mods.toucan.inventory.toString()
  toucanMultiplierElem.innerText = mods.toucan.multiplier.toString()

  monkeyPriceElem.innerText = mods.monkey.price.toString()
  monkeyCountElem.innerText = mods.monkey.inventory.toString()
  monkeyMultiplierElem.innerText = mods.monkey.multiplier.toString()

  troopPriceElem.innerText = mods.troop.price.toString()
  troopCountElem.innerText = mods.troop.inventory.toString()
  troopMultiplierElem.innerText = mods.troop.multiplier.toString()


  // console.log('draw coconutCount = ' + coconutCount)
  // console.log('... regularClick ' + 1)
  // console.log('... staticModMultiplier ' + staticModMultiplier)
  // console.log('... autoModMultiplier ' + autoModMultiplier)
}

draw()

setCheckModAvailabilityInterval(100)