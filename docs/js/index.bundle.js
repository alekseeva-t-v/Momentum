!function(){"use strict";var e=e=>e>=6&&e<12?"morning":e>=12&&e<17?"afternoon":e>=17&&e<24?"evening":"night",t=(e,t)=>(e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e),n=[{songName:"Moonlight Sonata",artist:"Paul Pitman",src:"music-1"},{songName:"Nocturne in B flat minor",artist:"Eduardo Vinuela",src:"music-2"},{songName:"Cello Suite no. 1",artist:"Accou",src:"music-3"},{songName:"Sonata 5 (II) Allegro",artist:"Telemann Trio",src:"music-4"},{songName:"Etude Op. 25 no. 1",artist:"Donald Betts",src:"music-5"},{songName:"Greensleeves to a Ground",artist:"Ariel Martin Bellio",src:"music-6"},{songName:"Twelve Spanish Dances, Op. 37",artist:"Monica Alianello",src:"music-7"}];(function(){const t=document.querySelector(".greeting"),n=document.querySelector(".name"),o=document.querySelector(".time"),r=document.querySelector(".date"),a=document.querySelector(".time-block"),c=document.querySelector("#preloader");n.addEventListener("change",(function(){n.value.trim().length&&localStorage.setItem("name",n.value)})),window.addEventListener("load",(function(){localStorage.getItem("name")&&(n.value=localStorage.getItem("name"))})),setInterval((function(){const n=new Date,a=n.getHours(),c=n.toLocaleTimeString();r.textContent=(new Date).toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"}),o.textContent=c,t.textContent=`Good ${e(a)},`}),1e3),setTimeout((function(){c.remove(),a.style.display="flex"}),1e3)})(),function(){const n=document.querySelector("body"),o=document.querySelector(".slide-next"),r=document.querySelector(".slide-prev");let a=0;function c(e,t){const o=(new Date).getHours(),r=new Image;a=t,r.src=`./img/${e(o)}/${t}.jpg`,r.addEventListener("load",(()=>{n.style.backgroundImage=`url(${r.src})`}))}c(e,String(t(1,20)).padStart(2,"0")),o.addEventListener("click",(function(){c(e,a<20?String(++a).padStart(2,"0"):String(a=1).padStart(2,"0"))})),r.addEventListener("click",(function(){c(e,a>1?String(--a).padStart(2,"0"):String(a=20).padStart(2,"0"))}))}(),function(){const e=document.querySelector(".weather-icon"),t=document.querySelector(".temperature"),n=document.querySelector(".weather-description"),o=document.querySelector(".wind"),r=document.querySelector(".humidity"),a=document.querySelector(".city"),c=document.querySelector(".weather-error");async function l(){const l=`https://api.openweathermap.org/data/2.5/weather?q=${a.value}&lang=en&appid=34a8094155f7b4c99e972c8d19d77c1a&units=metric`;try{const a=await fetch(l);if(!a.ok)throw new Error("Something went wrong. Check if the query you entered is correct...");const i=await a.json();a.ok&&(e.className="weather-icon owf",e.classList.add(`owf-${i.weather[0].id}`),t.textContent=`${i.main.temp.toFixed(0)}°C`,n.textContent=i.weather[0].description,o.textContent=`Wind speed: ${i.wind.speed.toFixed(0)} m/s`,r.textContent=`Humidity: ${i.main.humidity} %`,c.textContent="")}catch(a){e.className="weather-icon owf",c.textContent=a.message,t.textContent="",n.textContent="",o.textContent="",r.textContent=""}}l(),a.addEventListener("change",(function(){l(),console.log(c.textContent),""===c.textContent&&localStorage.setItem("city",a.value)})),window.addEventListener("load",(function(){localStorage.getItem("city")&&(a.value=localStorage.getItem("city"))}))}(),function(){const e=document.querySelector(".quote-wrapper"),n=document.querySelector(".quote"),o=document.querySelector(".author"),r=document.querySelector(".change-quote");async function a(){try{const e=await fetch("./files/json/quote-en.json");if(!e.ok)throw new Error("Something went wrong...");const r=await e.json(),a=t(0,r.length-1);n.innerText=r[a].text,o.innerText=r[a].author}catch{e.textContent=""}}window.addEventListener("load",a),r.addEventListener("click",a)}(),function(){const e=n,t=document.querySelector(".player"),o=document.querySelector(".player__controls-play"),r=document.querySelector(".player__controls-play-prev"),a=document.querySelector(".player__controls-play-next"),c=document.querySelector(".player__controls-play-list"),l=document.querySelector(".player__controls-sound-off"),i=document.querySelector(".player__progress-bar"),s=document.querySelector(".player__progress-area"),u=document.querySelector(".player__progress-current"),d=document.querySelector(".player__progress-duration"),m=document.querySelector(".player__artist"),y=document.querySelector(".player__song-name"),p=document.querySelector(".player__play-list");let g=!1,_=0,S=0;const f=new Audio;function h(){f.src=`./files/music/${e[_].src}.mp3`,f.currentTime=S,f.play(),g=!0,f.addEventListener("loadeddata",(()=>{let t=f.duration,n=Math.floor(t/60),o=Math.floor(t%60);o<10&&(o=`0${o}`),d.innerText=`${n}:${o}`,m.innerText=e[_].artist,y.innerText=e[_].songName})),function(){const e=L().find((e=>Number(e.dataset.id)===_)),t=e.querySelector(".player__controls-play--min");e.classList.add("player__play-item--active"),t.classList.add("player__controls-pause--min")}(),v()}function q(){f.pause(),S=f.currentTime,g=!1,L(),v()}function v(){g?o.classList.add("player__controls-pause"):o.classList.remove("player__controls-pause")}function w(){_=_<e.length-1?_+1:0,S=0,h()}function L(){const e=Array.from(document.querySelectorAll(".player__play-item")),t=Array.from(document.querySelectorAll(".player__controls-play--min"));return e.forEach((e=>{e.classList.remove("player__play-item--active")})),t.forEach((e=>{e.classList.remove("player__controls-pause--min")})),e}e.forEach(((e,t)=>{const n=document.createElement("li");n.classList.add("player__play-item"),n.dataset.id=t,n.innerHTML=`<button class="player__controls-icon player__controls-play--min player__controls-icon--min"></button>\n      <span>${e.artist} - ${e.songName}</span>`,p.append(n)})),Array.from(document.querySelectorAll(".player__controls-play--min")).forEach((e=>{e.addEventListener("click",(()=>{const t=e.closest(".player__play-item");g?g&&Number(t.dataset.id)===_?q():(q(),_=Number(t.dataset.id),S=0,h()):(_=Number(t.dataset.id),h())}))})),f.addEventListener("timeupdate",(e=>{const t=e.target.currentTime;let n=t/e.target.duration*100;i.style.width=`${n}%`;let o=Math.floor(t/60),r=Math.floor(t%60);r<10&&(r=`0${r}`),u.innerText=`${o}:${r}`})),o.addEventListener("click",(function(){g?q():h()})),a.addEventListener("click",w),r.addEventListener("click",(function(){_=_>0?_-1:e.length-1,S=0,h()})),f.addEventListener("ended",w),c.addEventListener("click",(e=>{p.classList.toggle("player__play-list--active")})),t.addEventListener("click",(e=>{e._isClickWithInPlayList=!0})),document.body.addEventListener("click",(e=>{e._isClickWithInPlayList||p.classList.remove("player__play-list--active")})),s.addEventListener("click",(e=>{let t=s.clientWidth,n=e.offsetX,o=f.duration;S=n/t*o,h()})),l.addEventListener("click",(()=>{f.muted=!f.muted,l.classList.toggle("player__controls-sound-on"),l.classList.toggle("player__controls-sound-off")}))}()}();