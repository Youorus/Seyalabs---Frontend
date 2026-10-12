/* Deterministic motion graphics: typography, UI textures and perspective are rendered at export time. */
(() => {
  const assets = window.SEYA_FILM_ASSETS,
    story = assets.storyboard;
  const canvas = document.getElementById("film"),
    ctx = canvas.getContext("2d");
  const P = {
    ink: "#11100E",
    paper: "#F3F0E8",
    copper: "#D65A31",
    light: "#FFA27B",
    muted: "#B6ADA7",
    line: "#ffffff20",
  };
  const logo = new Path2D(assets.logoPath);
  const renderMode = new URLSearchParams(location.search).has("render");
  let format =
    new URLSearchParams(location.search).get("format") || "landscape";
  let w = 1920,
    h = 1080,
    portrait = false,
    time = 0,
    playing = false,
    sound = true;
  const clamp = (n, a = 0, b = 1) => Math.max(a, Math.min(b, n));
  const ease = (n) => 1 - Math.pow(1 - clamp(n), 4);
  const smooth = (n) => {
    const p = clamp(n);
    return p * p * (3 - 2 * p);
  };
  const enter = (t, d = 0, duration = 0.5) => ease((t - d) / duration);
  function box(x, y, width, height, fill, stroke = null, radius = 16, c = ctx) {
    c.beginPath();
    c.roundRect(x, y, width, height, radius);
    if (fill) {
      c.fillStyle = fill;
      c.fill();
    }
    if (stroke) {
      c.strokeStyle = stroke;
      c.lineWidth = 1.4;
      c.stroke();
    }
  }
  function text(
    s,
    x,
    y,
    size = 64,
    color = P.paper,
    weight = 500,
    align = "center",
    font = "SeyaBody",
    c = ctx,
  ) {
    c.font = `${weight} ${size}px ${font}`;
    c.textAlign = align;
    c.textBaseline = "middle";
    c.fillStyle = color;
    c.fillText(s, x, y);
  }
  function fit(s, size, width, font = "SeyaBody", weight = 500) {
    ctx.font = `${weight} ${size}px ${font}`;
    return Math.min(size, (size * width) / ctx.measureText(s).width);
  }
  function lines(s, size, width, font = "SeyaBody") {
    ctx.font = `500 ${size}px ${font}`;
    const out = [];
    let line = "";
    for (const word of s.split(/\s+/)) {
      const next = line ? `${line} ${word}` : word;
      if (line && ctx.measureText(next).width > width) {
        out.push(line);
        line = word;
      } else line = next;
    }
    if (line) out.push(line);
    return out;
  }
  function mark(x, y, height, color = P.paper, c = ctx) {
    c.save();
    c.translate(x, y);
    c.scale(height / 720, height / 720);
    c.fillStyle = color;
    c.fill(logo);
    c.restore();
  }
  function brand(cx, cy, size = 60, alpha = 1) {
    ctx.save();
    ctx.globalAlpha *= alpha;
    const width = size * 6.15;
    mark(cx - width / 2, cy - size * 0.65, size * 1.3);
    text(
      "SEYA",
      cx - width / 2 + size * 1.48,
      cy,
      size,
      P.paper,
      650,
      "left",
      "SeyaDisplay",
    );
    ctx.font = `650 ${size}px SeyaDisplay`;
    text(
      "LABS",
      cx - width / 2 + size * 1.7 + ctx.measureText("SEYA").width,
      cy,
      size,
      P.paper,
      400,
      "left",
      "SeyaDisplay",
    );
    ctx.restore();
  }
  function background(t, warm = false) {
    ctx.fillStyle = P.ink;
    ctx.fillRect(0, 0, w, h);
    const g = ctx.createRadialGradient(
      w * 0.78 + Math.sin(t * 0.14) * w * 0.1,
      h * 0.95,
      0,
      w * 0.7,
      h * 0.9,
      w * 0.9,
    );
    g.addColorStop(0, warm ? "#81452C" : "#53312B");
    g.addColorStop(0.48, "#282020");
    g.addColorStop(1, "#11100E");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    ctx.save();
    ctx.globalAlpha = 0.07;
    ctx.fillStyle = "#C9BDAE";
    for (let y = 32; y < h; y += 48) {
      for (let x = 32; x < w; x += 48) {
        const alpha = (Math.sin(x * 17.1 + y * 7.3) + 1) / 2;
        ctx.globalAlpha = 0.018 + alpha * 0.025;
        ctx.fillRect(x, y, 1.5, 1.5);
      }
    }
    ctx.restore();
  }
  // Each phrase moves independently, settles quickly and remains readable before the next beat.
  function kinetic(s, cx, cy, size, t, start, end, color = P.paper, opts = {}) {
    const p = enter(t, start, 0.46),
      out = end === Infinity ? 0 : smooth((t - (end - 0.22)) / 0.22);
    if (t < start || p < 0.001 || out >= 1) return;
    ctx.save();
    ctx.globalAlpha *= p * (1 - out);
    ctx.translate(
      cx + (opts.fromX || 0) * (1 - p) - out * 55,
      cy + (1 - p) * 32 - out * 15,
    );
    ctx.scale(0.96 + 0.04 * p, 0.96 + 0.04 * p);
    ctx.filter = `blur(${((1 - p) * 14 + out * 10).toFixed(2)}px)`;
    const rows = Array.isArray(s) ? s : lines(s, size, opts.width || w * 0.86);
    rows.forEach((v, i) =>
      text(
        v,
        0,
        (i - (rows.length - 1) / 2) * size * 1.18,
        fit(v, size, opts.width || w * 0.86),
        color,
        opts.weight || 500,
        "center",
        opts.font || "SeyaBody",
      ),
    );
    ctx.restore();
  }
  function chip(label, cx, cy, width, t, delay = 0, active = false) {
    const p = enter(t, delay, 0.4);
    if (p <= 0) return;
    ctx.save();
    ctx.globalAlpha *= p;
    ctx.translate(0, (1 - p) * 25);
    box(
      cx - width / 2,
      cy - 36,
      width,
      72,
      active ? P.copper : "#ffffff0D",
      active ? "#E47D57" : "#ffffff35",
      36,
    );
    text(label, cx, cy, 28, active ? P.paper : "#E9E1DA", 500);
    ctx.restore();
  }
  const deviceCanvas = document.createElement("canvas");
  deviceCanvas.width = 480;
  deviceCanvas.height = 940;
  function phoneTexture(mode, local) {
    const c = deviceCanvas.getContext("2d");
    c.clearRect(0, 0, 480, 940);
    const bezel = c.createLinearGradient(0, 0, 480, 940);
    bezel.addColorStop(0, "#A79D98");
    bezel.addColorStop(0.12, "#38332F");
    bezel.addColorStop(0.8, "#181615");
    bezel.addColorStop(1, "#75685F");
    box(0, 0, 480, 940, bezel, "#B7AAA1", 62, c);
    box(12, 12, 456, 916, "#080707", null, 53, c);
    box(24, 25, 432, 890, P.paper, null, 43, c);
    box(145, 34, 190, 36, "#10100F", null, 18, c);
    text("9:41", 68, 60, 18, P.ink, 650, "left", "SeyaBody", c);
    text("•••", 410, 60, 18, P.ink, 600, "right", "SeyaBody", c);
    const isProblem = mode === "problem";
    text(
      isProblem ? "Votre quotidien" : "Mon activité",
      55,
      139,
      37,
      P.ink,
      650,
      "left",
      "SeyaDisplay",
      c,
    );
    text(
      isProblem ? "Tout reste à faire." : "Tout se retrouve ici.",
      55,
      186,
      21,
      "#72695F",
      400,
      "left",
      "SeyaBody",
      c,
    );
    const labels = isProblem
      ? [
          "Commande à retrouver",
          "Facture à ressaisir",
          "Planning à vérifier",
          "Client à relancer",
        ]
      : [
          "Commande reçue",
          "Planning à jour",
          "Facture préparée",
          "Client informé",
        ];
    labels.forEach((label, i) => {
      const y = 246 + i * 126;
      box(48, y, 384, 105, "#FFFFFF", "#DED6CA", 18, c);
      box(63, y + 22, 48, 48, isProblem ? "#F3E2D8" : "#E2E8DA", null, 13, c);
      text(
        isProblem ? "!" : "✓",
        87,
        y + 47,
        25,
        isProblem ? P.copper : "#59704E",
        600,
        "center",
        "SeyaBody",
        c,
      );
      text(label, 128, y + 36, 20, P.ink, 600, "left", "SeyaBody", c);
      text(
        isProblem ? "À traiter" : "Suivi centralisé",
        128,
        y + 70,
        17,
        "#776D65",
        400,
        "left",
        "SeyaBody",
        c,
      );
    });
    box(48, 799, 384, 66, isProblem ? "#E8E0D5" : P.copper, null, 22, c);
    text(
      isProblem
        ? "Encore un autre logiciel…"
        : "Votre métier. Votre application.",
      240,
      832,
      isProblem ? 19 : 20,
      isProblem ? "#6B625B" : "#FFFFFF",
      550,
      "center",
      "SeyaBody",
      c,
    );
    box(166, 894, 148, 6, "#27221E", null, 3, c);
    void local;
    return deviceCanvas;
  }
  // A triangulated texture produces true pinhole perspective without a 3D runtime dependency.
  function triangle(image, source, target) {
    const [a, b, c] = source,
      [u, v, z] = target;
    const d = a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y);
    if (Math.abs(d) < 0.001) return;
    const ax = (u.x * (b.y - c.y) + v.x * (c.y - a.y) + z.x * (a.y - b.y)) / d,
      bx = (u.y * (b.y - c.y) + v.y * (c.y - a.y) + z.y * (a.y - b.y)) / d,
      cx = (u.x * (c.x - b.x) + v.x * (a.x - c.x) + z.x * (b.x - a.x)) / d,
      dx = (u.y * (c.x - b.x) + v.y * (a.x - c.x) + z.y * (b.x - a.x)) / d,
      ex =
        (u.x * (b.x * c.y - c.x * b.y) +
          v.x * (c.x * a.y - a.x * c.y) +
          z.x * (a.x * b.y - b.x * a.y)) /
        d,
      fx =
        (u.y * (b.x * c.y - c.x * b.y) +
          v.y * (c.x * a.y - a.x * c.y) +
          z.y * (a.x * b.y - b.x * a.y)) /
        d;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(u.x, u.y);
    ctx.lineTo(v.x, v.y);
    ctx.lineTo(z.x, z.y);
    ctx.closePath();
    ctx.clip();
    ctx.transform(ax, bx, cx, dx, ex, fx);
    ctx.drawImage(image, 0, 0);
    ctx.restore();
  }
  function phone(cx, cy, scale, local, mode = "app") {
    const source = phoneTexture(mode, local),
      rotation = -0.2 + 0.1 * Math.sin(local * 0.65);
    const zRotation = -0.035 + 0.015 * Math.sin(local * 0.4);
    const project = (x, y) => {
      const xx = (x - 240) * scale,
        yy = (y - 470) * scale,
        z = -xx * Math.sin(rotation),
        px = xx * Math.cos(rotation),
        f = 1300 / (1300 + z);
      return {
        x: cx + (px * Math.cos(zRotation) - yy * Math.sin(zRotation)) * f,
        y: cy + (px * Math.sin(zRotation) + yy * Math.cos(zRotation)) * f,
      };
    };
    ctx.save();
    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 520 * scale);
    glow.addColorStop(0, "#D65A3122");
    glow.addColorStop(1, "#D65A3100");
    ctx.fillStyle = glow;
    ctx.fillRect(
      cx - 600 * scale,
      cy - 600 * scale,
      1200 * scale,
      1200 * scale,
    );
    const cols = 6,
      rows = 12;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = (col * 480) / cols,
          y = (row * 940) / rows,
          x2 = ((col + 1) * 480) / cols,
          y2 = ((row + 1) * 940) / rows;
        const a = { x, y },
          b = { x: x2, y },
          c = { x: x2, y: y2 },
          d = { x, y: y2 };
        triangle(
          source,
          [a, b, c],
          [project(x, y), project(x2, y), project(x2, y2)],
        );
        triangle(
          source,
          [a, c, d],
          [project(x, y), project(x2, y2), project(x, y2)],
        );
      }
    }
    ctx.restore();
  }
  function windowUI(cx, cy, width, height, local, assistant = false) {
    ctx.save();
    const p = enter(local, 0.08);
    ctx.globalAlpha *= p;
    ctx.translate(cx, cy + (1 - p) * 100);
    ctx.rotate(-0.018 + 0.008 * Math.sin(local * 0.4));
    ctx.shadowColor = "#D65A3140";
    ctx.shadowBlur = 50;
    box(-width / 2, -height / 2, width, height, "#211D1B", "#B0775A", 26);
    ctx.shadowBlur = 0;
    const x = -width / 2 + 30,
      y = -height / 2 + 28;
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = ["#D65A31", "#C9BDAE", "#65704F"][i];
      ctx.beginPath();
      ctx.arc(x + i * 21, y, 5, 0, Math.PI * 2);
      ctx.fill();
    }
    text(
      assistant ? "Votre assistant" : "Votre espace métier",
      0,
      y,
      22,
      "#C9BDAE",
      450,
    );
    ctx.strokeStyle = "#FFFFFF12";
    ctx.beginPath();
    ctx.moveTo(-width / 2, y + 26);
    ctx.lineTo(width / 2, y + 26);
    ctx.stroke();
    if (assistant) {
      text(
        "Où en est la commande ?",
        x,
        -height * 0.16,
        34,
        P.paper,
        500,
        "left",
      );
      box(x, -height * 0.02, width - 60, height * 0.36, "#F3F0E8", null, 17);
      text(
        "Commande confirmée.",
        x + 25,
        height * 0.07,
        32,
        P.ink,
        600,
        "left",
      );
      text(
        "Livraison prévue jeudi.",
        x + 25,
        height * 0.16,
        29,
        "#635A52",
        400,
        "left",
      );
      chip(
        "L’information, retrouvée.",
        0,
        height * 0.35,
        width * 0.7,
        local,
        0.8,
        true,
      );
    } else {
      const labels = ["Commandes", "Clients", "Planning"];
      labels.forEach((s, i) => {
        const cell = (width - 80) / 3;
        box(
          x + i * (cell + 10),
          -height * 0.23,
          cell,
          55,
          i === 0 ? P.copper : "#ffffff0D",
          null,
          12,
        );
        text(
          s,
          x + i * (cell + 10) + cell / 2,
          -height * 0.23 + 27,
          23,
          P.paper,
          500,
        );
      });
      const names = ["Nouvelle demande", "Rendez-vous prévu", "Suivi client"];
      names.forEach((s, i) => {
        const top = -height * 0.02 + i * 76;
        const q = enter(local, 0.45 + i * 0.22);
        ctx.save();
        ctx.globalAlpha *= q;
        box(x, top, width - 60, 62, "#F3F0E8", null, 12);
        text(s, x + 24, top + 31, 26, P.ink, 550, "left");
        text("✓", width / 2 - 62, top + 31, 26, P.copper, 600, "right");
        ctx.restore();
      });
      text("Exemple illustratif", 0, height / 2 - 28, 18, "#B6ADA7", 400);
    }
    ctx.restore();
  }
  function hook(t) {
    kinetic(
      "Votre activité grandit.",
      w / 2,
      h * 0.44,
      portrait ? 83 : 103,
      t,
      0.12,
      1.85,
    );
    kinetic(
      ["Vos outils", "vous freinent ?"],
      w / 2,
      h * 0.45,
      portrait ? 109 : 121,
      t,
      1.8,
      4,
      P.paper,
      { font: "SeyaDisplay" },
    );
    if (t > 2) {
      const p = enter(t, 2.05);
      ctx.save();
      ctx.globalAlpha = p * 0.5;
      chip("Planning", w * 0.2, h * 0.76, portrait ? 220 : 280, t, 2.1);
      chip("Factures", w * 0.77, h * 0.26, portrait ? 220 : 280, t, 2.25);
      chip("Commandes", w * 0.75, h * 0.75, portrait ? 260 : 300, t, 2.45);
      ctx.restore();
    }
  }
  function problem(t) {
    const p = enter(t, 0.05);
    const cx = portrait ? w / 2 : w * 0.32,
      cy = portrait ? h * 0.37 : h * 0.48;
    ctx.save();
    ctx.globalAlpha = p;
    ctx.filter = `blur(${(1 - p) * 15}px)`;
    phone(cx + (1 - p) * 130, cy, portrait ? 1.03 : 0.83, t, "problem");
    ctx.restore();
    const tx = portrait ? w / 2 : w * 0.7,
      ty = portrait ? h * 0.76 : h * 0.48;
    kinetic(
      ["Tout est", "éparpillé."],
      tx,
      ty,
      portrait ? 84 : 99,
      t,
      0.65,
      5,
      P.paper,
      { width: portrait ? 920 : 840, font: "SeyaDisplay" },
    );
  }
  function application(t) {
    if (t < 1.5) {
      brand(w / 2, h * 0.43, portrait ? 73 : 82, enter(t, 0.06));
      kinetic(
        "Pensé pour votre métier.",
        w / 2,
        h * 0.63,
        portrait ? 43 : 45,
        t,
        0.4,
        1.5,
        P.light,
      );
      return;
    }
    kinetic(
      ["Une application.", "Votre activité."],
      w / 2,
      portrait ? h * 0.18 : h * 0.2,
      portrait ? 70 : 68,
      t,
      1.5,
      6,
      P.paper,
      { width: w * 0.89 },
    );
    if (portrait) {
      phone(w / 2, h * 0.55, 1.08, t - 1.5);
      chip("Tout au même endroit.", w / 2, h * 0.84, 690, t, 2.7, true);
    } else {
      windowUI(w * 0.44, h * 0.59, 1000, 540, t - 1.5);
      phone(w * 0.77, h * 0.58, 0.62, t - 1.5);
    }
  }
  function automation(t) {
    if (t < 4.4) {
      kinetic(
        "Une action. La suite s’enchaîne.",
        w / 2,
        portrait ? h * 0.23 : h * 0.23,
        portrait ? 61 : 74,
        t,
        0.03,
        4.4,
        P.paper,
        { width: w * 0.88 },
      );
      const labels = ["Demande reçue", "Suivi mis à jour", "Client informé"];
      labels.forEach((s, i) => {
        const cx = portrait ? w / 2 : w * (0.2 + i * 0.3),
          cy = portrait ? h * (0.4 + i * 0.15) : h * 0.52;
        chip(
          s,
          cx,
          cy,
          portrait ? 720 : 480,
          t,
          0.35 + i * 0.85,
          t >= 0.9 + i * 0.85,
        );
        if (i < 2) {
          ctx.save();
          ctx.globalAlpha = enter(t, 0.8 + i * 0.85);
          text(
            portrait ? "↓" : "→",
            portrait ? w / 2 : w * (0.35 + i * 0.3),
            portrait ? cy + h * 0.075 : cy,
            36,
            P.light,
          );
          ctx.restore();
        }
      });
    } else {
      kinetic(
        "Un assistant qui vous aide.",
        w / 2,
        portrait ? h * 0.23 : h * 0.2,
        portrait ? 61 : 74,
        t,
        4.4,
        8,
        P.paper,
        { width: w * 0.88 },
      );
      windowUI(
        w / 2,
        portrait ? h * 0.57 : h * 0.56,
        portrait ? 850 : 1050,
        portrait ? 580 : 530,
        t - 4.4,
        true,
      );
    }
    text(
      "Exemple illustratif",
      w / 2,
      portrait ? h * 0.86 : h * 0.86,
      portrait ? 23 : 20,
      P.muted,
      400,
    );
  }
  function services(t) {
    const items = [
      ["Applications", "web & mobiles"],
      ["Données & API", "vos logiciels connectés"],
      ["Automatisation", "moins de ressaisie"],
      ["Intelligence artificielle", "l’information utile"],
      ["Formations", "vos équipes autonomes"],
    ];
    const normalized = (value) =>
      value
        .normalize("NFD")
        .replace(/\p{M}/gu, "")
        .toLowerCase()
        .replace(/[^\p{L}\p{N}]/gu, "");
    const starts = [
      "Applications",
      "données",
      "automatisation",
      "intelligence",
      "formations",
    ].map((word, index) => {
      const cue = (assets.words || []).find(
        (c) => c.scene === 4 && normalized(c.text) === normalized(word),
      );
      return index === 0
        ? 0
        : cue
          ? Math.max(0, cue.start - story.scenes[4].start - 0.16)
          : index * 1.4;
    });
    const n = Math.max(
      0,
      starts.findLastIndex((start) => t >= start),
    );
    kinetic(
      items[n][0],
      w / 2,
      h * 0.43,
      portrait ? 75 : 115,
      t,
      starts[n],
      n === 4 ? 8 : starts[n + 1],
      P.paper,
      { width: w * 0.88, font: "SeyaDisplay" },
    );
    kinetic(
      items[n][1],
      w / 2,
      h * 0.56,
      portrait ? 42 : 46,
      t,
      starts[n] + 0.08,
      n === 4 ? 8 : starts[n + 1],
      P.light,
    );
    for (let i = 0; i < 5; i++) {
      ctx.fillStyle = i <= n ? P.copper : "#ffffff30";
      box(
        w / 2 - 120 + i * 50,
        h * 0.74,
        i === n ? 34 : 15,
        5,
        ctx.fillStyle,
        null,
        3,
      );
    }
  }
  function pricing(t) {
    background(time, true);
    kinetic(
      "Notre plus ?",
      w / 2,
      h * 0.35,
      portrait ? 65 : 76,
      t,
      0.08,
      1.25,
      P.muted,
    );
    kinetic(
      ["Des tarifs", "accessibles."],
      w / 2,
      h * 0.42,
      portrait ? 114 : 142,
      t,
      1.2,
      6,
      P.paper,
      { font: "SeyaDisplay" },
    );
    ctx.save();
    ctx.globalAlpha = enter(t, 2);
    const width = portrait ? 710 : 880;
    box(w / 2 - width / 2, h * 0.61, width, 4, P.copper, null, 2);
    ctx.restore();
    kinetic(
      ["Un projet pensé", "pour votre budget."],
      w / 2,
      h * 0.73,
      portrait ? 49 : 54,
      t,
      2.6,
      6,
      P.light,
    );
  }
  function benefit(t) {
    kinetic(
      "Vos outils suivent.",
      w / 2,
      h * 0.4,
      portrait ? 80 : 101,
      t,
      0.05,
      1.5,
      P.paper,
    );
    kinetic(
      "Vous avancez.",
      w / 2,
      h * 0.47,
      portrait ? 106 : 137,
      t,
      1.45,
      3,
      P.light,
      { font: "SeyaDisplay" },
    );
  }
  function closing(t) {
    brand(
      w / 2,
      portrait ? h * 0.24 : h * 0.23,
      portrait ? 73 : 78,
      enter(t, 0.05),
    );
    kinetic(
      ["Des outils sur mesure.", "Un budget à votre mesure."],
      w / 2,
      portrait ? h * 0.48 : h * 0.49,
      portrait ? 67 : 83,
      t,
      0.5,
      Infinity,
      P.paper,
      { width: w * 0.88, font: "SeyaDisplay" },
    );
    const p = enter(t, 2.2);
    ctx.save();
    ctx.globalAlpha = p;
    box(
      w / 2 - (portrait ? 350 : 390),
      h * 0.72,
      portrait ? 700 : 780,
      100,
      P.copper,
      null,
      50,
    );
    text(
      "Parlons de votre projet  ↗",
      w / 2,
      h * 0.72 + 50,
      portrait ? 35 : 37,
      P.paper,
      550,
    );
    text("seyalabs.com", w / 2, h * 0.86, portrait ? 52 : 44, P.paper, 500);
    ctx.restore();
  }
  function captions(index) {
    const cue = assets.cues.find(
      (c) => c.scene === index && time >= c.start && time < c.end,
    );
    if (!cue) return;
    const size = portrait ? 31 : 27,
      width = portrait ? 850 : 1450,
      rows = lines(cue.text, size, width),
      height = rows.length * size * 1.3 + 24,
      y = portrait ? 1718 : 1001;
    box(
      (w - width) / 2 - 16,
      y - height / 2,
      width + 32,
      height,
      "#11100EEB",
      null,
      8,
    );
    rows.forEach((s, i) =>
      text(
        s,
        w / 2,
        y + (i - (rows.length - 1) / 2) * size * 1.3,
        size,
        P.paper,
        450,
      ),
    );
  }
  function setFormat(next) {
    format = next;
    portrait = next === "portrait";
    w = portrait ? 1080 : 1920;
    h = portrait ? 1920 : 1080;
    canvas.width = w;
    canvas.height = h;
    document.querySelector(".stage").classList.toggle("portrait", portrait);
    document
      .querySelectorAll("[data-format]")
      .forEach((b) =>
        b.setAttribute("aria-pressed", String(b.dataset.format === next)),
      );
  }
  const shots = [
    hook,
    problem,
    application,
    automation,
    services,
    pricing,
    benefit,
    closing,
  ];
  function renderFrame(seconds, nextFormat = format) {
    if (nextFormat !== format) setFormat(nextFormat);
    time = clamp(seconds, 0, story.duration - 0.001);
    const index = story.scenes.findIndex(
        (s) => time >= s.start && time < s.end,
      ),
      scene = story.scenes[index],
      t = time - scene.start;
    ctx.save();
    background(time, index === 5);
    shots[index](t);
    if (index < 7) {
      const out = smooth((time - (scene.end - 0.18)) / 0.18);
      if (out > 0) {
        ctx.save();
        ctx.fillStyle = P.copper;
        ctx.globalAlpha = 0.8;
        ctx.filter = "blur(18px)";
        ctx.translate(-w * 0.25 + out * w * 1.5, 0);
        ctx.transform(1, 0, -0.22, 1, 0, 0);
        ctx.fillRect(0, -50, w * 0.2, h + 100);
        ctx.restore();
      }
    }
    captions(index);
    ctx.restore();
    return { time, index, format, width: w, height: h };
  }
  async function initialise() {
    for (const [name, data] of Object.entries(assets.fonts)) {
      const face = new FontFace(name, `url(data:font/woff2;base64,${data})`, {
        weight: "100 900",
      });
      await face.load();
      document.fonts.add(face);
    }
    await document.fonts.ready;
    setFormat(format);
    renderFrame(1);
    window.renderFrame = renderFrame;
    window.filmReady = true;
    if (renderMode) {
      document.body.classList.add("render-mode");
      renderFrame(0);
      return;
    }
    const audio = document.getElementById("narration"),
      play = document.getElementById("play"),
      seek = document.getElementById("seek"),
      status = document.getElementById("status");
    document.getElementById("production-stage").textContent =
      assets.soundReport?.status === "draft_missing_sound_effects_permission"
        ? "Version de travail V2 : animation et voix prêtes. Les effets sonores ElevenLabs attendent l’activation de la permission Sound Generation de la clé."
        : assets.soundReport?.status === "complete"
          ? "Édition V2 : voix et effets sonores ElevenLabs."
          : "Aperçu de production.";
    const update = () => {
      seek.value = String(time);
      document.getElementById("time").textContent =
        `00:${String(Math.floor(time)).padStart(2, "0")} / 00:45`;
    };
    story.scenes.forEach((s) => {
      const li = document.createElement("li");
      li.textContent = `${s.start}–${s.end} s — ${s.voice}`;
      document.getElementById("transcript").append(li);
    });
    function tick() {
      if (!playing) return;
      renderFrame(audio.currentTime);
      update();
      if (audio.currentTime >= story.duration - 0.05 || audio.ended) {
        playing = false;
        play.textContent = "Revoir le film";
        renderFrame(story.duration - 0.05);
        return;
      }
      requestAnimationFrame(tick);
    }
    play.disabled = false;
    document.getElementById("restart").disabled = false;
    status.textContent =
      "Édition V2 — typographie cinétique et interfaces en perspective. Lecture avec le bouton Lire.";
    play.addEventListener("click", async () => {
      if (playing) {
        audio.pause();
        playing = false;
        play.textContent = "Reprendre";
        return;
      }
      if (audio.ended || time >= story.duration - 0.1) audio.currentTime = 0;
      try {
        audio.muted = !sound;
        await audio.play();
        playing = true;
        play.textContent = "Pause";
        tick();
      } catch {
        status.textContent =
          "Le son n’est pas disponible. Ouvrez le MP4 téléchargé.";
      }
    });
    document.getElementById("restart").addEventListener("click", () => {
      audio.currentTime = 0;
      renderFrame(0);
      update();
    });
    seek.addEventListener("input", () => {
      audio.currentTime = Number(seek.value);
      renderFrame(Number(seek.value));
      update();
    });
    document.getElementById("sound").addEventListener("click", (e) => {
      sound = !sound;
      audio.muted = !sound;
      e.currentTarget.textContent = sound ? "Son activé" : "Son coupé";
      e.currentTarget.setAttribute("aria-pressed", String(sound));
    });
    document.querySelectorAll("[data-format]").forEach((b) =>
      b.addEventListener("click", () => {
        setFormat(b.dataset.format);
        renderFrame(time);
        update();
      }),
    );
  }
  initialise().catch((error) => {
    document.getElementById("status").textContent =
      "La préparation du film a rencontré une erreur.";
    console.error(error);
  });
})();
