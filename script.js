
let hamburgerbtn = document.querySelector(".hamburger");
let nav_list = document.querySelector(".nav-list");
hamburgerbtn.addEventListener("click", () => {
    hamburgerbtn.classList.toggle("active");
    nav_list.classList.toggle("active");
});

// Element references
const arrowRight = document.getElementById("arrowRight");
const arrowLeft = document.getElementById("arrowLeft");
const list = document.getElementById("list");
const valueItemNumber = document.getElementById("itemNumber");
const valueItemNumberMax = valueItemNumber.ariaValueMax;
const defaultItemNumber = 4;
const initialNumberItems = list.children.length;
const itemNumberMess = document.getElementById("itemNumberMess");
const wrapper = document.querySelector(".slider__wrapper");
const wrapperWidth = wrapper.offsetWidth;
const numVisibleItems = 4;
let centralItem = 2;
let itemNumberValue = parseInt(valueItemNumber.value);

// Initialize item number and set width of items
const initialItemNumberValue = itemNumberValue || defaultItemNumber;
let itemNumber = calculatePercentItemNumber(initialItemNumberValue);
resetItems(itemNumber);

// Utility functions
function calculatePercentItemNumber(num) {
    return num ? 100 / num : 100 / defaultItemNumber;
}

function listNumber(inputNumber) {
    const message =
        inputNumber >= 6
            ? "You reached the maximum number of items"
            : `Changed to ${inputNumber}`;
    itemNumberMess.textContent = message;
}

function resetItems(number) {
    const sliderItems = document.querySelectorAll(".slider__item");
    sliderItems.forEach((item) => (item.style.width = `${number}%`));
    itemNumber = number;
}

function calculateCentralItem(numVisibleItems) {
    const centralItem = Math.ceil(numVisibleItems / 2);
    return centralItem;
}

function addActiveElement(centralItem, totalVisibleItems) {
    // Clear active class
    const sliderItems = document.querySelectorAll(".slider__item");
    sliderItems.forEach((item) =>
        item.querySelector(".slider__content").classList.remove("active")
    );

    // Set active class to central element(s)
    const central = sliderItems[Math.floor(centralItem)];
    central.querySelector(".slider__content").classList.add("active");

    if (totalVisibleItems % 2 === 0) {
        const central2 = sliderItems[Math.floor(centralItem) + 1];
        central2.querySelector(".slider__content").classList.add("active");

        if (totalVisibleItems == 2) {
            const central3 = sliderItems[Math.floor(centralItem) - 1];
            central3.querySelector(".slider__content").classList.add("active");
        }
    }
}

// Event listeners
valueItemNumber.addEventListener("input", function () {
    itemNumberValue = parseInt(valueItemNumber.value);
    listNumber(itemNumberValue);
    const newPercentage = calculatePercentItemNumber(itemNumberValue);
    resetItems(newPercentage);
    centralItem = calculateCentralItem(itemNumberValue);
    addActiveElement(centralItem - 1, itemNumberValue);
});

arrowRight.addEventListener("click", moveFirstToEnd);
arrowLeft.addEventListener("click", moveLastToStart);

function moveFirstToEnd() {
    const firstItem = list.firstElementChild;
    firstItem.style.marginLeft = `calc(-${itemNumber}%)`;

    if (firstItem) {
        setTimeout(() => {
            firstItem.style.marginLeft = "";
            list.appendChild(firstItem);
        }, 300);
    }
    addActiveElement(centralItem, itemNumberValue);
}

function moveLastToStart() {
    const lastItem = list.lastElementChild;
    list.removeChild(lastItem);
    list.insertBefore(lastItem, list.firstElementChild);
    const newFirstItem = list.firstElementChild;

    if (newFirstItem) {
        newFirstItem.style.marginLeft = `calc(-${itemNumber}%)`;
        setTimeout(() => {
            newFirstItem.style.marginLeft = "";
        }, 1);
    }

    addActiveElement(centralItem - 1, itemNumberValue);
}

document.querySelectorAll(".read-more-link").forEach(function (link) {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        var container = event.target.closest(".slide__description");
        var moreText = container.querySelector(".more-text");

        if (moreText.classList.contains("hidden")) {
            moreText.classList.remove("hidden");
            link.textContent = "Read less";
        } else {
            moreText.classList.add("hidden");
            link.textContent = "Read more";
        }
    });
});
// Create a flag to avoid redundant speech
let currentText = ""; // To track the currently spoken text

// Function to speak the text
function speakText(text) {
  // Stop any ongoing speech
  window.speechSynthesis.cancel();

  // Create and configure the speech instance
  const speech = new SpeechSynthesisUtterance(text);
  speech.pitch = 1;  // Adjust pitch (0 to 2)
  speech.rate = 1;   // Adjust rate (0.1 to 10)
  speech.volume = 1; // Adjust volume (0 to 1)

  // Speak the text
  window.speechSynthesis.speak(speech);
}

// Add event listener to handle text hover
document.body.addEventListener("mouseover", (event) => {
  const element = event.target;

  // Check if the hovered element contains text (e.g., <p>, <h1>)
  if (element.tagName === "P" || element.tagName === "H1") {
    const text = element.innerText.trim();

    // Speak only if the text is different from the last spoken text
    if (text && text !== currentText) {
      currentText = text; // Update the current text
      speakText(text);
    }
  }
});

// Add event listener to stop reading when the cursor moves away
document.body.addEventListener("mouseleave", () => {
  window.speechSynthesis.cancel(); // Stop the speech immediately
  currentText = ""; // Reset the current text
});

