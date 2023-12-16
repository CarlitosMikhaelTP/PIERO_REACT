import Flickity from 'flickity';
import magnificPopup from 'magnific-popup';
import Waypoint from 'waypoints/lib/noframework.waypoints';
import flatpickr from 'flatpickr';

(function() {
	"use strict";
  
	// Función para obtener elementos por selector
	const $ = selector => document.querySelector(selector);
	const $$ = selector => document.querySelectorAll(selector);
  
	// Función para manejar el evento de cambio de tamaño de la ventana
	const handleResize = () => {
	  const fullheightElements = $$(".js-fullheight");
	  fullheightElements.forEach(element => {
		element.style.height = window.innerHeight + "px";
	  });
	};
  
	// Función para inicializar la funcionalidad de carrusel
	const initCarousel = () => {
	  const carouselTestimony = $(".carousel-testimony");
	  if (carouselTestimony) {
		new Flickity(carouselTestimony, {
		  cellAlign: "center",
		  contain: true,
		  wrapAround: true,
		  prevNextButtons: false,
		  pageDots: false
		});
	  }
	};
  
	// Función para manejar el evento de desplazamiento
	const handleScroll = () => {
	  const dropdowns = $$(".nav-item.dropdown");
	  dropdowns.forEach(dropdown => {
		dropdown.addEventListener("mouseenter", () => {
		  dropdown.classList.add("show");
		  dropdown.querySelector("> a").setAttribute("aria-expanded", true);
		  dropdown.querySelector(".dropdown-menu").classList.add("show");
		});
  
		dropdown.addEventListener("mouseleave", () => {
		  dropdown.classList.remove("show");
		  dropdown.querySelector("> a").setAttribute("aria-expanded", false);
		  dropdown.querySelector(".dropdown-menu").classList.remove("show");
		});
	  });
	};
  
	// Función para inicializar la funcionalidad de la ventana emergente de imagen
	const initImagePopup = () => {
	  const imagePopups = $$(".image-popup");
	  imagePopups.forEach(imagePopup => {
		imagePopup.addEventListener("click", () => {
		  magnificPopup.open({
			items: {
			  src: imagePopup.getAttribute("href")
			},
			type: "image",
			closeOnContentClick: true,
			closeBtnInside: false,
			fixedContentPos: true,
			mainClass: "mfp-no-margins mfp-with-zoom",
			gallery: {
			  enabled: true,
			  navigateByImgClick: true,
			  preload: [0, 1]
			},
			image: {
			  verticalFit: true
			},
			zoom: {
			  enabled: true,
			  duration: 300
			}
		  });
		});
	  });
	};
  
	// Función para inicializar el contador
	const initCounter = () => {
	  const sectionCounter = $("#section-counter");
	  if (sectionCounter) {
		const waypoint = new Waypoint(sectionCounter, direction => {
		  if (direction === "down" && !sectionCounter.classList.contains("ftco-animated")) {
			const numberElements = $$(".number");
			numberElements.forEach(numberElement => {
			  const num = parseInt(numberElement.dataset.number, 10);
			  animateNumber(numberElement, num);
			});
  
			sectionCounter.classList.add("ftco-animated");
		  }
		}, { offset: "95%" });
	  }
	};
  
	// Función para animar números
	const animateNumber = (element, end) => {
	  let current = 0;
	  const step = Math.ceil(end / 100);
  
	  const intervalId = setInterval(() => {
		current += step;
		if (current >= end) {
		  current = end;
		  clearInterval(intervalId);
		}
		element.textContent = current.toLocaleString();
	  }, 70);
	};
  
	// Función para manejar los elementos de animación
	const handleAnimations = () => {
	  const animatedElements = $$(".ftco-animate");
	  animatedElements.forEach(element => {
		const waypoint = new Waypoint(element, direction => {
		  if (direction === "down" && !element.classList.contains("ftco-animated")) {
			element.classList.add("item-animate");
  
			setTimeout(() => {
			  handleAnimationClasses(element);
			}, 100);
		  }
		}, { offset: "95%" });
	  });
	};
  
	// Función para manejar las clases de animación
	const handleAnimationClasses = element => {
	  const effects = ["fadeIn", "fadeInLeft", "fadeInRight", "fadeInUp"];
	  const effect = element.dataset.animateEffect || "fadeInUp";
	  if (effects.includes(effect)) {
		element.classList.add(effect, "ftco-animated");
	  } else {
		element.classList.add("fadeInUp", "ftco-animated");
	  }
  
	  element.classList.remove("item-animate");
	};
  
	// Función para inicializar las selecciones de fecha y hora
	const initDateAndTimePickers = () => {
	  const datePicker = $(".appointment_date");
	  const timePicker = $(".appointment_time");
  
	  if (datePicker) {
		flatpickr(datePicker, {
		  dateFormat: "m/d/yyyy",
		  allowInput: true,
		  disableMobile: "true",
		  onOpen: function(selectedDates, dateStr, instance) {
			instance.setDate(new Date(), false);
		  }
		});
	  }
  
	  if (timePicker) {
		flatpickr(timePicker, {
		  enableTime: true,
		  noCalendar: true,
		  dateFormat: "H:i",
		  allowInput: true,
		  disableMobile: "true"
		});
	  }
	};
  
	// Función principal de inicialización
	const init = () => {
	  handleResize();
	  initCarousel();
	  handleScroll();
	  initImagePopup();
	  initCounter();
	  handleAnimations();
	  initDateAndTimePickers();
	};
  
	// Evento de cambio de tamaño de la ventana
	window.addEventListener("resize", handleResize);
  
	// Inicialización al cargar la página
	window.addEventListener("load", init);
  })();
  