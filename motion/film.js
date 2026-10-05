/* A deterministic vector composition, shared by the interactive preview and both video exports. */
(() => {
  const assets = window.SEYA_FILM_ASSETS;
  const story = assets.storyboard;
  const canvas = document.getElementById("film");
  const ctx = canvas.getContext("2d");
  const palette = { porcelain: "#F3F0E8", obsidian: "#11100E", copper: "#D65A31", aubergine: "#34212F", sandstone: "#C9BDAE", chalk: "#E4E0D7", muted: "#625e56", sage: "#65704F" };
  const logoPath = new Path2D(assets.logoPath);
  const renderMode = new URLSearchParams(location.search).has("render");
  let format = new URLSearchParams(location.search).get("format") || "landscape";
  let w = 1920, h = 1080, portrait = false, time = 0, playing = false, sound = true;
  let ink = palette.obsidian, secondary = palette.muted, accent = palette.copper;
  const clamp = (x, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, x));
  const ease = (x) => 1 - Math.pow(1 - clamp(x), 3);
  const entrance = (t, delay = 0) => ease((t - delay) / 0.65);
  const lerp = (a, b, p) => a + (b - a) * p;
  const blend = (a, b, p) => {
    const ca = a.match(/\w\w/g).map((v) => parseInt(v, 16));
    const cb = b.match(/\w\w/g).map((v) => parseInt(v, 16));
    return `rgb(${ca.map((v, i) => Math.round(lerp(v, cb[i], p))).join(",")})`;
  };
  function box(x, y, width, height, fill, stroke = null, radius = 3) {
    ctx.beginPath(); ctx.roundRect(x, y, width, height, radius);
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 1.5; ctx.stroke(); }
  }
  function text(value, x, y, size = 32, color = ink, weight = 400, font = "SeyaBody", align = "left") {
    ctx.font = `${weight} ${size}px ${font}`; ctx.fillStyle = color; ctx.textAlign = align; ctx.textBaseline = "top"; ctx.fillText(value, x, y);
  }
  function wrap(value, size, width, weight = 400, font = "SeyaBody") {
    ctx.font = `${weight} ${size}px ${font}`;
    const lines = []; let line = "";
    for (const word of value.split(/\s+/)) {
      const next = line ? `${line} ${word}` : word;
      if (line && ctx.measureText(next).width > width) { lines.push(line); line = word; } else line = next;
    }
    if (line) lines.push(line);
    return lines;
  }
  function paragraph(value, x, y, size, width, color = secondary, weight = 400, lineHeight = 1.45, align = "left") {
    const lines = wrap(value, size, width, weight);
    lines.forEach((line, i) => text(line, x, y + i * size * lineHeight, size, color, weight, "SeyaBody", align));
    return lines.length * size * lineHeight;
  }
  function mark(x, y, height, color = ink, rotation = 0) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rotation); ctx.scale(height / 720, height / 720); ctx.fillStyle = color; ctx.fill(logoPath); ctx.restore();
  }
  function brand(x, y, size = 44, color = ink) {
    mark(x, y, size * 1.2, color); text("SEYA", x + size * 1.38, y + 7, size, color, 700, "SeyaDisplay");
    ctx.font = `700 ${size}px SeyaDisplay`; const len = ctx.measureText("SEYA").width;
    text("LABS", x + size * 1.38 + len + size * .22, y + 7, size, color, 400, "SeyaDisplay");
  }
  function line(x1, y1, x2, y2, color = accent, width = 3, progress = 1) {
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(lerp(x1, x2, progress), lerp(y1, y2, progress)); ctx.strokeStyle = color; ctx.lineWidth = width; ctx.stroke();
  }
  function check(x, y, size, color = accent, progress = 1) {
    ctx.save(); ctx.beginPath(); ctx.moveTo(x, y + size * .5); ctx.lineTo(x + size * .35, y + size * .85); if (progress > .4) ctx.lineTo(x + size, y); ctx.strokeStyle = color; ctx.lineWidth = size * .12; ctx.lineCap = "round"; ctx.stroke(); ctx.restore();
  }
  function arrow(x, y, size, color = accent) {
    line(x, y + size, x + size, y, color, 5); line(x + size * .25, y, x + size, y, color, 5); line(x + size, y, x + size, y + size * .75, color, 5);
  }
  function icon(kind, x, y, size = 48, color = accent) {
    ctx.save(); ctx.translate(x, y); ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 3; ctx.lineCap = "round";
    if (kind === "app") { box(0, 0, size, size * .78, null, color); line(0, size * .2, size, size * .2, color, 2); line(size * .15, size * .37, size * .56, size * .37, color, 3); line(size * .15, size * .55, size * .75, size * .55, color, 3); }
    if (kind === "flow") { for (let i = 0; i < 3; i++) box(i * size * .35, i * size * .24, size * .3, size * .22, null, color); line(size * .2, size * .25, size * .5, size * .4, color, 2); }
    if (kind === "ai") { box(0, 0, size, size * .7, null, color); line(0, size * .7, 0, size * .96, color, 3); line(0, size * .96, size * .25, size * .7, color, 3); for (let i = 0; i < 3; i++) {ctx.beginPath();ctx.arc(size*(.23+i*.27),size*.34,3,0,Math.PI*2);ctx.fill();} }
    if (kind === "connect") { box(0, size * .18, size * .32, size * .48, null, color); box(size * .67, size * .18, size * .32, size * .48, null, color); line(size * .35, size * .41, size * .63, size * .41, color, 3); }
    if (kind === "product") { arrow(0, 0, size * .7, color); line(0, size * .95, size * .95, size * .95, color, 3); }
    if (kind === "learn") { box(0, 0, size * .47, size * .75, null, color); box(size * .48, 0, size * .47, size * .75, null, color); line(size * .47, size * .05, size * .47, size * .8, color, 3); }
    ctx.restore();
  }
  function background(scene, local) {
    const index = story.scenes.indexOf(scene);
    const previous = story.scenes[Math.max(0, index - 1)];
    const p = ease(local / .4);
    ctx.fillStyle = blend(palette[previous.background], palette[scene.background], p); ctx.fillRect(0, 0, w, h);
    const dark = ["obsidian", "aubergine"].includes(scene.background);
    ink = dark ? palette.porcelain : palette.obsidian;
    secondary = dark ? "#cbc1b5" : scene.background === "copper" ? "#34201a" : palette.muted;
    accent = dark ? "#f59973" : scene.background === "copper" ? palette.obsidian : palette.copper;
    ctx.save(); ctx.globalAlpha = .13; ctx.strokeStyle = dark ? "#c9bdae" : "#a29584"; ctx.lineWidth = 1;
    const step = portrait ? 96 : 120;
    for (let x = 0; x < w; x += step) { ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke(); }
    ctx.globalAlpha = .06;
    for (let y = 0; y < h; y += step) { ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke(); }
    ctx.restore();
  }
  function header(scene, index) {
    const pad = portrait ? 86 : 108;
    if (scene.kind !== "closing") brand(pad, portrait ? 120 : 78, portrait ? 42 : 43);
    text(`${String(index + 1).padStart(2, "0")} / 08`, w - pad, portrait ? 142 : 104, 24, secondary, 400, "SeyaMono", "right");
    line(pad, portrait ? 224 : 178, w - pad, portrait ? 224 : 178, secondary, 1);
  }
  function headline(scene, local) {
    const x = portrait ? 86 : 108, y = portrait ? 292 : 250;
    const width = portrait ? 900 : 840;
    const size = portrait ? 110 : 119;
    text(scene.label, x, y, portrait ? 24 : 23, secondary, 400, "SeyaMono");
    let fitted = size;
    for (const value of scene.headline) {
      ctx.font = `500 ${size}px SeyaDisplay`;
      fitted = Math.min(fitted, size * Math.min(1, width / ctx.measureText(value).width));
    }
    const top = y + (portrait ? 75 : 72), lh = fitted * 1.03;
    scene.headline.forEach((value, i) => {
      const p = entrance(local, .08 + i * .13);
      ctx.save(); ctx.beginPath(); ctx.rect(x - 3, top + i * lh - 2, width + 6, lh + 8); ctx.clip();
      ctx.globalAlpha = p; text(value, x, top + i * lh + (1 - p) * 65, fitted, scene.kind === "pricing" && i === 1 ? accent : ink, 500, "SeyaDisplay"); ctx.restore();
    });
    const supportTop = top + scene.headline.length * lh + 34;
    ctx.save(); ctx.globalAlpha = entrance(local, .45); paragraph(scene.support, x, supportTop, portrait ? 33 : 32, width, secondary); ctx.restore();
  }
  function area() { return portrait ? { x: 86, y: 835, width: 908, height: 675 } : { x: 1040, y: 255, width: 780, height: 610 }; }
  function card(x, y, width, height, title, subtitle, kind, p, fill = palette.porcelain) {
    ctx.save(); ctx.globalAlpha *= p; ctx.translate(0, (1 - p) * 30);
    box(x, y, width, height, fill, fill === "#1d1a16" ? "#554b40" : "#c8bfae");
    const color = fill === "#1d1a16" ? palette.porcelain : palette.obsidian;
    icon(kind, x + 28, y + 25, 41, fill === "#1d1a16" ? "#f59973" : palette.copper);
    const fontSize = Math.min(32, width / 11.5);
    paragraph(title, x + 28, y + 83, fontSize, width - 56, color, 500, 1.14);
    if (subtitle) paragraph(subtitle, x + 28, y + height - 34, 21, width - 56, fill === "#1d1a16" ? "#c9c0b3" : palette.muted, 400, 1.3);
    ctx.restore();
  }
  function scattered(local, problem) {
    const a = area();
    const cx = a.x + a.width * .5, cy = a.y + a.height * .5;
    ctx.save();ctx.globalAlpha=.1;mark(cx-155, cy-173, 340, ink);ctx.restore();
    const items = [
      { title: "Commandes", sub: "À retrouver", kind: "app", x: .01, y: .07, r: -.065 },
      { title: "Planning", sub: "À vérifier", kind: "app", x: .49, y: .025, r: .055 },
      { title: "Factures", sub: "À ressaisir", kind: "app", x: .05, y: .55, r: .045 },
      { title: "Relances", sub: "À ne pas oublier", kind: "ai", x: .51, y: .53, r: -.05 }
    ];
    items.forEach((item, i) => {
      const p = entrance(local, .15 + i * .17), cw = a.width * .43, ch = a.height * .39;
      const drift = Math.sin(local * .6 + i) * (problem ? 12 : 5);
      ctx.save();ctx.translate(a.x + item.x * a.width + cw / 2, a.y + item.y * a.height + ch / 2 + drift);ctx.rotate(item.r * p);
      ctx.shadowColor = "#11100e15";ctx.shadowBlur=20;ctx.shadowOffsetY=8;
      card(-cw / 2, -ch / 2, cw, ch, item.title, item.sub, item.kind, p);
      ctx.restore();
    });
    if (problem) {
      const p=entrance(local,.8);ctx.save();ctx.globalAlpha=p;
      const x=cx-140,y=cy-43;box(x,y,280,86,palette.obsidian);
      text("Tout se disperse.",cx,y+25,28,palette.porcelain,500,"SeyaBody","center");ctx.restore();
    }
  }
  function dashboard(local) {
    const a=area(),p=entrance(local,.15);
    ctx.save();ctx.globalAlpha=p;ctx.translate((1-p)*60,0);
    box(a.x,a.y,a.width,a.height,palette.porcelain,"#11100e",4);
    const pad=40;
    text("Mon activité",a.x+pad,a.y+32,45,palette.obsidian,500,"SeyaDisplay");
    text("VUE D’ENSEMBLE",a.x+a.width-pad,a.y+45,18,palette.muted,400,"SeyaMono","right");
    line(a.x+pad,a.y+105,a.x+a.width-pad,a.y+105,"#c9bdae",1);
    const names=["Commandes","Clients","Planning"],cwidth=(a.width-pad*2-24)/3;
    names.forEach((name,i)=>{box(a.x+pad+i*(cwidth+12),a.y+133,cwidth,66,i===0?palette.obsidian:palette.chalk);text(name,a.x+pad+i*(cwidth+12)+cwidth/2,a.y+154,23,i===0?palette.porcelain:palette.obsidian,500,"SeyaBody","center");});
    const rows=[{name:"Demande reçue",state:"À traiter"},{name:"Rendez-vous prévu",state:"Aujourd’hui"},{name:"Client à recontacter",state:"À suivre"}];
    rows.forEach((row,i)=>{
      const q=entrance(local,.5+i*.27),top=a.y+235+i*102;
      ctx.save();ctx.globalAlpha=q;box(a.x+pad,top,a.width-pad*2,84,"#ffffff70","#ddd5c8");
      icon(i===2?"ai":"app",a.x+pad+19,top+26,31,palette.copper);
      text(row.name,a.x+pad+71,top+28,29,palette.obsidian,500);
      text(row.state,a.x+a.width-pad-20,top+31,22,palette.muted,400,"SeyaBody","right");ctx.restore();
    });
    text("Exemple illustratif",a.x+pad,a.y+a.height-46,21,palette.muted,400,"SeyaBody");
    ctx.restore();
  }
  function workflow(local) {
    const a=area(),width=a.width*.86,x=a.x+(a.width-width)/2,step=portrait?178:165;
    const top=a.y+(portrait?18:0);
    const states=[{title:"Une demande arrive",sub:"Un formulaire, un message, une commande.",kind:"app"},{title:"Le suivi se met à jour",sub:"Les bonnes informations circulent.",kind:"connect"},{title:"Le client est informé",sub:"Une confirmation, sans ressaisie.",kind:"ai"}];
    states.forEach((item,i)=>{
      const p=entrance(local,.12+i*.85),y=top+i*step;
      if(i>0){const q=entrance(local,i*.85-.2);line(x+width*.5,y-27,x+width*.5,y-4,accent,3,q);}
      ctx.save();ctx.globalAlpha=p;box(x,y,width,step-35,palette.porcelain,"#bfb29e");
      icon(item.kind,x+26,y+32,42);text(item.title,x+95,y+28,portrait?35:33,ink,500,"SeyaDisplay");
      paragraph(item.sub,x+95,y+77,25,width-150,secondary,400,1.3);
      if(local>i*.85+1){check(x+width-43,y+38,21,accent,entrance(local,i*.85+1));}ctx.restore();
    });
    const p=entrance(local,3.1);ctx.save();ctx.globalAlpha=p;
    text("Un assistant vous aide aussi à retrouver l’info.",x,top+3*step+16,26,secondary);
    text("Exemple illustratif",x,top+3*step+58,20,secondary);ctx.restore();
  }
  function services(local) {
    const a=area(),gap=18,cw=(a.width-gap)/2,ch=portrait?195:184;
    const items=[
      ["Vos applications", "Web et mobile", "app"],
      ["Vos tâches automatisées", "Moins de ressaisies", "flow"],
      ["Vos assistants IA", "Retrouver l’information", "ai"],
      ["Vos logiciels connectés", "Des données partagées", "connect"],
      ["Votre produit lancé", "SaaS et MVP", "product"],
      ["Vos équipes formées", "Comprendre et pratiquer", "learn"]
    ];
    items.forEach(([title,sub,kind],i)=>card(a.x+(i%2)*(cw+gap),a.y+Math.floor(i/2)*(ch+gap),cw,ch,title,sub,kind,entrance(local,.15+i*.22),"#1d1a16"));
  }
  function pricing(local) {
    const a=area(),items=["Votre besoin", "Le périmètre utile", "Votre budget"];
    const top=a.y+(portrait?20:12);
    items.forEach((name,i)=>{
      const p=entrance(local,.3+i*.45),y=top+i*150;
      ctx.save();ctx.globalAlpha=p;
      box(a.x,y,a.width,120,"#ffffff06","#8c7180");
      text(`0${i+1}`,a.x+30,y+43,26,accent,400,"SeyaMono");
      text(name,a.x+110,y+35,portrait?43:43,ink,500,"SeyaDisplay");
      check(a.x+a.width-64,y+43,29,accent);ctx.restore();
    });
    ctx.save();ctx.globalAlpha=entrance(local,1.8);
    paragraph("Nous définissons ensemble ce qui est utile et ce qui est prévu.",a.x,top+480,portrait?34:31,a.width,secondary,400,1.45);
    ctx.restore();
  }
  function benefit(local) {
    const a=area(),p=entrance(local,.15);
    ctx.save();ctx.globalAlpha=p;
    const height=portrait?440:470;
    mark(a.x+a.width*.5-height*.445,a.y+60,height,ink);
    const q=entrance(local,.45);line(a.x+a.width*.19,a.y+a.height-10,a.x+a.width*.82,a.y+25,accent,10,q);
    if(q>.9){line(a.x+a.width*.56,a.y+25,a.x+a.width*.82,a.y+25,accent,10);line(a.x+a.width*.82,a.y+25,a.x+a.width*.82,a.y+170,accent,10);}
    ctx.restore();
  }
  function closing(local) {
    const p=entrance(local,.12);ctx.save();ctx.globalAlpha=p;
    const logoSize=portrait?72:79,logoWidth=logoSize*6.15;
    brand(w/2-logoWidth/2,portrait?380:238,logoSize,ink);
    const size=portrait?75:87,top=portrait?660:422;
    ["Des outils sur mesure.","Un budget à votre mesure."].forEach((value,i)=>{
      ctx.save();ctx.globalAlpha=entrance(local,.35+i*.16);text(value,w/2,top+i*size*1.3,size,i===1?accent:ink,500,"SeyaDisplay","center");ctx.restore();
    });
    const buttonW=portrait?714:596,buttonY=portrait?1164:694;
    box(w/2-buttonW/2,buttonY,buttonW,109,palette.copper);
    text("Parlons de votre projet.",w/2-buttonW/2+35,buttonY+33,portrait?40:37,palette.obsidian,500);
    arrow(w/2+buttonW/2-63,buttonY+35,30,palette.obsidian);
    text("seyalabs.com",w/2,portrait?1375:842,portrait?61:51,ink,500,"SeyaDisplay","center");
    text("contact@seyalabs.com",w/2,portrait?1460:907,portrait?33:28,secondary,400,"SeyaBody","center");
    ctx.restore();
  }
  function captions(scene, local) {
    const cues=assets.cues.filter(c=>c.scene===story.scenes.indexOf(scene));
    const cue=cues.find(c=>time>=c.start&&time<c.end);
    if(!cue)return;
    const size=portrait?36:31,maxWidth=portrait?856:1450;
    const lines=wrap(cue.text,size,maxWidth,500),height=lines.length*size*1.35;
    const y=portrait?1645:969;
    box((w-maxWidth)/2-22,y-15,maxWidth+44,height+30,"#11100eef",null,2);
    lines.forEach((value,i)=>text(value,w/2,y+i*size*1.35,size,palette.porcelain,500,"SeyaBody","center"));
    // A small progress line is a visual timing cue, not an interactive control in the video.
    line(portrait?86:108,portrait?1840:1051,w-(portrait?86:108),portrait?1840:1051,secondary,1);
    line(portrait?86:108,portrait?1840:1051,w-(portrait?86:108),portrait?1840:1051,accent,3,time/story.duration);
    void local;
  }
  function setFormat(next) {
    format=next;portrait=next==="portrait";w=portrait?1080:1920;h=portrait?1920:1080;canvas.width=w;canvas.height=h;
    document.querySelector(".stage").classList.toggle("portrait",portrait);
    document.querySelectorAll("[data-format]").forEach(button=>button.setAttribute("aria-pressed",String(button.dataset.format===next)));
  }
  function renderFrame(seconds, nextFormat=format) {
    if(nextFormat!==format)setFormat(nextFormat);
    time=clamp(seconds,0,story.duration-.001);
    const index=story.scenes.findIndex(scene=>time>=scene.start&&time<scene.end);
    const scene=story.scenes[index],local=time-scene.start;
    ctx.save();background(scene,local);header(scene,index);
    const opacity=index===story.scenes.length-1?1:clamp((scene.end-time)/.28);
    ctx.save();ctx.globalAlpha=opacity;
    if(scene.kind!=="closing")headline(scene,local);
    if(scene.kind==="hook"||scene.kind==="problem")scattered(local,scene.kind==="problem");
    if(scene.kind==="application")dashboard(local);
    if(scene.kind==="automation")workflow(local);
    if(scene.kind==="services")services(local);
    if(scene.kind==="pricing")pricing(local);
    if(scene.kind==="benefit")benefit(local);
    if(scene.kind==="closing")closing(local);
    ctx.restore();captions(scene,local);ctx.restore();
    return {time,index,format,width:w,height:h};
  }
  async function initialise() {
    for(const [name,data] of Object.entries(assets.fonts)) {
      const face=new FontFace(name,`url(data:font/woff2;base64,${data})`,{weight:"100 900"});await face.load();document.fonts.add(face);
    }
    await document.fonts.ready;setFormat(format);renderFrame(1);
    window.renderFrame=renderFrame;window.filmReady=true;
    if(renderMode){document.body.classList.add("render-mode");renderFrame(0);return;}
    const audio=document.getElementById("narration"),play=document.getElementById("play"),seek=document.getElementById("seek"),status=document.getElementById("status");
    const update=()=>{seek.value=String(time);document.getElementById("time").textContent=`00:${String(Math.floor(time)).padStart(2,"0")} / 00:45`;};
    story.scenes.forEach(scene=>{const li=document.createElement("li");li.textContent=`${scene.start}–${scene.end} s — ${scene.voice}`;document.getElementById("transcript").append(li);});
    function tick(){if(!playing)return;renderFrame(audio.currentTime);update();if(audio.currentTime>=story.duration-.05||audio.ended){playing=false;play.textContent="Revoir le film";renderFrame(story.duration-.05);return;}requestAnimationFrame(tick);}
    play.disabled=false;document.getElementById("restart").disabled=false;status.textContent="Les vidéos se téléchargent ci-dessous. Le film démarre avec le bouton Lire.";
    play.addEventListener("click",async()=>{if(playing){audio.pause();playing=false;play.textContent="Reprendre";return;}if(audio.ended||time>=story.duration-.1)audio.currentTime=0;try{audio.muted=!sound;await audio.play();playing=true;play.textContent="Pause";tick();}catch{status.textContent="Le son n’est pas encore disponible. Ouvrez le MP4 téléchargé pour lire le film complet.";}});
    document.getElementById("restart").addEventListener("click",()=>{audio.currentTime=0;renderFrame(0);update();});
    seek.addEventListener("input",()=>{audio.currentTime=Number(seek.value);renderFrame(Number(seek.value));update();});
    document.getElementById("sound").addEventListener("click",event=>{sound=!sound;audio.muted=!sound;event.currentTarget.textContent=sound?"Son activé":"Son coupé";event.currentTarget.setAttribute("aria-pressed",String(sound));});
    document.querySelectorAll("[data-format]").forEach(button=>button.addEventListener("click",()=>{setFormat(button.dataset.format);renderFrame(time);update();}));
  }
  initialise().catch(error=>{document.getElementById("status").textContent="La préparation du film a rencontré une erreur.";console.error(error);});
})();
