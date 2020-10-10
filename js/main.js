

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
  machete: new Modifier('Machete', 1, 1, false),
  picker: new Modifier('Picker', 1, 5, false),
  monkey: new Modifier('Monkey', 1, 15, true, 3),
  troop: new Modifier('Troop', 1, 50, true, 5)
}


// gather elements from DOM
let coconutCountElem = document.getElementById('coconutCount')
let targetElem = document.getElementById('target')

let macheteCountElem = document.getElementById('macheteCount')
let pickerCountElem = document.getElementById('pickerCount')
let monkeyCountElem = document.getElementById('monkeyCount')
let troopCountElem = document.getElementById('troopCount')

let macheteBtnElem = document.getElementById('macheteBtn')
let pickerBtnElem = document.getElementById('pickerBtn')
let monkeyBtnElem = document.getElementById('monkeyBtn')
let troopBtnElem = document.getElementById('troopBtn')


// functions



let setAutoModInterval = (mod, autoModMultiplier, seconds) => {
  intervalName = mod.name.toString().toLowerCase()
  if (!autoModIntervalsArray[intervalName]) {
    autoModIntervalsArray[intervalName] = setInterval(() => {coconutCount += autoModMultiplier; draw()}, mod.autoInterval * seconds)
  }
  console.log('setAutoModInterval ' + intervalName)
}

let sumMods = mod => {
  if (mod.isAuto) {
    let seconds = mod.seconds
    autoModMultiplier += mod.multiplier
    setAutoModInterval(mod, autoModMultiplier, seconds)
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
    mod.price += Math.floor(mod.price * 1.15)
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
  macheteCountElem.innerText = mods.machete.inventory.toString()
  pickerCountElem.innerText = mods.picker.inventory.toString()
  monkeyCountElem.innerText = mods.monkey.inventory.toString()
  troopCountElem.innerText = mods.troop.inventory.toString()
  console.log('draw coconutCount = ' + coconutCount)
  console.log('... regularClick ' + 1)
  console.log('... staticModMultiplier ' + staticModMultiplier)
  console.log('... autoModMultiplier ' + autoModMultiplier)
}

draw()