const eraseWord = (word, initialDelay) => {
  const target = document.getElementById("typing");
  const removeLetter = () => {
    target.textContent = target.textContent.substring(0, target.textContent.length - 1);
  }
  let totalTypingTime = initialDelay;
  for (let i = 0; i < word.length; i++) {
    totalTypingTime += 100;
    setTimeout(() => removeLetter(), totalTypingTime)
  }
  return totalTypingTime;
}

const gaussianRandom = (mean=0, stdev=1) => {
    const u = 1 - Math.random(); // Converting [0,1) to (0,1]
    const v = Math.random();
    const z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    // Transform to the desired mean and standard deviation:
    const rand = z * stdev + mean;
    return Math.max(rand, 20);
}

const TYPING_MEAN = 112;
const TYPING_STDEV = 56;

const typeWord = (word) => {
  const target = document.getElementById("typing");
  const addLetter = (char) => {
    target.textContent = target.textContent + char;
  }
  
  let totalTypingTime = 0;
  for (let i = 0; i < word.length; i++) {
    let charToType = word.charAt(i);
    if (charToType === " ") {
      charToType = "\xa0" // NBSP
    }

    totalTypingTime += gaussianRandom(TYPING_MEAN, TYPING_STDEV);
    setTimeout(() => addLetter(charToType), totalTypingTime);
  }
  return totalTypingTime;
}

const configureAttributes = () => {
  const attributes = [
    "Totally not a Robot",
    '"Professional"',
    "Volunteer",
    "Nittany Lion",
    "Problem Solver",
    "Automator",
    "Learner",
    "Guitar Player",
    "Data Engineer",
    "Full-Stack Developer",
    "Nerd",
    "NYT Spelling Bee Enthusiast"
  ];
  const used = new Set();

  const nextAttribute = () => {
    if (attributes.length === used.size) {
      used.clear();
    }
    while (true) {
      const index = Math.floor(Math.random() * attributes.length);
      const candidate = attributes[index];
      if (!used.has(candidate)) {
        used.add(candidate);
        return candidate;
      }
    }
  }

  const typeNextWord = () => {
    const attribute = nextAttribute();
    const typeTime = typeWord(attribute);
    const totalTime = eraseWord(attribute, typeTime + 3000);
    setTimeout(() => typeNextWord(), totalTime + 2000);
  }

  setTimeout(() => typeNextWord(), 2000);
  
}


const configureProjects = () => {
  const handler = (e) => {
    const projectContainer = e.currentTarget.parentElement.parentElement;
    const details = projectContainer.querySelector(".project-details");
    const detailsMeasure = details.querySelector(".project-details-measure");

    if (projectContainer.classList.contains("expanded")) {
      projectContainer.classList.remove("expanded");
      details.style['max-height'] = "0px";
    } else {
      projectContainer.classList.add("expanded");
      details.style["max-height"] = detailsMeasure.offsetHeight + "px";
    }
    
  }

  const elements = document.getElementsByClassName("expand-arrow-container");
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', handler);
  }
}

configureAttributes();
configureProjects();

window.onscroll = navbarScrollListenter;
var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function navbarScrollListenter() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}
navbarScrollListenter();