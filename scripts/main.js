const configureAttributes = () => {
  const subtitle = document.getElementById("main-subtitle");
  const attributeSpan = document.getElementById("rotating-attribute");
  let attributes = [
    "Leader",
    "Juggler",
    "Robot",
    "Friend",
    "Consultant",
    "Volunteer",
    "DevOps Engineer",
    "Nittany Lion",
    "Problem Solver",
    "Open-Source Contributer",
    "Communicator",
    "Automator",
    "Lifelong Learner",
    "Guitar Player"
  ];
  let used = [];

  function getTextWidth(text, font) {
    // re-use canvas object for better performance
    var canvas =
      getTextWidth.canvas ||
      (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
  }

  const rotateAttribute = () => {
    attributeSpan.classList.remove("visible");
    attributeSpan.classList.add("hidden");
    setTimeout(() => {
      if (attributes.length === 0) {
        attributes = [...used];
        used = [];
      }
      const randomIndex = Math.floor(attributes.length * Math.random());
      used.push(attributes[randomIndex]);
      attributeSpan.innerText = attributes[randomIndex];
      attributes = attributes.filter((_, i) => i !== randomIndex);
      const maxWidth = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      const newWidth = 378 + attributeSpan.clientWidth;
      const width = newWidth < maxWidth ? newWidth : maxWidth;
      subtitle.style.width =  width + "px";
      attributeSpan.classList.remove("hidden");
      attributeSpan.classList.add("visible");
    }, 3000);
  };

  setTimeout(() => {
    rotateAttribute();
    setInterval(rotateAttribute, 10000);
  }, 3000);
  
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