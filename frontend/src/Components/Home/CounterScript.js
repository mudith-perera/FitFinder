const CounterScript = () => {
  let valueDisplays = document.querySelectorAll(".num");
  let interval = 5000;

  valueDisplays.forEach((valueDisplay) => {
    console.log("test")
    let startValue = 0;
    let endValue = parseInt(valueDisplay.getAttribute("data-val"));
    let duration = Math.floor((interval / endValue)/3);
    let counter = setInterval(function () {
      startValue +=1;
      valueDisplay.textContent = startValue;
      if (startValue === endValue) {
        clearInterval(counter);
      }
    }, duration);
  });
};

export default CounterScript;