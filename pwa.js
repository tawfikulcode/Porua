(function(){
  var ev=null,standalone=matchMedia('(display-mode: standalone)').matches||navigator.standalone,
      ios=/iphone|ipad|ipod/i.test(navigator.userAgent);
  function ui(){
    var b=document.getElementById('installBtn'),o=document.getElementById('offline');
    if(b)b.hidden=standalone||(!ev&&!ios);
    if(o)o.hidden=navigator.onLine;
  }
  addEventListener('beforeinstallprompt',function(e){e.preventDefault();ev=e;ui()});
  addEventListener('appinstalled',function(){ev=null;standalone=true;ui()});
  addEventListener('online',ui);addEventListener('offline',ui);
  document.addEventListener('DOMContentLoaded',ui);ui();
  window.installApp=async function(){
    if(ev){ev.prompt();await ev.userChoice;ev=null;ui()}
    else if(ios)alert('Share ▸ Add to Home Screen');
  };
  addEventListener('load',function(){try{if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(function(){})}catch(e){}});
})();
