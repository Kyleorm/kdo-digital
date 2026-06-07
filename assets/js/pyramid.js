/**
 * KDO Digital — Three.js Pyramid Hero (v3 — Awwwards quality)
 * Classic UMD script — works from file:// and http://.
 * Requires: THREE, THREE.EffectComposer, THREE.UnrealBloomPass, THREE.ShaderPass
 * Optional: THREE.RGBELoader (loads HDR env over HTTP only, not file://)
 */
(function () {
  'use strict';

  if (typeof THREE === 'undefined') {
    console.warn('KDO Pyramid: THREE not loaded');
    return;
  }

  /* ── DOM ─────────────────────────────────────────────────────────────────── */
  var canvas        = document.getElementById('three-canvas');
  var stickyEl      = document.getElementById('pyramid-sticky');
  var scrollSection = document.getElementById('pyramid-scroll');
  var heroText      = document.getElementById('hero-text');
  var scrollHint    = document.getElementById('scroll-hint');

  if (!canvas || !stickyEl || !scrollSection) return;

  var W = function () { return stickyEl.offsetWidth; };
  var H = function () { return stickyEl.offsetHeight; };

  /* ── Scene ───────────────────────────────────────────────────────────────── */
  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0x060608);
  scene.fog = new THREE.FogExp2(0x060608, 0.024);

  /* ── Camera ──────────────────────────────────────────────────────────────── */
  var CAM0  = { x: 0, y: 2.8, z: 8.8 };
  var LOOK0 = { x: 0, y: 1.1, z: 0  };
  var isMobile = window.innerWidth < 768;

  var camera = new THREE.PerspectiveCamera(isMobile ? 62 : 50, W() / H(), 0.1, 120);
  camera.position.set(CAM0.x, CAM0.y, CAM0.z);
  camera.lookAt(LOOK0.x, LOOK0.y, LOOK0.z);

  /* ── Renderer ────────────────────────────────────────────────────────────── */
  var renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W(), H());
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.4;

  /* ── Post-processing ─────────────────────────────────────────────────────── */
  var composer = null;
  var bloom    = null;

  if (typeof THREE.EffectComposer !== 'undefined' &&
      typeof THREE.UnrealBloomPass !== 'undefined') {

    composer = new THREE.EffectComposer(renderer);
    composer.addPass(new THREE.RenderPass(scene, camera));

    bloom = new THREE.UnrealBloomPass(
      new THREE.Vector2(W(), H()),
      3.2,   // strength  — dramatic volumetric glow
      0.85,  // radius    — wide soft spread
      0.48   // threshold — lower = tubes bloom more intensely
    );
    composer.addPass(bloom);

    /* Chromatic aberration — subtle colour fringe on bright edges */
    if (typeof THREE.ShaderPass !== 'undefined') {
      var chromaShader = {
        uniforms: {
          tDiffuse: { value: null },
          amount:   { value: 0.0018 },
        },
        vertexShader: [
          'varying vec2 vUv;',
          'void main() {',
          '  vUv = uv;',
          '  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
          '}',
        ].join('\n'),
        fragmentShader: [
          'uniform sampler2D tDiffuse;',
          'uniform float amount;',
          'varying vec2 vUv;',
          'void main() {',
          '  vec2 dir = vUv - vec2(0.5);',
          '  float dist = length(dir);',
          '  vec2 offset = normalize(dir) * amount * dist * 2.0;',
          '  float r = texture2D(tDiffuse, vUv + offset).r;',
          '  float g = texture2D(tDiffuse, vUv).g;',
          '  float b = texture2D(tDiffuse, vUv - offset).b;',
          '  gl_FragColor = vec4(r, g, b, 1.0);',
          '}',
        ].join('\n'),
      };
      var caPass = new THREE.ShaderPass(chromaShader);
      caPass.renderToScreen = true;
      composer.addPass(caPass);
    }
  }

  /* ── Pyramid ─────────────────────────────────────────────────────────────── */
  var PYR_H = 4.6;
  var PYR_R = 2.2;
  var pyrGeo = new THREE.ConeGeometry(PYR_R, PYR_H, 4);
  pyrGeo.rotateY(Math.PI / 4);

  /* Glossy obsidian — envMap will drive reflections once loaded */
  var pyrMat = new THREE.MeshStandardMaterial({
    color:           0x050507,
    roughness:       0.05,   // near-mirror
    metalness:       0.95,
    envMapIntensity: 0,      // raised to 1.5 once env map loads
  });

  var pyrGroup = new THREE.Group();
  pyrGroup.position.y = PYR_H / 2;
  scene.add(pyrGroup);
  pyrGroup.add(new THREE.Mesh(pyrGeo, pyrMat));

  /* ── Tube edges (replaces thin LineSegments) ──────────────────────────────
     8 edges defined in pyrGroup local space.
     Vertices are post-rotateY(PI/4) positions of the ConeGeometry corners.   */
  var HALF_H = PYR_H / 2;              // 2.3
  var R45    = PYR_R * Math.SQRT2 / 2; // 2.2 × 0.7071 ≈ 1.556

  var apex = new THREE.Vector3( 0,    HALF_H,  0   );
  var b0   = new THREE.Vector3( R45, -HALF_H, -R45 ); // front-right corner
  var b1   = new THREE.Vector3( R45, -HALF_H,  R45 ); // back-right corner
  var b2   = new THREE.Vector3(-R45, -HALF_H,  R45 ); // back-left corner
  var b3   = new THREE.Vector3(-R45, -HALF_H, -R45 ); // front-left corner

  var edgeMat = new THREE.MeshBasicMaterial({
    color:       0x00F5FF,
    transparent: true,
    opacity:     1.0,
  });

  var TUBE_R   = 0.015; // tube radius — bloom turns this into a thick neon bar
  var TUBE_SEG = 6;     // radial segments (hexagonal cross-section)

  /* 4 slant edges + 4 base edges */
  [ [apex, b0], [apex, b1], [apex, b2], [apex, b3],
    [b0,   b1], [b1,   b2], [b2,   b3], [b3,   b0] ].forEach(function (pair) {
    var curve = new THREE.LineCurve3(pair[0], pair[1]);
    pyrGroup.add(
      new THREE.Mesh(new THREE.TubeGeometry(curve, 1, TUBE_R, TUBE_SEG, false), edgeMat)
    );
  });

  /* Bright apex sphere — "hot tip" point that blooms white */
  var apexSphereMat = new THREE.MeshBasicMaterial({
    color:       0xffffff,
    transparent: true,
    opacity:     1.0,
  });
  var apexSphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.055, 8, 8),
    apexSphereMat
  );
  apexSphere.position.copy(apex);
  pyrGroup.add(apexSphere);

  /* ── Trail groups — lagged rotation for motion-blur feel ─────────────────── */
  var edgeGeo = new THREE.EdgesGeometry(pyrGeo); // reused for subtle trails
  var TRAIL_N = 6;
  var trails  = [];
  for (var i = 0; i < TRAIL_N; i++) {
    var tg = new THREE.Group();
    tg.position.y = PYR_H / 2;
    scene.add(tg);
    var tm = new THREE.LineBasicMaterial({
      color:       0x00F5FF,
      transparent: true,
      opacity:     0,
    });
    tg.add(new THREE.LineSegments(edgeGeo, tm));
    trails.push({ group: tg, mat: tm });
  }

  /* ── Grid floor (TRON) ───────────────────────────────────────────────────── */
  var GRID = 60;

  var grid1 = new THREE.GridHelper(GRID, 60, 0x040D18, 0x040D18);
  scene.add(grid1);

  var grid2 = new THREE.GridHelper(GRID, 15, 0x08203A, 0x08203A);
  grid2.position.y = 0.001;
  scene.add(grid2);

  var grid3 = new THREE.GridHelper(GRID, 3, 0x003868, 0x003868);
  grid3.position.y = 0.002;
  scene.add(grid3);

  var floorMat = new THREE.MeshStandardMaterial({
    color:     0x020306,
    roughness: 0.9,
    metalness: 0,
  });
  var floorMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(GRID, GRID),
    floorMat
  );
  floorMesh.rotation.x = -Math.PI / 2;
  floorMesh.position.y = -0.003;
  scene.add(floorMesh);

  /* TRON scan line — sweeps from back to front */
  var scanMat = new THREE.MeshBasicMaterial({
    color:       0x00F5FF,
    transparent: true,
    opacity:     0,
    side:        THREE.DoubleSide,
  });
  var scanLine = new THREE.Mesh(
    new THREE.PlaneGeometry(GRID, 0.07),
    scanMat
  );
  scanLine.rotation.x = -Math.PI / 2;
  scanLine.position.y = 0.012;
  scene.add(scanLine);

  /* ── Particle starfield ───────────────────────────────────────────────────── */
  var P_COUNT = 1800;
  var pPos    = new Float32Array(P_COUNT * 3);
  for (var p = 0; p < P_COUNT; p++) {
    var theta  = Math.random() * Math.PI * 2;
    var phi    = Math.acos(2 * Math.random() - 1);
    var radius = 12 + Math.random() * 20;
    pPos[p * 3]     = radius * Math.sin(phi) * Math.cos(theta);
    pPos[p * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.45 + 4;
    pPos[p * 3 + 2] = radius * Math.cos(phi);
  }
  var pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  var pMat = new THREE.PointsMaterial({
    color:           0xffffff,
    size:            0.055,
    transparent:     true,
    opacity:         0.65,
    sizeAttenuation: true,
  });
  var particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  /* ── Lights ──────────────────────────────────────────────────────────────── */
  scene.add(new THREE.AmbientLight(0x050512, 3));

  /* Atmospheric purple — behind left */
  var purpleLight = new THREE.PointLight(0x8B00FF, 18, 28);
  purpleLight.position.set(-5.5, 6.5, -6);
  scene.add(purpleLight);

  /* Secondary deep violet — behind right */
  var violetLight = new THREE.PointLight(0x5500CC, 8, 18);
  violetLight.position.set(5.5, 4, -6.5);
  scene.add(violetLight);

  /* Key spot for specular highlights on pyramid faces */
  var spotLight = new THREE.SpotLight(0xffffff, 4, 25, Math.PI / 10, 0.55, 1.5);
  spotLight.position.set(3, 12, 5);
  scene.add(spotLight);

  /* Cyan ground glow — pools at the base */
  var groundGlow = new THREE.PointLight(0x00F5FF, 1.2, 8);
  groundGlow.position.set(0, 0.3, 0);
  scene.add(groundGlow);

  /* ── Environment map ─────────────────────────────────────────────────────── */
  var pmremGen = new THREE.PMREMGenerator(renderer);
  pmremGen.compileEquirectangularShader();

  /*
   * Procedural env: coloured MeshBasicMaterial spheres captured by PMREMGenerator.
   * PointLights alone produce nothing in an empty scene — we need visible surfaces.
   * The cube camera sees these patches from the origin and bakes them into the PMREM.
   * Result: purple + cyan reflections sweep across the obsidian faces as it rotates.
   */
  var envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0x020308);

  /* Large inner sphere — dark sky dome */
  envScene.add(new THREE.Mesh(
    new THREE.SphereGeometry(10, 32, 16),
    new THREE.MeshBasicMaterial({ color: 0x020308, side: THREE.BackSide })
  ));

  /* Purple patch — top-back-left, bright enough to show in reflections */
  var ep1 = new THREE.Mesh(
    new THREE.SphereGeometry(1.8, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xbb00ff })
  );
  ep1.position.set(-5.5, 5.5, -5.5);
  envScene.add(ep1);

  /* Cyan accent — front-right-low */
  var ep2 = new THREE.Mesh(
    new THREE.SphereGeometry(1.1, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0x00d8f0 })
  );
  ep2.position.set(5.5, 1, 5.5);
  envScene.add(ep2);

  /* Soft violet — top centre (roof highlight on flat pyramid face) */
  var ep3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.8, 12, 12),
    new THREE.MeshBasicMaterial({ color: 0x440077 })
  );
  ep3.position.set(0, 8, -2);
  envScene.add(ep3);

  scene.environment = pmremGen.fromScene(envScene, 0, 0.1, 30).texture;
  pyrMat.envMapIntensity = 1.2;

  /* HDR override — loads only over HTTP (not file://); falls back silently */
  if (typeof THREE.RGBELoader !== 'undefined') {
    new THREE.RGBELoader()
      .setDataType(THREE.UnsignedByteType)
      .load(
        'Photo%20assets/moonless_golf_1k.hdr',
        function (hdrTex) {
          scene.environment = pmremGen.fromEquirectangular(hdrTex).texture;
          pyrMat.envMapIntensity = 1.6;
          hdrTex.dispose();
          pmremGen.dispose();
        },
        undefined,
        function () { pmremGen.dispose(); } // CORS or file:// — keep procedural env
      );
  } else {
    pmremGen.dispose();
  }

  /* ── Colours ─────────────────────────────────────────────────────────────── */
  var CYAN      = new THREE.Color(0x00F5FF);
  var PURPLE    = new THREE.Color(0x8B00FF);
  var lerpColor = new THREE.Color();

  /* ── Scroll state ─────────────────────────────────────────────────────────── */
  var scrollProg  = 0;
  var isScrolling = false;
  var scrollTimer = null;
  var prevRotY    = 0;

  function calcProgress() {
    var rect   = scrollSection.getBoundingClientRect();
    var top    = rect.top + window.scrollY;
    var travel = scrollSection.offsetHeight - window.innerHeight;
    if (travel <= 0) return;
    scrollProg = Math.max(0, Math.min(1, (window.scrollY - top) / travel));
  }

  window.addEventListener('scroll', function () {
    calcProgress();
    isScrolling = true;
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function () { isScrolling = false; }, 100);
  }, { passive: true });

  /* ── Resize ──────────────────────────────────────────────────────────────── */
  function onResize() {
    var w = W(), h = H();
    isMobile = w < 768;
    camera.fov = isMobile ? 62 : 50;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    if (composer) {
      composer.setSize(w, h);
      if (bloom) bloom.resolution.set(w, h);
    }
  }
  window.addEventListener('resize', onResize);

  /* ── Render loop ─────────────────────────────────────────────────────────── */
  var clock      = new THREE.Clock();
  var SCAN_CYCLE = 12;

  function tick() {
    requestAnimationFrame(tick);

    var t  = clock.getElapsedTime();
    var sp = scrollProg;

    /* Phase 1 (0 → 72% of scroll): full 360° rotation ─────────────────────── */
    var rotPhase  = Math.min(sp / 0.72, 1.0);
    var targetRot = rotPhase * Math.PI * 2;
    pyrGroup.rotation.y = targetRot;

    /* Edge colour: cyan → purple → cyan */
    var colorT = Math.sin(rotPhase * Math.PI);
    lerpColor.lerpColors(CYAN, PURPLE, colorT);
    edgeMat.color.copy(lerpColor);

    /* Phase 2 (72% → 100%): camera descends ─────────────────────────────────── */
    var camPhase = Math.max(0, (sp - 0.72) / 0.28);

    /* Edge + apex breathing — stays opaque then fades as camera drops */
    var breathe     = 0.82 + Math.sin(t * 2.4) * 0.18;
    var edgeOpacity = Math.max(0, breathe * (1 - camPhase * 1.6));
    edgeMat.opacity       = edgeOpacity;
    apexSphereMat.opacity = edgeOpacity;

    /* Bloom fades as camera drops */
    if (bloom) bloom.strength = 3.2 * Math.max(0, 1 - camPhase * 1.4);

    /* Purple atmosphere breathes */
    purpleLight.intensity = (16 + Math.sin(t * 0.75) * 4) * (0.4 + colorT * 0.6);

    /* Ground glow pulses with edge colour */
    groundGlow.intensity = (1.0 + Math.sin(t * 1.8) * 0.5) * Math.max(0, 1 - camPhase * 2);
    groundGlow.color.copy(lerpColor);

    /* Trails */
    var rotDelta      = Math.abs(targetRot - prevRotY);
    var trailStrength = isScrolling ? Math.min(rotDelta * 22, 1.0) : 0;
    var trailFade     = Math.max(0, 1 - camPhase * 2);

    for (var i = 0; i < trails.length; i++) {
      var lag = (i + 1) * 0.042;
      trails[i].group.rotation.y = Math.max(0, rotPhase - lag) * Math.PI * 2;
      trails[i].mat.color.copy(lerpColor);
      trails[i].mat.opacity = trailStrength * (1 - i / TRAIL_N) * 0.28 * trailFade;
    }
    prevRotY = targetRot;

    /* TRON scan line ─────────────────────────────────────────────────────────── */
    var scanT = (t % SCAN_CYCLE) / SCAN_CYCLE;
    scanLine.position.z = (scanT - 0.5) * GRID;
    scanMat.opacity = Math.sin(scanT * Math.PI) * 0.7 * Math.max(0, 1 - camPhase * 2);

    /* Particles drift slowly ────────────────────────────────────────────────── */
    particles.rotation.y += 0.00018;
    particles.rotation.x  = Math.sin(t * 0.012) * 0.08;
    pMat.opacity = 0.65 * Math.max(0, 1 - camPhase * 3);

    /* Camera: idle sway at top + descent in phase 2 ────────────────────────── */
    var swayFactor = Math.max(0, 1 - sp * 15);
    camera.position.x = Math.sin(t * 0.28) * 0.18 * swayFactor;
    camera.position.y = CAM0.y + Math.sin(t * 0.38) * 0.12 * swayFactor
                      - camPhase * 7.5;
    camera.position.z = CAM0.z + camPhase * 1.2;
    camera.lookAt(
      LOOK0.x,
      LOOK0.y - camPhase * 5.5,
      LOOK0.z
    );

    /* Hero text: fade + lift ────────────────────────────────────────────────── */
    if (heroText) {
      heroText.style.opacity   = String(Math.max(0, 1 - sp * 5.5));
      heroText.style.transform = 'translateY(' + (sp * -40) + 'px)';
    }
    if (scrollHint) {
      scrollHint.style.opacity = String(Math.max(0, 1 - sp * 18));
    }

    /* Render ─────────────────────────────────────────────────────────────────── */
    if (composer) {
      composer.render();
    } else {
      renderer.render(scene, camera);
    }
  }

  tick();

})();
