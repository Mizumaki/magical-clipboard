let values = [];
let selectedIndex = 0;

const input = document.getElementById("array-input");
const button = document.getElementById("set-button");
const errorText = document.getElementById("error-contents");
const valuesText = document.getElementById("values-contents");
const valuesLengthText = document.getElementById("values-length-contents");
const selectedValueText = document.getElementById("selected-value-contents");
const selectedIndexText = document.getElementById("selected-index-contents");

const updateSelectedValue = (newIndex) => {
  selectedIndex = newIndex;
  const newVal = values[selectedIndex];
  window.magicalClipboard.writeText(newVal);
  selectedValueText.innerText = newVal;
  selectedIndexText.innerText = newIndex;
};

window.magicalClipboard.prev(() => {
  if (selectedIndex > 0) {
    updateSelectedValue(selectedIndex - 1);
  }
});

window.magicalClipboard.forward(() => {
  if (selectedIndex + 1 < values.length) {
    updateSelectedValue(selectedIndex + 1);
  }
});

const csvTextToArray = (text) => {
  return text.split(",").map((t) => t.trimStart());
};

button.onclick = () => {
  values = csvTextToArray(input.value);
  valuesText.innerText = JSON.stringify(values);
  valuesLengthText.innerText = values.length;
  updateSelectedValue(0);
};
