const subtitle = document.getElementById("subtitle");
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
  "Open-Source Contributer"
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
    subtitle.style.width = 378 + attributeSpan.clientWidth + "px";
    attributeSpan.classList.remove("hidden");
    attributeSpan.classList.add("visible");
  }, 3000);
};

setInterval(rotateAttribute, 10000);
