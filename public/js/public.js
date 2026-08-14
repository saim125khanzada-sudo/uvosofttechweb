document.addEventListener('DOMContentLoaded', function() {
  /* ===== Mobile Toggle ===== */
  var mobileToggle = document.getElementById('mobileToggle');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      var nav = document.querySelector('nav');
      if (nav) nav.classList.toggle('open');
    });
  }

  /* ===== Cursor Glow ===== */
  var cursorGlow = document.getElementById('cursorGlow');
  var heroSection = document.querySelector('.hero');
  document.addEventListener('mousemove', function(e) {
    if (cursorGlow) {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    }
    if (heroSection) {
      var x = (window.innerWidth / 2 - e.clientX) / 50;
      var y = (window.innerHeight / 2 - e.clientY) / 50;
      heroSection.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    }
  });

  /* ===== Chatbot ===== */
  var chatbotToggle = document.getElementById('chatbotToggle');
  var chatbotWindow = document.getElementById('chatbotWindow');
  var chatInput = document.getElementById('chatInput');
  var chatSendBtn = document.getElementById('chatSendBtn');
  var chatBody = document.getElementById('chatBody');

  if (chatbotToggle && chatbotWindow) {
    chatbotToggle.addEventListener('click', function() {
      chatbotWindow.classList.toggle('open');
    });
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
  }

  function sendChatMessage() {
    var text = chatInput.value.trim();
    if (!text) return;
    chatBody.innerHTML += '<div class="chat-msg user-msg">' + escapeHtml(text) + '</div>';
    chatInput.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    fetch('/api/v1/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text })
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      var response = (data.success && data.data && data.data.response) ? data.data.response : "I'm still learning! Please contact us directly for specific inquiries.";
      chatBody.innerHTML += '<div class="chat-msg bot-msg">' + escapeHtml(response) + '</div>';
      chatBody.scrollTop = chatBody.scrollHeight;
    })
    .catch(function() {
      chatBody.innerHTML += '<div class="chat-msg bot-msg">Sorry, something went wrong. Please try again later.</div>';
      chatBody.scrollTop = chatBody.scrollHeight;
    });
  }

  if (chatSendBtn) chatSendBtn.addEventListener('click', sendChatMessage);
  if (chatInput) chatInput.addEventListener('keypress', function(e) { if (e.key === 'Enter') sendChatMessage(); });

  /* ===== Contact Form ===== */
  var contactForm = document.getElementById('contactForm');
  var contactSuccess = document.getElementById('contactSuccess');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var formData = new FormData(contactForm);
      var data = {};
      formData.forEach(function(val, key) { data[key] = val; });
      fetch('/api/v1/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(function(res) { return res.json(); })
      .then(function(result) {
        if (result.success) {
          contactForm.style.display = 'none';
          if (contactSuccess) contactSuccess.style.display = 'block';
        } else {
          alert(result.error || (result.errors ? result.errors.join(', ') : 'An error occurred'));
        }
      })
      .catch(function() { alert('An error occurred. Please try again.'); });
    });
  }

  /* ===== Matrix Rain ===== */
  var mCanvas = document.getElementById('matrix-canvas');
  if (mCanvas) {
    var mCtx = mCanvas.getContext('2d');
    mCanvas.width = window.innerWidth;
    mCanvas.height = window.innerHeight;
    var drops = Array(Math.floor(mCanvas.width / 14)).fill(1);

    function drawMatrix() {
      mCtx.fillStyle = 'rgba(3, 3, 5, 0.1)';
      mCtx.fillRect(0, 0, mCanvas.width, mCanvas.height);
      mCtx.fillStyle = '#00F0FF';
      mCtx.font = '14px monospace';
      for (var i = 0; i < drops.length; i++) {
        var t = '0123456789</>{}'[(Math.random() * 16) | 0];
        mCtx.fillText(t, i * 14, drops[i] * 14);
        if (drops[i] * 14 > mCanvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }

    window.addEventListener('resize', function() {
      mCanvas.width = window.innerWidth;
      mCanvas.height = window.innerHeight;
      drops = Array(Math.floor(mCanvas.width / 14)).fill(1);
    });

    /* ===== 3D Shape Morphing AI Core ===== */
    var canvas = document.getElementById('ai-canvas');
    if (canvas) {
      var ctx = canvas.getContext('2d');
      var w, h, cx, cy, radius;
      function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; cx = w / 2; cy = h / 2; radius = Math.min(w, h) * 0.3; }
      resize();
      var N = 180, currentShape = [], targetShape = [], morphProgress = 1, restTimer = 0, rotX = 0, rotY = 0, dataPackets = [];
      var palettes = [['#00F0FF','#FF0055','#FF7700'],['#FF0055','#FF7700','#00F0FF'],['#39FF14','#00F0FF','#BF00FF'],['#BF00FF','#FF0055','#39FF14']];
      var currentColors = palettes[0], targetColors = palettes[1], colorProgress = 1;

      function generateSphere() { var p=[]; for(var i=0;i<9;i++) for(var j=0;j<20;j++) { var t=(i/9)*Math.PI, p2=(j/20)*2*Math.PI; p.push({x:radius*Math.sin(t)*Math.cos(p2), y:radius*Math.cos(t), z:radius*Math.sin(t)*Math.sin(p2)}); } return p; }
      function generateInfinity() { var p=[]; for(var i=0;i<N;i++) { var t=(i/N)*2*Math.PI; p.push({x:(radius*0.8+radius*0.3*Math.cos(3*t))*Math.cos(2*t), y:(radius*0.8+radius*0.3*Math.cos(3*t))*Math.sin(2*t), z:radius*0.3*Math.sin(3*t)}); } return p; }
      function generatePolygons() { var p=[]; for(var i=0;i<6;i++) { var y=radius*((i/5)*2-1), r=radius*Math.sin((i/5)*Math.PI); for(var j=0;j<30;j++) { var a=(j/30)*2*Math.PI; p.push({x:r*Math.cos(a), y:y, z:r*Math.sin(a)}); } } return p; }
      function generateRings() { var p=[]; for(var i=0;i<N;i++) { var t=((i%60)/60)*2*Math.PI, r=Math.floor(i/60); if(r===0)p.push({x:radius*Math.cos(t),y:radius*Math.sin(t),z:0}); else if(r===1)p.push({x:radius*Math.cos(t),y:0,z:radius*Math.sin(t)}); else p.push({x:0,y:radius*Math.cos(t),z:radius*Math.sin(t)}); } return p; }
      function getRandomShape() { return [generateSphere, generateInfinity, generatePolygons, generateRings][Math.floor(Math.random()*4)](); }
      currentShape = generateSphere(); targetShape = generateInfinity();
      var connections = [];
      for (var i = 0; i < 9; i++) { for (var j = 0; j < 20; j++) { var p1 = i * 20 + j; connections.push([p1, i * 20 + (j + 1) % 20]); if (i < 8) connections.push([p1, (i + 1) * 20 + j]); } }

      function hexToRgb(hex) { return [parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16)]; }
      function lerp(a, b, t) { return a + (b - a) * t; }
      function lerpColor(c1, c2, t) { var r1=hexToRgb(c1), r2=hexToRgb(c2); return 'rgb('+Math.round(lerp(r1[0],r2[0],t))+','+Math.round(lerp(r1[1],r2[1],t))+','+Math.round(lerp(r1[2],r2[2],t))+')'; }

      function drawAI() {
        ctx.clearRect(0, 0, w, h); rotX += 0.003; rotY += 0.005;
        if (morphProgress < 1) { morphProgress += 0.008; if (morphProgress >= 1) { morphProgress = 1; restTimer = 0; } } else { restTimer++; if (restTimer > 180) { morphProgress = 0; currentShape = targetShape.map(function(p) { return Object.assign({}, p); }); targetShape = getRandomShape(); currentColors = targetColors.slice(); targetColors = palettes[(palettes.indexOf(targetColors) + 1) % palettes.length]; colorProgress = 0; } }
        if (colorProgress < 1) colorProgress += 0.005;
        var dp = []; for (var i = 0; i < N; i++) dp.push({x:lerp(currentShape[i].x,targetShape[i].x,morphProgress), y:lerp(currentShape[i].y,targetShape[i].y,morphProgress), z:lerp(currentShape[i].z,targetShape[i].z,morphProgress)});
        var projected = dp.map(function(p) { var cY=Math.cos(rotY),sY=Math.sin(rotY),x1=p.x*cY-p.z*sY,z1=p.x*sY+p.z*cY,cX=Math.cos(rotX),sX=Math.sin(rotX),y1=p.y*cX-z1*sX,z2=p.y*sX+z1*cX,s=400/(400+z2); return {x:cx+x1*s,y:cy+y1*s,z:z2,scale:s}; });
        var lc = lerpColor(currentColors[0], targetColors[0], colorProgress), nc1 = lerpColor(currentColors[1], targetColors[1], colorProgress), nc2 = lerpColor(currentColors[2], targetColors[2], colorProgress);
        connections.forEach(function(c) { var p1=projected[c[0]],p2=projected[c[1]],o=Math.min(p1.scale,p2.scale)*0.6; ctx.strokeStyle=lc.replace('rgb','rgba').replace(')',' ,' + (o*0.4) + ')'); ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(p1.x,p1.y); ctx.lineTo(p2.x,p2.y); ctx.stroke(); });
        projected.forEach(function(p, i) { var col = i%2===0?nc1:nc2, rgb=col.match(/\d+/g); if(rgb){ctx.fillStyle='rgba('+rgb[0]+','+rgb[1]+','+rgb[2]+',' + (p.scale*0.9) + ')'; ctx.shadowBlur=10; ctx.shadowColor=col; ctx.beginPath(); ctx.arc(p.x,p.y,p.scale*2.5,0,Math.PI*2); ctx.fill();} });
        ctx.shadowBlur=0;
        if (Math.random() > 0.92) { var c = connections[Math.floor(Math.random()*connections.length)]; dataPackets.push({p1:c[0],p2:c[1],t:0,color:currentColors[Math.floor(Math.random()*3)]}); }
        for (var d = dataPackets.length - 1; d >= 0; d--) { dataPackets[d].t += 0.05; if (dataPackets[d].t > 1) { dataPackets.splice(d, 1); continue; } var pp1=projected[dataPackets[d].p1],pp2=projected[dataPackets[d].p2]; ctx.fillStyle=dataPackets[d].color; ctx.shadowBlur=15; ctx.shadowColor=dataPackets[d].color; ctx.beginPath(); ctx.arc(pp1.x+(pp2.x-pp1.x)*dataPackets[d].t, pp1.y+(pp2.y-pp1.y)*dataPackets[d].t, 3, 0, Math.PI*2); ctx.fill(); }
        ctx.shadowBlur=0;
      }

      window.addEventListener('resize', function() { resize(); });
      function loop() { drawMatrix(); drawAI(); requestAnimationFrame(loop); }
      loop();
    } else {
      function loopMatrix() { drawMatrix(); requestAnimationFrame(loopMatrix); }
      function loopMatrix2() { drawMatrix(); requestAnimationFrame(loopMatrix2); }
      loopMatrix();
    }
  }

  /* ===== Smooth Scroll ===== */
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
});
