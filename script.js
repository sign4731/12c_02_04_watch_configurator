"use strict";

const features = {
  flower: false,
  diamond: false,
  ears: false,
  flower: false,
  island: false,
  star: false,
};

let elementToPaint;

window.addEventListener("DOMContentLoaded", start);

function start() {
  document.querySelectorAll(".feature").forEach((feature) => feature.addEventListener("click", toggleFeature));
  loadSVG();
}

async function loadSVG() {
  let response = await fetch("images/watch_configurator-01.svg");
  let mySVG = await response.text();
  document.querySelector("#svg").innerHTML = mySVG;
  manipulatingSVG();
}

function toggleFeature(event) {
  const target = event.currentTarget;
  const feature = target.dataset.feature;

  if (features[feature]) {
    features[feature] = false;
    target.classList.remove("chosen");
    document.querySelector(`[data-feature=${feature}]`).classList.add("hide");
    const featureElementToRemove = document.querySelector(`ul [data-feature=${feature}]`);
    const start = document.querySelector(`#features [data-feature=${feature}] img`).getBoundingClientRect();
    const end = featureElementToRemove.getBoundingClientRect();

    const diffX = start.x - end.x;
    const diffY = start.y - end.y;
    featureElementToRemove.style.setProperty("--diffX", diffX);
    featureElementToRemove.style.setProperty("--diffY", diffY);

    featureElementToRemove.classList.add("animate-feature-out");
    featureElementToRemove.addEventListener("animationend", () => document.querySelector(`ul [data-feature=${feature}]`).remove());
  } else {
    features[feature] = true;
    target.classList.add("chosen");
    document.querySelector(`[data-feature=${feature}]`).classList.remove("hide");
    const featureElement = createFeatureElement(feature);
    document.querySelector("ul").append(featureElement);
    console.log(feature);

    const start = document.querySelector(`#features [data-feature=${feature}] img`).getBoundingClientRect();
    const end = featureElement.getBoundingClientRect();
    // console.log(end);

    const diffX = start.x - end.x;
    const diffY = start.y - end.y;
    featureElement.style.setProperty("--diffX", diffX);
    featureElement.style.setProperty("--diffY", diffY);
    featureElement.classList.add("animate-feature-in");
  }
}

function createFeatureElement(feature) {
  const li = document.createElement("li");
  li.dataset.feature = feature;
  const img = document.createElement("img");
  img.src = `images/${feature}_feature.png`;
  li.append(img);

  return li;
}

function manipulatingSVG() {
  document.querySelectorAll(".interact_with").forEach((part) => part.addEventListener("click", setColor));
}

function setColor() {
  elementToPaint = this;
  elementToPaint.style.fill = "black";
  listenForColorSelection();
}
function listenForColorSelection() {
  document.querySelectorAll(".color_btn").forEach((button) =>
    button.addEventListener("click", () => {
      const selectedColor = button.getAttribute("fill");
      elementToPaint.style.fill = selectedColor;
    })
  );
  colorPicker.addEventListener("input", getInput);
}

function getInput() {
  elementToPaint.style.fill = this.value;
}
