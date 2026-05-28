/*
  Trial Balloon Opening Scene from Mascot Rigs
  Run this after assemble-mascot-rigs.jsx.

  It creates a 20-second main composition using:
  - rig_crowd-puller
  - rig_outlier
  - rig_shadow
*/

(function () {
  app.beginUndoGroup("Create Trial Balloon Opening Scene from Rigs");

  var scriptFile = new File($.fileName);
  var repoRoot = scriptFile.parent.parent;
  var assetDir = new Folder(repoRoot.fsName + "/public/assets/ui");
  var outputProject = new File(repoRoot.fsName + "/after-effects/TrialBalloonOpeningRigScene.aep");

  function ensureProject() {
    if (!app.project) {
      app.newProject();
    }
  }

  function findItemByName(name) {
    for (var i = 1; i <= app.project.items.length; i += 1) {
      if (app.project.items[i].name === name) {
        return app.project.items[i];
      }
    }
    return null;
  }

  function importUiAsset(name) {
    var file = new File(assetDir.fsName + "/" + name);
    if (!file.exists) {
      throw new Error("Missing UI asset: " + file.fsName);
    }
    return app.project.importFile(new ImportOptions(file));
  }

  function fadeLayer(layer, start, end) {
    var opacity = layer.property("Transform").property("Opacity");
    opacity.setValueAtTime(Math.max(0, start - 0.12), 0);
    opacity.setValueAtTime(start, 100);
    opacity.setValueAtTime(end, 100);
    opacity.setValueAtTime(Math.min(20, end + 0.12), 0);
  }

  function holdFinalLayer(layer, start) {
    var opacity = layer.property("Transform").property("Opacity");
    opacity.setValueAtTime(Math.max(0, start - 0.12), 0);
    opacity.setValueAtTime(start, 100);
    opacity.setValueAtTime(20, 100);
  }

  function setLayerTransform(layer, position, scale) {
    layer.property("Transform").property("Position").setValue(position);
    layer.property("Transform").property("Scale").setValue([scale, scale]);
  }

  function addText(comp, text, position, fontSize, color, start, end, name) {
    var layer = comp.layers.addText(text);
    layer.name = name || text.substr(0, 24);
    var doc = layer.property("Source Text").value;
    doc.text = text;
    doc.font = "Arial-BoldMT";
    doc.fontSize = fontSize;
    doc.leading = Math.round(fontSize * 1.12);
    doc.fillColor = color || [0.12, 0.1, 0.08];
    doc.justification = ParagraphJustification.CENTER_JUSTIFY;
    layer.property("Source Text").setValue(doc);
    layer.property("Transform").property("Position").setValue(position);
    fadeLayer(layer, start, end);
    return layer;
  }

  function addFinalText(comp, text, position, fontSize, color, start, name) {
    var layer = addText(comp, text, position, fontSize, color, start, 20, name);
    holdFinalLayer(layer, start);
    return layer;
  }

  function addRect(comp, name, color, position, size, start, end, radius, strokeColor) {
    var layer = comp.layers.addShape();
    layer.name = name;
    var group = layer.property("Contents").addProperty("ADBE Vector Group");
    var rect = group.property("Contents").addProperty("ADBE Vector Shape - Rect");
    rect.property("Size").setValue(size);
    rect.property("Roundness").setValue(radius || 24);
    var fill = group.property("Contents").addProperty("ADBE Vector Graphic - Fill");
    fill.property("Color").setValue(color);
    if (strokeColor) {
      var stroke = group.property("Contents").addProperty("ADBE Vector Graphic - Stroke");
      stroke.property("Color").setValue(strokeColor);
      stroke.property("Stroke Width").setValue(5);
    }
    layer.property("Transform").property("Position").setValue(position);
    fadeLayer(layer, start, end);
    return layer;
  }

  function addCircle(comp, name, color, position, size, start, end, opacityValue, strokeColor) {
    var layer = comp.layers.addShape();
    layer.name = name;
    var group = layer.property("Contents").addProperty("ADBE Vector Group");
    var ellipse = group.property("Contents").addProperty("ADBE Vector Shape - Ellipse");
    ellipse.property("Size").setValue([size, size]);
    var fill = group.property("Contents").addProperty("ADBE Vector Graphic - Fill");
    fill.property("Color").setValue(color);
    if (strokeColor) {
      var stroke = group.property("Contents").addProperty("ADBE Vector Graphic - Stroke");
      stroke.property("Color").setValue(strokeColor);
      stroke.property("Stroke Width").setValue(8);
    }
    layer.property("Transform").property("Position").setValue(position);
    fadeLayer(layer, start, end);
    layer.property("Transform").property("Opacity").setValueAtTime(start, opacityValue || 38);
    layer.property("Transform").property("Opacity").setValueAtTime(end, opacityValue || 38);
    return layer;
  }

  function addRig(comp, sourceComp, name, position, scale, start, end, bounce) {
    var layer = comp.layers.add(sourceComp);
    layer.name = name;
    setLayerTransform(layer, position, scale);
    layer.startTime = start;
    layer.outPoint = end;
    fadeLayer(layer, start, end);

    layer.timeRemapEnabled = true;
    var remap = layer.property("ADBE Time Remapping");
    remap.expression = 'loopOut("cycle")';

    if (bounce) {
      var pos = layer.property("Transform").property("Position");
      pos.setValueAtTime(start, [position[0], position[1] + 38]);
      pos.setValueAtTime(start + 0.45, position);
      pos.setValueAtTime(start + 1.05, [position[0], position[1] - 18]);
      pos.setValueAtTime(start + 1.7, position);
    }
    return layer;
  }

  function addQuestionCard(comp, start, end, compact, activeOption) {
    var cardY = compact ? 215 : 315;
    var cardH = compact ? 255 : 430;
    addRect(comp, "Question Card", [1, 0.985, 0.94], [960, cardY], [1280, cardH], start, end, 26, [0.9, 0.68, 0.43]);

    if (compact) {
      addText(comp, "Which moment matters most?", [960, 145], 50, [0.12, 0.1, 0.08], start, end, "Question Short");
    } else {
      addText(
        comp,
        "When judging whether someone would be\ra good life partner, which moments\rmatter the most?",
        [960, 190],
        46,
        [0.12, 0.1, 0.08],
        start,
        end,
        "Question Full"
      );
    }

    addOption(comp, "A", "How they speak\runder pressure", 560, compact ? 300 : 465, start, end, activeOption === "A");
    addOption(comp, "B", "How they treat\rservice staff", 960, compact ? 300 : 465, start, end, activeOption === "B");
    addOption(comp, "C", "How they react when\rplans fall apart", 1360, compact ? 300 : 465, start, end, activeOption === "C");
  }

  function addOption(comp, letter, label, x, y, start, end, active) {
    var stroke = active ? [1, 0.46, 0.08] : [0.9, 0.68, 0.43];
    addRect(comp, "Option " + letter, [1, 0.98, 0.94], [x, y], [350, 125], start, end, 24, stroke);
    addText(comp, letter, [x, y - 25], 36, [1, 0.44, 0.07], start, end, "Option Letter " + letter);
    addText(comp, label, [x, y + 30], 31, [0.12, 0.1, 0.08], start, end, "Option Label " + letter);
  }

  function addRoleCard(comp, rigComp, title, subtitle, x, start, end) {
    addRect(comp, "Role Card " + title, [1, 0.985, 0.94], [x, 455], [430, 520], start, end, 26, [0.9, 0.68, 0.43]);
    addRig(comp, rigComp, "Role Rig " + title, [x, 375], 24, start, end, false);
    addText(comp, title, [x, 600], 40, [0.12, 0.1, 0.08], start, end, "Role Title " + title);
    addText(comp, subtitle, [x, 675], 28, [0.49, 0.21, 0.06], start, end, "Role Subtitle " + title);
  }

  ensureProject();

  var crowdRig = findItemByName("rig_crowd-puller");
  var outlierRig = findItemByName("rig_outlier");
  var shadowRig = findItemByName("rig_shadow");

  if (!crowdRig || !outlierRig || !shadowRig) {
    app.endUndoGroup();
    alert("Please run assemble-mascot-rigs.jsx first, then run this script again.");
    return;
  }

  var hero = importUiAsset("hero-mascot.png");

  var comp = app.project.items.addComp("Trial Balloon Opening MVP - Rig Scene", 1920, 1080, 1, 20, 30);
  comp.openInViewer();

  var bg = comp.layers.addSolid([0.98, 0.94, 0.86], "Warm Paper Background", 1920, 1080, 1, 20);
  bg.moveToEnd();

  addText(comp, "Just a normal\rconversation?", [960, 190], 58, [0.49, 0.21, 0.06], 0, 3, "Scene 1 Label");
  addRig(comp, crowdRig, "Scene 1 Crowd-Puller", [610, 630], 30, 0, 3, true);
  addRig(comp, outlierRig, "Scene 1 Outlier", [960, 620], 30, 0.25, 3, true);
  addRig(comp, shadowRig, "Scene 1 Shadow", [1310, 630], 30, 0.5, 3, true);

  addQuestionCard(comp, 3, 6, false, null);

  addQuestionCard(comp, 6, 9, true, "A");
  addRig(comp, crowdRig, "Crowd-Puller Action", [360, 725], 40, 6, 9, true);
  addText(comp, "Someone wants everyone\ron the same side.", [1000, 845], 52, [0.49, 0.21, 0.06], 6, 9, "Crowd Puller Line");

  addQuestionCard(comp, 9, 12, true, "B");
  addRig(comp, outlierRig, "Outlier Action", [960, 720], 40, 9, 12, true);
  addText(comp, "Someone wants to be\rthe only exception.", [960, 845], 52, [0.49, 0.21, 0.06], 9, 12, "Outlier Line");

  addRig(comp, shadowRig, "Shadow Observation", [430, 705], 42, 12, 16, true);
  addCircle(comp, "Magnified Thought Lens", [1, 1, 1], [1035, 515], 430, 12, 16, 36, [0.18, 0.12, 0.08]);
  addRect(comp, "Thought Bubble", [1, 0.985, 0.94], [1395, 300], [590, 205], 12, 16, 28, [0.9, 0.68, 0.43]);
  addText(comp, "\"How will they react\rwhen plans fall apart?\"", [1395, 285], 42, [0.12, 0.1, 0.08], 12, 16, "Thought Bubble Text");
  addText(comp, "Someone is watching\ryour thoughts.", [960, 850], 52, [0.49, 0.21, 0.06], 12, 16, "Shadow Line");

  addRoleCard(comp, crowdRig, "Crowd-Puller", "Pull the room together", 480, 16, 18.5);
  addRoleCard(comp, outlierRig, "Outlier", "Be the only exception", 960, 16, 18.5);
  addRoleCard(comp, shadowRig, "Shadow", "Track your target", 1440, 16, 18.5);

  var heroLayer = comp.layers.add(hero);
  heroLayer.name = "Final Hero Trio";
  setLayerTransform(heroLayer, [960, 330], 38);
  holdFinalLayer(heroLayer, 18.5);
  addFinalText(comp, "Trial Balloon", [960, 665], 128, [0.12, 0.1, 0.08], 18.5, "Final Title");
  addFinalText(comp, "A normal conversation... with secret missions.", [960, 790], 50, [0.49, 0.21, 0.06], 18.5, "Final Subtitle");
  var button = addRect(comp, "Start Game Button", [1, 0.44, 0.07], [960, 910], [310, 82], 18.5, 20, 42, null);
  holdFinalLayer(button, 18.5);
  addFinalText(comp, "Start Game", [960, 928], 42, [1, 1, 1], 18.5, "Start Game Text");

  app.project.save(outputProject);
  app.endUndoGroup();

  alert(
    "Opening scene created and saved:\n" +
      outputProject.fsName +
      "\n\nOpen 'Trial Balloon Opening MVP - Rig Scene' and preview the 20-second timeline."
  );
})();
