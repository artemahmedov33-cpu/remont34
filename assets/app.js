function toggleMenu(){var m=document.getElementById('mobileMenu');if(m)m.classList.toggle('open');var b=document.getElementById('burger');if(b)b.classList.toggle('open');}
function openModal(){var m=document.getElementById('modal');if(m)m.classList.add('open')}
function closeModal(){var m=document.getElementById('modal');if(m)m.classList.remove('open')}
var _m=document.getElementById('modal');if(_m)_m.addEventListener('click',function(e){if(e.target===this)closeModal()});
function submitLead(e){e.preventDefault();var f=e.target;f.innerHTML='<div style="text-align:center;padding:16px 0;font-weight:700;color:var(--sage-dark)">✓ Заявка отправлена!<div style="font-weight:500;color:var(--muted);font-size:14px;margin-top:6px">Мы перезвоним вам в ближайшее время.</div></div>';return false;}

// HERO SLIDER
var heroSlides=[
  {img:'work1.webp',badge:'<b>15+ лет</b> делаем ремонт в Волгограде и Волжском'},
  {img:'work4.webp',badge:'<b>Под ключ</b> — от черновой до чистовой отделки'},
  {img:'work2.webp',badge:'<b>Дизайнерский</b> ремонт с подбором материалов'},
  {img:'work3.webp',badge:'<b>Офисы и магазины</b> — ремонт без остановки бизнеса'}
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

// ===== SMETA calculator (online-estimates) =====
if(document.querySelector('.smeta')){
  var sfmt=function(n){return Math.round(n).toLocaleString('ru-RU')};
  var smetaRecalc=function(){
    var grand=0;
    document.querySelectorAll('.smeta-group').forEach(function(g){
      var gs=0;
      g.querySelectorAll('.srow').forEach(function(r){
        var inp=r.querySelector('.sqty');if(!inp)return;
        var q=parseFloat(inp.value)||0,p=parseFloat(inp.dataset.price)||0,s=q*p;
        var sc=r.querySelector('.ssum');if(sc)sc.textContent=sfmt(s)+' ₽';
        gs+=s;
      });
      var sub=g.querySelector('.sg-sub b');if(sub)sub.textContent=sfmt(gs)+' ₽';
      grand+=gs;
    });
    var extra=grand*0.05;
    document.getElementById('smetaWorks').textContent=sfmt(grand)+' ₽';
    document.getElementById('smetaExtra').textContent=sfmt(extra)+' ₽';
    document.getElementById('smetaTotal').textContent=sfmt(grand+extra)+' ₽';
  };
  document.querySelectorAll('.smeta .sqty').forEach(function(i){i.addEventListener('input',smetaRecalc)});
  smetaRecalc();
}

// ===== QUICK CALCULATOR (calculator.html) =====
if(document.getElementById('rooms')){
  var cstate={rooms:1,house:1,rate:8000,typeName:'Под ключ',area:45},cextras=[];
  var cfmt=function(n){return n.toLocaleString('ru-RU')};
  var cplural=function(n,f){n=Math.abs(n)%100;var n1=n%10;if(n>10&&n<20)return f[2];if(n1>1&&n1<5)return f[1];if(n1==1)return f[0];return f[2]};
  var ccalc=function(){
    var eff=Math.round(cstate.rate*cstate.house),base=eff*cstate.area,extra=0;
    cextras.forEach(function(el){if(el.classList.contains('active')){var a=parseFloat(el.dataset.add);extra+=el.dataset.mode==='perm2'?a*cstate.area:a;}});
    var total=Math.round((base+extra)/1000)*1000;
    var sp={'Косметический':0.55,'Черновой':0.7,'Капитальный':0.95,'Под ключ':1.0,'Дизайнерский':1.25};
    var days=Math.max(14,Math.round(cstate.area*(sp[cstate.typeName]||1)*0.9));
    document.getElementById('totalVal').textContent=cfmt(total);
    document.getElementById('sumType').textContent=cstate.typeName;
    document.getElementById('sumArea').textContent=cstate.area+' м²';
    document.getElementById('sumRate').textContent=cfmt(eff)+' ₽';
    var ex=document.getElementById('sumExtraLine');
    if(extra>0){ex.style.display='';document.getElementById('sumExtra').textContent='+'+cfmt(extra)+' ₽';}else ex.style.display='none';
    document.getElementById('sumTerm').textContent=days+' '+cplural(days,['день','дня','дней']);
  };
  var cbind=function(id,cb){var box=document.getElementById(id);if(!box)return;box.querySelectorAll('.opt').forEach(function(o){o.addEventListener('click',function(){box.querySelectorAll('.opt').forEach(function(x){x.classList.remove('active')});o.classList.add('active');cb(o);ccalc();});});};
  cbind('rooms',function(o){cstate.rooms=o.dataset.v;var m={'1':40,'2':58,'3':80,'4':110};var a=m[o.dataset.v]||45;cstate.area=a;document.getElementById('area').value=a;document.getElementById('areaVal').textContent=a;});
  cbind('house',function(o){cstate.house=parseFloat(o.dataset.k)});
  cbind('type',function(o){cstate.rate=parseFloat(o.dataset.p);cstate.typeName=o.textContent.trim()});
  var car=document.getElementById('area');
  if(car)car.addEventListener('input',function(){cstate.area=parseInt(this.value);document.getElementById('areaVal').textContent=this.value;ccalc();});
  document.querySelectorAll('#extras .check').forEach(function(el){cextras.push(el);el.addEventListener('click',function(e){e.preventDefault();el.classList.toggle('active');ccalc();});});
  ccalc();
}
