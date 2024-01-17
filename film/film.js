const adsData = [
    {
      id: 1,
      link: 'link_1',
      src: './images/film-1.gif',
      title: 'title_1',
    },
    {
      id: 2,
      link: 'link_2',
      src: './images/film-2.gif',
      title: 'title_2',
    },
    {
      id: 3,
      link: 'link_3',
      src: './images/film-3.gif',
      title: 'title_3',
    },
    {
      id: 4,
      link: 'link_4',
      src: './images/film-4.gif',
      title: 'title_4',
    }
  ]
  
  const SLIDE_DURATION_MILLISECONDS = 4000
  
  let intervalID
  let count = 1

  const filmContainer = document.querySelector(".film-container");
  filmContainer.setAttribute('id', 'filmContainer');

  const sliderContainer = document.querySelector(".slider-container");
  sliderContainer.setAttribute('id', 'sliderContainer')    

  
  function genSlide(data) {
    const aElement = document.createElement('a')
    aElement.setAttribute('title', data.title)
    aElement.setAttribute('href', data.link)
    aElement.setAttribute('target', '_blank')
  
    const imgElement = document.createElement('img')
    imgElement.setAttribute('src', data.src)
    imgElement.setAttribute('alt', data.title)
  
    aElement.appendChild(imgElement)
  
    return aElement
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
      result = [...temp.slice(-1), ...temp.slice(0, 3)]
    } else if (count % temp.length === temp.length - 1) {
      result = [...temp.slice(-3), ...temp.slice(0, 1)]
    } else if (count % temp.length === 0) {
      result = [...temp.slice(-2), ...temp.slice(0, 2)]
    } else {
      result = [
        ...temp.slice((count % temp.length) - 2, (count % temp.length) - 2 + 4),
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
  }
  
  function slide() {
    const sliderElement = document.getElementById('sliderContainer')
    sliderElement.classList.add('active')
    count += 1
    setTimeout(() => {
      genSlider()
      sliderElement.classList.remove('active')
    }, 1500)
  }

  function closeButton () {
    document.getElementById('filmContainer').remove()
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(filmContainer)
    genSlider()
    intervalID = window.setInterval(() => {
      slide()
    }, SLIDE_DURATION_MILLISECONDS)
  })

