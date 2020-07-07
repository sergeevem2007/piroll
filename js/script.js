document.addEventListener("DOMContentLoaded", () => {
  'use strict';

  const videoPlayItem = document.querySelector('.video__play');

  videoPlayItem.addEventListener('click', function onYouTubeIframeAPIReady() {
    const player = new YT.Player('player', {
      height: '465',
      width: '100%',
      videoId: 'pwcmANSvtu4',
      events: {
        'onReady': videoPlay,
      }
    });
  });
    
  function videoPlay(event) {
    event.target.playVideo();
  };

  const slider = () => {
    const slide = document.querySelectorAll('.testimonials__item'),
          slider = document.querySelector('.testimonials__content'),
          dots = document.querySelector('.testimonials__dots');
    for (let i = 0; i < slide.length; i++) {
      let li = document.createElement('li');
      li.classList.add('dot');
      dots.append(li);
    }
    const dot = document.querySelectorAll('.dot');
    let currentSlide = 0,
        interval;
    
    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };
    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };
    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'testimonials__item__active');
      prevSlide(dot, currentSlide, 'dot__active');
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'testimonials__item__active');
      nextSlide(dot, currentSlide, 'dot__active');
    };
    const startSlide = (time) => {
      interval = setInterval(autoPlaySlide, time);
    };
    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (event) =>{
      event.preventDefault();
      let target = event.target;
      if (!target.matches('.dot')) {
        return;
      }
      prevSlide(slide, currentSlide, 'testimonials__item__active');
      prevSlide(dot, currentSlide, 'dot__active');
      console.log(3)
      if (target.matches('.dot')) {
        dot.forEach((elem, index) =>{
          if (elem === target) {
            currentSlide = index;
          }
        });
      }
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      } else if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, 'testimonials__item__active');
      nextSlide(dot, currentSlide, 'dot__active');
    });
    slider.addEventListener('mouseover', (event) =>{
      if (event.target.matches('.dot')) {
        stopSlide();
      }
    });
    slider.addEventListener('mouseout', (event) =>{
      if (event.target.matches('.dot')) {
        startSlide(3000);
      }
    });
    startSlide(3000);
  };
  slider();
});

