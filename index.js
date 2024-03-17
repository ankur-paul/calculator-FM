"use strict";

// ***************************
// THEME MAMIPULATION
// ***************************

const stylesheet = document.getElementById("themeStylesheet");
const themeCircles = document.querySelectorAll(".theme-circle");
const [themeCircle1, themeCircle2, themeCircle3] = themeCircles;

// Theme Manipulation FUNCTION
const changeTheme = (theme = "theme1") => {
  if (theme === "theme2") {
    themeCircle1.classList.remove("active-theme");
    themeCircle3.classList.remove("active-theme");
    themeCircle2.classList.add("active-theme");
    stylesheet.href = "css/theme2.css";

    console.log(themeCircle2);
  } else if (theme === "theme3") {
    themeCircle1.classList.remove("active-theme");
    themeCircle2.classList.remove("active-theme");
    themeCircle3.classList.add("active-theme");
    stylesheet.href = "css/theme3.css";

    console.log(themeCircle3);
  } else if (theme === "theme1") {
    themeCircle2.classList.remove("active-theme");
    themeCircle3.classList.remove("active-theme");
    themeCircle1.classList.add("active-theme");
    stylesheet.href = "css/theme1.css";

    console.log(themeCircle1);
  }
};

const labelTheme = document.querySelector(".label--theme");

// THEME MANIPULATION USING "theme" LABEL
labelTheme.addEventListener("click", () => {
  for (const [i, themeCircle] of themeCircles.entries()) {
    if (themeCircle.classList.contains("active-theme")) {
      themeCircle.classList.remove("active-theme");
      if (i === 0 || i === 1) {
        changeTheme(`theme${i + 2}`);
        break;
      } else if (i === 2) {
        changeTheme(`theme1`);
        break;
      }
    }
  }
});

// THEME MANIPULATION USING THEME SELECTOR CIRCLES
themeCircles.forEach((el, i, list) => {
  el.addEventListener("click", () => {
    if (el.classList.contains("theme-circle--1")) {
      changeTheme("theme1");
    } else if (el.classList.contains("theme-circle--2")) {
      changeTheme("theme2");
    } else if (el.classList.contains("theme-circle--3")) {
      changeTheme("theme3");
    }
  });
});

// ***************************
// DOING CALCULATIONS
// ***************************

// KEY PRESS EVENTS
let keyPressed;
document.addEventListener("keydown", (e) => (keyPressed = e.key));
console.log(keyPressed);

// WORKING WITH BUTTONS
const calcBtns = document.querySelectorAll(".calc-btn");
const displayBox = document.querySelector(".display-box");
const btnDel = document.querySelector(".calc-btn--del");
const btnReset = document.querySelector(".calc-btn--reset");
const btnEquals = document.querySelector(".calc-btn--equals");
let displayString = `${displayBox.value}`;
let step = 1;
let optr;
let firstNumArr = [];
let secondNumArr = [];

// Reset Calc FUNCTION
function resetCalc() {
  step = 1;
  firstNumArr = [];
  secondNumArr = [];
  optr = "";
  displayBox.value = "";
}

// Onscreen buttons Press Events
calcBtns.forEach((el) => {
  el.addEventListener("click", () => {
    // Working of Number Buttons
    if (step === "reset") displayBox.value = "Click RESET";
    else if (el != btnDel && el != btnReset && el != btnEquals) {
      displayBox.value += el.textContent;
      displayString = displayBox.value;
      const num = Number.parseInt(el.textContent);

      // Step 1 of calculation
      if (step === 1) {
        if (num >= 0) firstNumArr.push(num);
        else if (el.value === "." && !firstNumArr.includes("."))
          firstNumArr.push(".");
        else if (el.classList.contains("calc-btn--optr")) {
          optr = el.value;
          step = 2;
        }
      }

      // Step 2 of calculation
      else if (step === 2) {
        if (num >= 0) secondNumArr.push(num);
        else if (el.value === "." && !secondNumArr.includes("."))
          secondNumArr.push(".");
        else if (el.classList.contains("calc-btn--optr")) {
          alert("Only 2-step calculations valid.");
          displayBox.value = displayString.slice(0, -1);
        }
      }
      // Calculation Done
      else if (step === "reset") displayBox.value = "Press RESET";
    }

    // Working of Equals button
    else if (el === btnEquals) {
      const firstNum = Number(firstNumArr.join(""));
      const secondNum = Number(secondNumArr.join(""));
      console.log(firstNum);
      console.log(secondNum);

      if (optr === "+") displayBox.value = `= ${firstNum + secondNum}`;
      if (optr === "-") displayBox.value = `= ${firstNum - secondNum}`;
      if (optr === "x") displayBox.value = `= ${firstNum * secondNum}`;
      if (optr === "/")
        displayBox.value = `= ${
          `${firstNum / secondNum}`.includes(".")
            ? (firstNum / secondNum).toFixed(5)
            : firstNum / secondNum
        }`;

      firstNumArr = [];
      secondNumArr = [];
      step = "reset";
    }

    // Working of Del button
    if (el === btnDel && Number(displayBox.value) != 0) {
      if (step === 1) {
        firstNumArr.pop();
      }
      if (step === 2) {
        if (Number.isNaN(Number(`${displayBox.value}`.slice(-1)))) {
          if (displayBox.value.slice(-1) === ".") {
            secondNumArr.pop();
          } else {
            optr = null;
            step = 1;
            console.log(firstNumArr);
          }
        } else {
          secondNumArr.pop();
          displayString = displayBox.value;
          console.log(secondNumArr);
        }
      }
      if (step === "reset") resetCalc();
      displayBox.value = `${displayBox.value}`.slice(0, -1);
      displayString = displayBox.value;
    }

    // Working of Reset Button
    if (el === btnReset) {
      resetCalc();
    }
  });
});
