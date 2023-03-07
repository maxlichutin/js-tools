// Redirect traffic in a simple manner
function chooseDirection(firstDirestion, secondDirestion, prcFirst) {
  let ratio = prcFirst ? prcFirst : 50; // 50% -> left; 50% -> right
  let random = Math.floor(Math.random() * 100);
  if (random <= ratio) {
    return firstDirestion;
  } else {
    return secondDirestion;
  }
}

// Implementation
let left = 0;
let right = 0;

for (let index = 0; index < 10000; index++) {
  let outcome = chooseDirection("left", "right", 75);
  if (outcome === "left") {
    left++;
  } else if (outcome === "right") {
    right++;
  }
}

let prcLeft = Math.floor(((left / (left + right)) * 10000))/100;
let prcRight = Math.floor(((right / (left + right)) * 10000))/100;

// result of 10000 redirects
console.log(prcLeft, prcRight);
