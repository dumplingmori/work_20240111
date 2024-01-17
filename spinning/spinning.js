const adsData = [
    {
      id: 1,
      link: './images/spin-expand-1.gif',
      src: './images/spin-1.gif',
      title: 'title_1',
    },
    {
      id: 2,
      link: './images/spin-expand-2.gif',
      src: './images/spin-2.gif',
      title: 'title_2',
    },
    {
      id: 3,
      link: './images/spin-expand-3.gif',
      src: './images/spin-3.gif',
      title: 'title_3',
    },
    {
      id: 4,
      link: './images/spin-expand-4.gif',
      src: './images/spin-4.gif',
      title: 'title_4',
    }
  ]
  
  const SLIDE_DURATION_MILLISECONDS = 8000
  
  let intervalID
  let count = 1

  const filmContainer = document.querySelector(".film-container");
  filmContainer.setAttribute('id', 'filmContainer');

  const sliderContainer = document.querySelector(".slider-container");
  sliderContainer.setAttribute('id', 'sliderContainer')    

  const lightBoxContainer = document.querySelector(".light-box");
  lightBoxContainer.setAttribute('id', 'lightBoxContainer')    
  const lightBoxClose = document.querySelector(".box-close");

  document.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX
  })
  
  document.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX
    slide()
  })
  
  function genSlide(data) {
    const aElement = document.createElement('a')
    aElement.setAttribute('id', data.id);
    aElement.setAttribute('title', data.title)

    const imgElement = document.createElement('img')
    imgElement.setAttribute('src', data.src)
    imgElement.setAttribute('alt', data.title)

    aElement.appendChild(imgElement)
    
    return aElement
  }

  function genLightBox(data) {
    lightBoxContainer.replaceChildren()
    const aElement = document.createElement('a')
    const imgElement = document.createElement('img')
    imgElement.setAttribute('id', 'lightBoxImg') 
    imgElement.setAttribute('src', data.link)
    aElement.appendChild(imgElement)
    lightBoxContainer.appendChild(aElement)
  }

  function showLightBox() {
    lightBoxContainer.style.display = "block";  
    setTimeout(() => {
        lightBoxClose.style.display = "block";
    }, 3000)
  }

  function genData() {
    let temp = []
    let result = []

    if (adsData.length < 4) {
      temp = Array(4)
        .fill([...adsData])
        .flat()
    } else {
      temp = [...adsData]
    }
    if (count % temp.length === 1) {
        result = [...temp.slice(0, 2)]
    } else if (count % temp.length === temp.length - 1) {
        result = [...temp.slice(2)]
    } else if (count % temp.length === 0) {
        result = [...temp.slice(-1), ...temp.slice(0, 1)]
    } else {
        result = [
            ...temp.slice((count % temp.length) - 1, (count % temp.length) - 2 + 3),
        ]
    }
    return result
  }
  
  function genSlider() {
    const slider = document.getElementById('sliderContainer')
    const dataRow = genData()
    if (!slider) return
    slider.replaceChildren()
    for (let i = 0; i < dataRow.length; i++) {
        slider.appendChild(genSlide(dataRow[i]))
    }
    genLightBox(dataRow[0])
  }
  
  function slide() {
    const sliderContainerElement = document.getElementById('sliderContainer')
    sliderContainerElement.classList.add('active')
    lightBoxContainer.classList.add('active')

    count += 1
    setTimeout(() => {
      genSlider()
      sliderContainerElement.classList.remove('active')
      lightBoxContainer.classList.remove('active')
    }, 1500)
  }

  function closeButton () {
    document.getElementById('filmContainer').remove()
    document.getElementById('lightBoxContainer').remove()
    lightBoxClose.style.display = "none";

  }

  function closelightBox () {
    lightBoxContainer.style.display = "none";
    lightBoxClose.style.display = "none";

  }

  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(filmContainer)
    genSlider()
    intervalID = window.setInterval(() => {
      slide()
    }, SLIDE_DURATION_MILLISECONDS)
  })

// =============

var touchstartX = 0;
var touchstartY = 0;
var touchendX = 0;
var touchendY = 0;


filmContainer.addEventListener('touchstart', function(event) {
    touchstartX = event.screenX;
    touchstartY = event.screenY;
}, false);

filmContainer.addEventListener('touchend', function(event) {
    touchendX = event.screenX;
    touchendY = event.screenY;
    handleGesure();
}, false); 