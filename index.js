$.getJSON("data.json", function(data) {
  getMenu(data);

  let dataCount = 0;
  $.each(data, function(key, food) {
    dataCount++;
  });
  
  setTimeout(() => {
    location.reload();
  }, dataCount * 9000);
});

function getMenu(data) {
  let timeoutCount = 500;
  $.each(data, function(key, food) {
    setTimeout(() => {
      const bord1=document.createElement("div");
      bord1.id="bord1";
      const bord2=document.createElement("div");
      bord2.id="bord2";
      const bord3=document.createElement("div");
      bord3.id="bord3";
      const intro=document.createElement("h1");
      document.body.insertBefore(bord1,document.body.childNodes[1]);
      document.body.insertBefore(bord2,document.body.childNodes[2]);
      document.body.insertBefore(bord3,document.body.childNodes[3]);
      intro.textContent= key
      intro.className="intro";
      const div3=document.getElementById("bord3")
      div3.appendChild(intro);
      div3.style.animation = 'none';
      div3.offsetHeight; /* trigger reflow */
      div3.style.animation = null; 
    }, timeoutCount);
    timeoutCount += 3000;

    let foodDiv = document.querySelector(".container")  
    const foodPicBox = document.createElement("div");
    foodPicBox.style.background = `url(${food[0].url})`;
    foodPicBox.style.backgroundPosition = "center";
    foodPicBox.style.backgroundSize = "100% auto";
    foodPicBox.style.backgroundRepeat = "no-repeat";
    foodPicBox.className = "box-1";
    setTimeout(() => {
      foodDiv.appendChild(foodPicBox);
    }, timeoutCount);
    timeoutCount += 500;
    
    const foodHead = document.createElement("h1");
    foodHead.id = "head"
    foodHead.className = "box-3"
    foodHead.textContent = key;
    setTimeout(() => {
      foodDiv.appendChild(foodHead);
    }, timeoutCount);
    timeoutCount += 500;

    let bottomZero = -50;
    let bottomOne = 30;
    $.each(food, function(ind, foodLine) {
      let timeoutCountForText = timeoutCount;
      const foodText = document.createElement("p");
     
      foodText.className = "box-3";
      foodText.textContent = foodLine.exp;
      foodText.innerHTML = `${foodLine.exp}`;
      
      setTimeout(() => {
        foodText.style.bottom = "-150%";
        foodText.style.animationName = "text" + (ind+1);
        foodText.style.animationDuration = "4s";

        $.keyframe.define([{
          name: ('text' + (ind+1)),
          '0%': {'bottom': (bottomZero + '%')},
          '35%': {'bottom': (bottomOne + '%')},
          '70%': {'bottom': (bottomOne + '%')},
          '100%': {'bottom': (bottomZero + '%')}
        }]);

        bottomZero -= 100;
        bottomOne -= 10;

        foodPicBox.appendChild(foodText);
      }, timeoutCountForText);
      timeoutCountForText += 1500;
    });
    timeoutCount += 5000;
  }); 
}