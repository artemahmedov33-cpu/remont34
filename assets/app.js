function toggleMenu(){var m=document.getElementById('mobileMenu');if(m)m.classList.toggle('open');var b=document.getElementById('burger');if(b)b.classList.toggle('open');}
function openModal(){var m=document.getElementById('modal');if(m)m.classList.add('open')}
function closeModal(){var m=document.getElementById('modal');if(m)m.classList.remove('open')}
var _m=document.getElementById('modal');if(_m)_m.addEventListener('click',function(e){if(e.target===this)closeModal()});
function submitLead(e){e.preventDefault();var f=e.target;f.innerHTML='<div style="text-align:center;padding:16px 0;font-weight:700;color:var(--sage-dark)">✓ Заявка отправлена!<div style="font-weight:500;color:var(--muted);font-size:14px;margin-top:6px">Мы перезвоним вам в ближайшее время.</div></div>';return false;}

// HERO SLIDER
var heroSlides=[
  {img:'work1.jpg',badge:'<b>15+ лет</b> делаем ремонт в Волгограде и Волжском'},
  {img:'work4.jpg',badge:'<b>Под ключ</b> — от черновой до чистовой отделки'},
  {img:'work2.jpg',badge:'<b>Дизайнерский</b> ремонт с подбором материалов'},
  {img:'work3.jpg',badge:'<b>Офисы и магазины</b> — ремонт без остановки бизнеса'}
];
if(document.getElementById('heroImg')){
  var heroIdx=0, heroImg=document.getElementById('heroImg'), heroBadge=document.getElementById('heroBadge'), heroDots=document.getElementById('heroDots');
  var heroRender=function(){var s=heroSlides[heroIdx];heroImg.style.opacity=0;setTimeout(function(){heroImg.src=s.img;heroImg.style.opacity=1;},180);heroBadge.innerHTML=s.badge;heroDots.querySelectorAll('i').forEach(function(d,i){d.classList.toggle('on',i===heroIdx);});};
  var heroGo=function(i){heroIdx=(i+heroSlides.length)%heroSlides.length;heroRender();};
  window.heroSlide=function(dir){heroGo(heroIdx+dir);};
  heroSlides.forEach(function(_,i){var d=document.createElement('i');d.setAttribute('role','button');d.setAttribute('tabindex','0');d.setAttribute('aria-label','Слайд '+(i+1));d.onclick=function(){heroGo(i)};d.onkeydown=function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();heroGo(i);}};heroDots.appendChild(d);});
  document.querySelectorAll('.hero-arrows span').forEach(function(a){a.setAttribute('role','button');a.setAttribute('tabindex','0');a.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();a.click();}});});
  heroRender();
  var heroTimer=setInterval(function(){window.heroSlide(1)},6000);
  document.querySelector('.hero-photo').addEventListener('mouseenter',function(){clearInterval(heroTimer)});
}

window.addEventListener('scroll',function(){var h=document.querySelector('header');if(h)h.style.boxShadow=window.scrollY>10?'0 10px 30px -22px rgba(50,52,34,.5)':'none';});

// FAQ accordion (inner pages) — keyboard accessible
document.querySelectorAll('.faq-item').forEach(function(it){
  var q=it.querySelector('.faq-q');if(!q)return;
  q.setAttribute('role','button');q.setAttribute('tabindex','0');q.setAttribute('aria-expanded','false');
  var toggle=function(){it.classList.toggle('open');q.setAttribute('aria-expanded',it.classList.contains('open')?'true':'false');};
  q.addEventListener('click',toggle);
  q.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle();}});
});

// ===== LIGHTBOX for galleries =====
(function(){
  var items=[].slice.call(document.querySelectorAll('.gitem img'));
  if(!items.length)return;
  var lb=document.createElement('div');
  lb.className='lightbox';
  lb.innerHTML='<button class="lb-btn lb-close" aria-label="Закрыть">×</button>'+
    '<button class="lb-btn lb-nav lb-prev" aria-label="Предыдущее"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M15 18l-6-6 6-6"/></svg></button>'+
    '<img alt="">'+
    '<button class="lb-btn lb-nav lb-next" aria-label="Следующее"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M9 18l6-6-6-6"/></svg></button>'+
    '<div class="lb-count"></div>';
  document.body.appendChild(lb);
  var big=lb.querySelector('img'), count=lb.querySelector('.lb-count'), idx=0, cur=[];
  function show(i){idx=(i+cur.length)%cur.length;big.src=cur[idx];count.textContent=(idx+1)+' / '+cur.length;}
  function open(gitem){var im=gitem.querySelector('img');cur=gitem.dataset.set?gitem.dataset.set.split(','):[im.src];big.alt=im.alt||'';show(0);lb.classList.add('open');document.body.style.overflow='hidden';}
  function close(){lb.classList.remove('open');document.body.style.overflow='';}
  document.querySelectorAll('.gitem').forEach(function(g){g.setAttribute('tabindex','0');g.setAttribute('role','button');
    g.addEventListener('click',function(){open(g)});
    g.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();open(g);}});
  });
  lb.querySelector('.lb-close').addEventListener('click',close);
  lb.querySelector('.lb-prev').addEventListener('click',function(e){e.stopPropagation();show(idx-1);});
  lb.querySelector('.lb-next').addEventListener('click',function(e){e.stopPropagation();show(idx+1);});
  lb.addEventListener('click',function(e){if(e.target===lb)close();});
  document.addEventListener('keydown',function(e){if(!lb.classList.contains('open'))return;if(e.key==='Escape')close();else if(e.key==='ArrowLeft')show(idx-1);else if(e.key==='ArrowRight')show(idx+1);});
})();
