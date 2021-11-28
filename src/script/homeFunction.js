const sliderContainer = document.querySelector(".main__home__slideContainer");

const slide = document.querySelector(".main__home__slides");

const upButton = document.querySelector(".up-button");
const downButton = document.querySelector(".down-button");

const paginate = document.querySelector(".paginate");

const slideLength = document.querySelectorAll(".main__home__slide").length;
let activeSlideIndex = 0;

const home = document.querySelector(".main__home");

upButton.addEventListener("click", () => changeSlide("up"));
downButton.addEventListener("click", () => changeSlide("down"));

const changeSlide = (direction) => {
  const slideHeight = slide.clientHeight;
  console.log(slideHeight);
  if (direction === "up") {
    activeSlideIndex++;
    if (activeSlideIndex > slideLength - 1) {
      activeSlideIndex--;
    }
  } else if (direction === "down") {
    activeSlideIndex--;
    if (activeSlideIndex < 0) {
      activeSlideIndex  = 0;
    }
  }
  slide.style.transform = `translateY(-${activeSlideIndex * slideHeight}px)`;

  paginateCircle();
  upButton.disabled = true;
  downButton.disabled = true;
  setTimeout(() => {
    upButton.disabled = false;
    downButton.disabled = false;
  }, 800);
};
home.addEventListener("wheel", function (event) {
  if (event.deltaY < 0) {
    downButton.click();
  } else if (event.deltaY > 0) {
    upButton.click();
  }
});

const paginateCircle = () => {
  paginate.innerHTML = "";
  for (let i = 0; i < slideLength; ++i) {
    paginate.innerHTML += `
      <div class="circle"
      style = "
      ${
        i === activeSlideIndex
          ? `
        background-color: #c48f56;
  
        `
          : `
        background-color: grey;
  
  
        `
      }
      width: 10px;
      height: 10px;
      border-radius: 50%;
      position: absolute;
      right: 1%;
      cursor: pointer;
      top: ${
        window.innerHeight / 2 - (20 * (slideLength - i)) / 2 + i * 20 - 50
      }px;
      z-index = 10;
      transition : 0.5s ease;
  
      "/>
      `;
  }
  const circles = document.querySelectorAll(".circle");

  for (let i = 0; i < circles.length; i++) {
    circles[i].addEventListener("click", () => {
      const slideHeight = sliderContainer.clientHeight;

      activeSlideIndex = i;
      slide.style.transform = `translateY(-${
        activeSlideIndex * slideHeight
      }px)`;
      slideLeft.style.transform = `translateY(${
        activeSlideIndex * slideHeight
      }px)`;
      changeCircleColor();
    });
  }
};
window.addEventListener("resize", paginateCircle);

paginateCircle();

const changeCircleColor = () => {
  const circles = document.querySelectorAll(".circle");
  for (let i = 0; i < slideLength; ++i) {
    circles[i].style.backgroundColor =
      i === activeSlideIndex ? "#c48f56" : "grey";
    console.log("circle color change");
  }
};
