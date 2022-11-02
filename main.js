const inputElements = document.querySelectorAll('.input-element')
const resetInputs = document.querySelectorAll('.reset-input')
const numLock = document.querySelector('.num-lock ul')
const submitBtn = document.querySelector('.submit')
const form = document.querySelector('.login-form')

// suffle numbers 0-9 
let suffledArr = suffleNumsArray(0,1,2,3,4,5,6,7,8,9)
let clientNums
let sixNumsSecret = []

// create & append
for(let i = 0; i < 10; i++) {
  // nums keybord
  const li = document.createElement('li')
  li.textContent = suffledArr[i]
  numLock.append(li)
  
  li.addEventListener('click', e => {
    if(sixNumsSecret.length < 6) sixNumsSecret.push(+e.target.textContent)

    // fill the input with the stars
    inputElements[1].value += '*'

    // test
    if(inputElements[1].value.length >= 6) {
      submitBtn.disabled = true
      inputElements[1].value = renderSecretCode() 
      return
    }

    const regex = /^[*]{6,7}$/
    if(!regex.test(inputElements[1].value) || (!inputElements[0].value)) {
      submitBtn.disabled = true
      return
    }

    // only keep the first 6 chars
    submitBtn.disabled = false
    inputElements[1].value = renderSecretCode()  
  })  
}

// input
inputElements.forEach(inputEl => {
  inputEl.addEventListener('keyup', e => {
    const regex = /^[0-9]{10}$/
    const value = e.target.value

    if(!regex.test(value) || sixNumsSecret.length < 6) {
      submitBtn.disabled = true
    } else {
      submitBtn.disabled = false
      clientNums = +e.target.value
    }
  })
})

resetInputs.forEach(resetEl => {
  resetEl.addEventListener('click', (e) => {
    e.target.previousElementSibling.value = ''
    submitBtn.disabled = true
  })
})

// submit
form.addEventListener('submit', e => {
  e.preventDefault()

  console.log(+clientNums);
  console.log(...sixNumsSecret);
  sixNumsSecret = []
  form.reset()
})

// functions declarations
function suffleNumsArray(...nums) {
  return nums.sort((a, b) => 0.5 - Math.random());
}

function renderSecretCode() {
  let html = ''
  for(let i = 0; i < 6; i++) {
    html += `${inputElements[1].value[i]}`
  }

  if(html) return html
}
