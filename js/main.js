'use strict';
document.addEventListener('DOMContentLoaded', () => {
  /* Аккордион */
  const accordions = document.querySelectorAll('.accordion'), 
      arrowTop = document.querySelector('.accordion__cataloge-arrow'),
      accordionContent = document.querySelectorAll('.accordion-content');

  accordions.forEach(itemAcc => {
    itemAcc.addEventListener('click', (event) => {
      event.preventDefault();
      const context = itemAcc.nextElementSibling;

      if(context.style.maxHeight) {
        context.style.maxHeight = null;
      } else {
        context.style.maxHeight = context.scrollHeight + 'px';
      }

      accordionContent.forEach((itemCon) => {
        if(itemCon !== context) {
          itemCon.style.maxHeight = null;
        }
      });

      arrowTop.classList.toggle('rotate-ar');
    });
  });
  /* Конец Аккордиона */

  /* Начало Слайдер */
  const slider = () => {
    const slider = document.querySelector('.portfolio-content'),
      slide = document.querySelectorAll('.portfolio-item'),
      dots = document.querySelector('.portfolio-dots'),
      btn = document.querySelector('.portfolio-btn');

    for (let i = 0; i < slide.length; i++) {
      dots.insertAdjacentHTML('beforeend',
        `<li class="dot ${i === 0 ? 'dot-active' : ''}"></li>`);
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
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', event => {
      event.preventDefault();

      const target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }

      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', event => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', event => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        startSlide();
      }
    });


    startSlide(2000);

  };

  slider();
  /*Конец Слайдера */

  /* Инициализация  Swiper.js */
  const mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
    breakpoints: {
      620: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    }
  });
  /*Инициализация  Swiper.js */
});