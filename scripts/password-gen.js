const inputslider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const upperCaseCheck = document.querySelector("#uppercase");
const lowerCaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[dataindicator]");
const generateBtn = document.querySelector(".generate-btn");
const allCheckBox = document.querySelector("input[type=checkbox]");
const symbols = '*&^$#@!~`-_+=><.,/?;:"(){}[]';

//starting my password.
//starting my password length
//starting the uppercase checkbox
//starting my indicator grey too
let password = "";
let passwordLength = 10;
let checkCounter = 0;
handleSlider();
//start strength color to grey
setindicator("#ccc");

//set password length and slider

function handleSlider() {
  inputslider.value = passwordLength;
  //password length should be at least 10
  lengthDisplay.innerText = passwordLength;
  const min = inputslider.min;
  const max = inputslider.max;

  inputslider.style.backgroundSize = ((passwordLength = min) * 100) / (max - min) + "%100%"
}

//color set
//shadow set

function setindicator(color) {
  indicator.style.backgroundColor = color;
  //shadow
  indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

//min,max random integer findout

function getRandomInterger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomInterger() {
  return getRandomInterger(0, 9);
}

function generateLowerCase() {
  //get assess value of 97 to 123
  return String.fromCharCode(getRandomInterger(97, 123));
}

function generateUpperCase() {
  //get assess value of 65 to 91
  return String.fromCharCode(getRandomInterger(65, 91));
}

//generate random symbols in the password input
function generateSymbol() {
  const randNum = getRandomInterger(0, symbols.length);

  return symbols[randNum];
}

//to calculate strength of password on basis of some rules, indicator and colors
function calculateStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSymbol = false;

  if (upperCaseCheck.checked) {
    hasUpper = true;
  }
  if (lowerCaseCheck.checked) {
    hasLower = true;
  }
  if (numberCheck.checked) {
    hasNum = true;
  }
  if (symbolCheck.checked) {
    hasSymbol = true
  }

  if (hasUpper && hasLower && (hasNum || hasSymbol) && passwordLength >= 8) {
    setindicator("#0f0");
  } else if (
    (hasLower || hasUpper) &&
    (hasNum || hasSymbol) &&
    passwordLength >= 6
  ) {
    setindicator("#ff0");
  } else {
    setindicator("#f00")
  }
} 

//clipboard api
//async function
//content password display
//write text method, promise return

async function copyContent() {
  //promise resolve or reject so user can give in and try, catch block
  //copy message invisible
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "copied";
  } catch(error) {
    copyMsg.innerText = "failed";
  }
  //to make copy wall spam visible
  copyMsg.classList.add("active");

  setTimeout(() => {
    copyMsg.classList.remove("active");
  }, 2000);
}

//to addEvent listener on the slider and change values

inputslider.addEventListener("input", (e) => {
  //update password length
  passwordLength = e.target.value;

  handleSlider();
})

copyBtn.addEventListener("click", () => {
  if (passwordDisplay.value) {
    copyContent();
  }
})

function handleCheckBoxChange() {
  checkCounter = 0;
  allCheckBox.forEach((checkbox) => {
    if (checkbox.checked) {
      checkCounter++;
    }
  });

  //special condition of password length no of checkbox count

  if (passwordLength < checkCounter) {
    passwordLength = checkCounter;
    handleSlider();
  }
}

//add an event listener to the checkbox,tick and untick
allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckBoxChange)
});

//to generate a shuffle password

function shufflePassword(array) {
  //fisher yates method
  for (let i = Array.length -1; i > 0; i--) {
    //random j, find out using random function
    const j = Math.floor(Math.random() = (i + 1));
    //swap number at index i and index j
    array[i] = array[j];
    array[j] = temp;
  }
  let str = "";
  array.forEach((el) => (str += el));
  return str;
}

//generate password
generateBtn.addEventListener("click", () => {
  if  (checkCounter == 0) {
    return;
  }

  if (passwordLength < checkCounter) {
    passwordLength = checkCounter;
    handleSlider();
  }

  //console.log("starting the journey");
  //let's start the journey to find a new password
  //remove old password
  let password = "";
  //check password if checckbox is checked
  //if (upperCaseCheck.checked) {
  // password = genrateUpperCase();
  //}
  //if (lowerCaseCheck.checked) {
  // password = genrateLowerCase();
  //}
  //if (numberCheck.checked) {
  // password = genrateRandomInterger();
  //}
  //if (symbolCheck.checked) {
  // password = genrateSymbols();
  //}
  //suppose 10 password length this is for upper wall random

  let funcArr = [];
  if (upperCaseCheck.checked) {
    funcArr.push(generateUpperCase);
  }
  if (lowerCaseCheck.checked) {
    funcArr.push(generateLowerCase);
  }
  if (numberCheck.checked) {
    funcArr.push(generateRandomInterger);
  }
  if (symbolCheck.checked) {
    funcArr.push(generateSymbol);
  }

  //compulsory addition
  //using for loop

  for (let i = 0; i < funcArr.length; i++) {
    password += funcArr[i]();
  }

  const p = password;
  if (p += funcArr) {
    console.log("compulsory addition done")
  }

  //console.log("compulsory addition Done");
  //remaining addition

  for (let i = 0; i < passwordLength - funcArr.length; i++) {
    let randIndex = getRandomInterger(0, funcArr.length);

    password += funcArr[randIndex]();
  }
  //console.log remaining addition done

  //shuffle password in array
  password = shufflePassword(Array.from(password));
  //console.log("shuffling done");
  passwordDisplay.value = password;
  //console.log("Ui addition done");
  //password strength
  calculateStrength();
})

