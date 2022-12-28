git// object using shorthand keys

const genFuncs = {
  randomLowCase,
  randomUpCase,
  randomNum,
  randomSpec
};


//lower case letters
function randomLowCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26 + 97));
};

// upper case letters
function randomUpCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26 + 65));
};

// numbers
function randomNum() {
  return String.fromCharCode(Math.floor(Math.random() * 10 + 48))
};

// special characters
function randomSpec() {
  const specChar = '!@#$%^&*()_-+={}[]|/<>,.';
  return specChar[Math.floor(Math.random() * specChar.length)];
};

// beginning of askQuestions func
function askQuestions() {
  let charCount = parseInt(prompt("How many characters"));
  // let response = +prompt("How many characters");
  if (isNaN(charCount) || charCount < 8 || charCount > 128) {
    alert("Please enter a valid number from 8 - 128")
    throw new Error("INVALID_CHAR_COUNT")
    //return false;
  };

  const hasSpecChar = confirm("Do you want to use special characters");

  const hasLowChar = confirm("Do you want to use lowercase characters");

  const hasUpChar = confirm("Do you want to use uppercase characters");

  const hasNumChar = confirm("Do you want to use numeric characters");

  if (!hasSpecChar && !hasLowChar && !hasNumChar && !hasUpChar) {
    alert("must choose at least one character type !!!");
    //for humans
    throw new Error("NO_VALID_CHAR_TYPE")
    // for the machine
  }

  return {
    charCount: charCount,
    hasSpecChar: hasSpecChar,
    hasLowChar: hasLowChar,
    hasUpChar: hasUpChar,
    hasNumChar: hasNumChar
  }

};

// end of askQuestions func

// checking if requirements are met for password to continue
function doesPassMeetReq(requirements, password) {

  if (requirements.charCount !== password.length) {
    return false
  }

  return true

}


function genCharacter(requirements) {

  // possible functions to generate character
  let supportedFunctions = []

  // add each supported type function to array

  if (requirements.hasNumChar) {
    supportedFunctions.push(genFuncs.randomNum)
  }

  if (requirements.hasSpecChar) {
    supportedFunctions.push(genFuncs.randomSpec)
  }

  if (requirements.hasUpChar) {
    supportedFunctions.push(genFuncs.randomUpCase)
  }

  if (requirements.hasLowChar) {
    supportedFunctions.push(genFuncs.randomLowCase)
  }

  const character = supportedFunctions[Math.floor(Math.random() * supportedFunctions.length)]()

  return character
}

function jumble(str) {
  // Convert the string to an array of characters and use 
  // the sort method to rearrange them randomly
  return str.split('').sort(() => Math.random() - 0.5).join('');
}


function generatePassword() {
  let requirements = askQuestions();

  let password = '';

  if (requirements.hasNumChar) {
    password += genFuncs.randomNum()
  }

  if (requirements.hasSpecChar) {
    password += genFuncs.randomSpec()
  }

  if (requirements.hasUpChar) {
    password += genFuncs.randomUpCase()
  }

  if (requirements.hasLowChar) {
    password += genFuncs.randomLowCase()
  }

  //loop until password is the right length
  while (password.length < requirements.charCount) {

    // add random character to password
    password += genCharacter(requirements);

  };

  password = jumble(password)


  return password;
};



// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

const generateBtn = document.querySelector("#generate");

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

















