<script>
document.documentElement.classList.add('js');
(function(){
var sel='.kicker,p,.rule,.stage,.swatch,.misuse,.list li,.caption';
document.querySelectorAll('h1').forEach(function(h){
  var i=0;h.innerHTML=h.textContent.trim().split(/\s+/).map(function(w){return '<span class="w"><span style="--i:'+(i++)+'">'+w+'</span></span>'}).join(' ');
});
var pages=[].slice.call(document.querySelectorAll('.page'));
pages.forEach(function(pg){
  var n=0;
  [].slice.call(pg.querySelectorAll(sel)).filter(function(e){return !e.parentElement.closest(sel)}).forEach(function(e){e.classList.add('rv');e.style.setProperty('--i',n++)});
});
var io=new IntersectionObserver(function(es){es.forEach(function(e){
  if(!e.isIntersecting)return;
  e.target.classList.add('in');io.unobserve(e.target);
  setTimeout(function(){e.target.classList.add('done')},1800);
})},{threshold:.12});
pages.forEach(function(p){io.observe(p)});
var bar=document.createElement('div');bar.id='bar';document.body.appendChild(bar);
var tk=false;
function upd(){var h=document.documentElement.scrollHeight-innerHeight;bar.style.transform='scaleX('+(h>0?Math.min(1,scrollY/h):0)+')';tk=false}
addEventListener('scroll',function(){if(!tk){tk=true;requestAnimationFrame(upd)}},{passive:true});upd();
var toast=document.createElement('div');toast.id='toast';toast.setAttribute('role','status');document.body.appendChild(toast);
var tt;
function copy(sw){
  var m=sw.textContent.match(/#[0-9A-Fa-f]{6}/);if(!m)return;
  try{navigator.clipboard.writeText(m[0])}catch(e){}
  toast.textContent=m[0]+' copied';toast.classList.add('on');clearTimeout(tt);tt=setTimeout(function(){toast.classList.remove('on')},1600);
}
document.querySelectorAll('.swatch').forEach(function(s){
  s.tabIndex=0;s.setAttribute('role','button');s.title='Click to copy hex';
  s.addEventListener('click',function(){copy(s)});
  s.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();copy(s)}});
});
})();
var nav = document.getElementById("nav");
addEventListener("scroll", function(){ nav.classList.toggle("stuck", scrollY > 8); }, {passive:true});
 
var els = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target);} });
  }, {threshold:.15});
  els.forEach(function(el, i){ el.style.transitionDelay = ((i % 3) * 90) + "ms"; io.observe(el); });
} else { els.forEach(function(el){ el.classList.add("in"); }); }

</script>
