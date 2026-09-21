const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('nav');
toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));document.body.style.overflow=open?'hidden':''});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');document.body.style.overflow=''}));
document.getElementById('year').textContent=new Date().getFullYear();
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.13});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const gallery=document.querySelector('.gallery-track');
const slides=[...document.querySelectorAll('.gallery-slide')];
const current=document.querySelector('.gallery-current');
let galleryIndex=0;
const moveGallery=(direction)=>{
  galleryIndex=(galleryIndex+direction+slides.length)%slides.length;
  slides[galleryIndex].scrollIntoView({behavior:'smooth',block:'nearest',inline:'start'});
  current.textContent=String(galleryIndex+1).padStart(2,'0');
};
document.querySelector('.gallery-prev').addEventListener('click',()=>moveGallery(-1));
document.querySelector('.gallery-next').addEventListener('click',()=>moveGallery(1));
gallery.addEventListener('scroll',()=>{
  const left=gallery.scrollLeft;
  const nearest=slides.reduce((best,slide,index)=>Math.abs(slide.offsetLeft-left)<best.distance?{index,distance:Math.abs(slide.offsetLeft-left)}:best,{index:0,distance:Infinity});
  galleryIndex=nearest.index;
  current.textContent=String(galleryIndex+1).padStart(2,'0');
},{passive:true});
