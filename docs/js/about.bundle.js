!function(){"use strict";const e={"page-main":{ru:"Новый Год - Обратный отсчет",en:"New Year - Countdown"},"about-project":{ru:"О проекте",en:"About the project"},progect:{ru:"Проект",en:"Project"},mini:{ru:"мини",en:"mini"},portfolio:{ru:"Портфолио",en:"Portfolio"},about:{ru:"О проекте",en:"About the project"},title:{ru:"Контакты",en:"Contacts"},copy:{ru:"Алексеева Татьяна",en:"Alekseeva Tatyana"},days:{ru:"дней",en:"days"},hours:{ru:"часов",en:"hours"},minutes:{ru:"минут",en:"minutes"},seconds:{ru:"секунд",en:"seconds"},"title-project":{ru:"Таймер обратного отсчета",en:"Countdown timer"},"about-project":{ru:"Простой таймер обратного отсчета с днями, часами, минутами и секундами. Отслеживает время до наступления нового года. Обновление происходит каждую секунду. Адаптивная верстка для экранов 320px и выше.",en:"A simple countdown timer with days, hours, minutes and seconds. Tracks the time until the new year. The update happens every second. Responsive layout for screens 320px and above."}};setTimeout((function(){document.querySelector("body").classList.add("body_visible")}),0),function(){const e=document.querySelector(".light-mode-btn"),t=document.querySelector(".main");function o(){e.classList.add("light-mode-btn--active"),t.classList.add("light")}function a(){e.classList.remove("light-mode-btn--active"),t.classList.remove("light")}window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches&&o(),"dark"===localStorage.getItem("darkMode")?a():"light"===localStorage.getItem("darkMode")&&o(),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",(e=>{"dark"==(e.matches?"dark":"light")?(a(),localStorage.setItem("darkMode","dark")):(o(),localStorage.setItem("darkMode","light"))})),e.addEventListener("click",(()=>{e.classList.toggle("light-mode-btn--active"),t.classList.toggle("light")?localStorage.setItem("darkMode","light"):localStorage.setItem("darkMode","dark")}))}(),function(t){let o="ru";const a=["en","ru"],n=e,c=document.querySelector(".lang-btn"),i=document.querySelector("title");!function(){let e=window.location.hash;e=e.substr(1),a.includes(e)||(location.href=`${window.location.pathname}#ru`,location.reload()),"en"===e?c.classList.add("lang-btn--active"):c.classList.remove("lang-btn--active"),i.innerHTML=n[t][e];for(let t in n)document.querySelectorAll(`.lng-${t}`).forEach((o=>{o&&(o.innerHTML=n[t][e])}))}(),c.addEventListener("click",(function(){c.classList.contains("lang-btn--active")?(c.classList.remove("lang-btn--active"),o="ru"):(c.classList.add("lang-btn--active"),o="en"),location.href=`${window.location.pathname}#${o}`,location.reload()}))}("about-project"),function(){const e=document.querySelectorAll(".about__slide"),t=document.querySelectorAll(".about__dot");let o=0;function a(o){var a,n;a=o,e.forEach((e=>{e.classList.remove("about__slide--active")})),e[a].classList.add("about__slide--active"),n=o,t.forEach((e=>{e.classList.remove("about__dot--active")})),t[n].classList.add("about__dot--active")}t.forEach(((e,t)=>{e.addEventListener("click",(()=>{a(t)}))})),setInterval((function(){o===e.length-1?(o=0,a(o)):(o++,a(o))}),4e3)}(),document.querySelector(".lng-about").classList.add("menu__link--active")}();