

// declare global variables
let coconutCount = 0
let staticModMultiplier = 0
let autoModMultiplier = 0
let autoModIntervalsArray = []
let intervalName = null

// classes
class Modifier {
  constructor(name, price, multiplier, isAuto, seconds) {
    this.name = name
    this.price = price
    this.multiplier = multiplier
    this.inventory = 0
    this.isAuto = isAuto
    if (this.isAuto) {
      this.autoInterval = 1000;
      this.seconds = seconds
    }
  }
}

// objects
let mods = {
  machete: new Modifier('Machete', 30, 1, false),
  toucan: new Modifier('Toucan', 90, 1, true, 1),
  monkey: new Modifier('Monkey', 270, 30, true, 15),
  troop: new Modifier('Troop', 810, 150, true, 30)
}


// gather elements from DOM
let coconutCountElem = document.getElementById('coconutCount')
let targetElem = document.getElementById('target')
let totalStaticModMultiplierElem = document.getElementById('totalStaticModMultiplier')
let totalAutoModMultiplierElem = document.getElementById('totalAutoModMultiplier')

// machete
let macheteBtnElem = document.getElementById('macheteBtn')
let machetePriceElem = document.getElementById('machetePrice')
let macheteCountElem = document.getElementById('macheteCount')
let macheteMultiplierElem = document.getElementById('macheteMultiplier')
// toucan
let toucanBtnElem = document.getElementById('toucanBtn')
let toucanPriceElem = document.getElementById('toucanPrice')
let toucanCountElem = document.getElementById('toucanCount')
let toucanMultiplierElem = document.getElementById('toucanMultiplier')
// monkey
let monkeyBtnElem = document.getElementById('monkeyBtn')
let monkeyPriceElem = document.getElementById('monkeyPrice')
let monkeyCountElem = document.getElementById('monkeyCount')
let monkeyMultiplierElem = document.getElementById('monkeyMultiplier')
// troop
let troopBtnElem = document.getElementById('troopBtn')
let troopPriceElem = document.getElementById('troopPrice')
let troopCountElem = document.getElementById('troopCount')
let troopMultiplierElem = document.getElementById('troopMultiplier')



// functions


let setAutoModInterval = (mod, seconds) => {
  intervalName = mod.name.toString().toLowerCase()
  autoModIntervalsArray[intervalName] = setInterval(() => {
    coconutCount += mod.multiplier ; draw()
  }, mod.autoInterval * seconds)

  console.log('setAutoModInterval ' + intervalName)
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
  if (coconutCount >= mod.price) {
    coconutCount -= mod.price
    mod.inventory++
    mod.price += Math.ceil(mod.price * 0.15)
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