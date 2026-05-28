/*
  Trial Balloon Opening MVP
  Run in After Effects:
  File > Scripts > Run Script File... > select this JSX file.

  The script creates:
  - 1920 x 1080, 20 sec, 30 fps composition
  - 6 storyboard scenes
  - imported role and hero PNG assets
  - animated text, cards, role reveals, and final title lockup
*/

(function () {
  app.beginUndoGroup("Create Trial Balloon Opening MVP");

  var scriptFile = new File($.fileName);
  var repoRoot = scriptFile.parent.parent;
  var assetDir = new Folder(repoRoot.fsName + "/public/assets/ui");
  var outputProject = new File(repoRoot.fsName + "/after-effects/TrialBalloonOpeningMVP.aep");

  function ensureProject() {
    if (!app.project) {
      app.newProject();
    }
  }

  function importAsset(name) {
    var file = new File(assetDir.fsName + "/" + name);
    if (!file.exists) {
      throw new Error("Missing asset: " + file.fsName);
    }
    var options = new ImportOptions(file);
    return app.project.importFile(options);
  }

  function setOpacity(layer, start, end) {
    var opacity = layer.property("Transform").property("Opacity");
    opacity.setValueAtTime(Math.max(0, start - 0.08), 0);
    opacity.setValueAtTime(start, 100);
    opacity.setValueAtTime(end, 100);
    opacity.setValueAtTime(Math.min(20, end + 0.08), 0);
  }

  function setFinalOpacity(layer, start, end) {
    var opacity = layer.property("Transform").property("Opacity");
    opacity.setValueAtTime(Math.max(0, start - 0.08), 0);
    opacity.setValueAtTime(start, 100);
    opacity.setValueAtTime(end, 100);
  }

  function setTransform(layer, position, scale) {
    layer.property("Transform").property("Position").setValue(position);
    layer.property("Transform").property("Scale").setValue([scale, scale]);
  }

  function addText(comp, text, position, fontSize, color, width, height, start, end, name) {
    var layer = comp.layers.addText(text);
    layer.name = name || text.substr(0, 24);
    var doc = layer.property("Source Text").value;
    doc.text = text;
    doc.fontSize = fontSize;
    doc.leading = Math.round(fontSize * 1.12);
    doc.fillColor = color || [0.12, 0.1, 0.08];
    doc.font = "Arial-BoldMT";
    doc.justification = ParagraphJustification.CENTER_JUSTIFY;
    layer.property("Source Text").setValue(doc);
    layer.property("Transform").property("Position").setValue(position);
    setOpacity(layer, start, end);
    return layer;
  }

  function addSolid(comp, name, color, position, size, start, end, radius) {
    var layer = comp.layers.addShape();
    layer.name = name;
    var contents = layer.property("Contents");
    var group = contents.addProperty("ADBE Vector Group");
    var rect = group.property("Contents").addProperty("ADBE Vector Shape - Rect");
    rect.property("Size").setValue(size);
    rect.property("Roundness").setValue(radius || 26);
    var fill = group.property("Contents").addProperty("ADBE Vector Graphic - Fill");
    fill.property("Color").setValue(color);
    var stroke = group.property("Contents").addProperty("ADBE Vector Graphic - Stroke");
    stroke.property("Color").setValue([0.88, 0.67, 0.46]);
    stroke.property("Stroke Width").setValue(4);
    layer.property("Transform").property("Position").setValue(position);
    setOpacity(layer, start, end);
    return layer;
  }

  function addCard(comp, title, body, x, y, w, h, start, end, highlightColor) {
    var bg = addSolid(comp, "Card BG - " + title, [1, 0.98, 0.94], [x, y], [w, h], start, end, 22);
    if (highlightColor) {
      var stroke = bg.property("Contents").property(1).property("Contents").property("ADBE Vector Graphic - Stroke");
      stroke.property("Color").setValue(highlightColor);
      stroke.property("Stroke Width").setValue(7);
    }
    addText(comp, title, [x, y - h * 0.22], 38, [1, 0.44, 0.07], w - 44, 44, start, end, "Card Title - " + title);
    addText(comp, body, [x, y + h * 0.16], 30, [0.12, 0.1, 0.08], w - 44, h * 0.55, start, end, "Card Body - " + title);
  }

  function addImage(comp, footage, name, position, scale, start, end, bounce) {
    var layer = comp.layers.add(footage);
    layer.name = name;
    setTransform(layer, position, scale);
    setOpacity(layer, start, end);
    if (bounce) {
      var pos = layer.property("Transform").property("Position");
      pos.setValueAtTime(start, position);
      pos.setValueAtTime(start + 0.6, [position[0], position[1] - 26]);
      pos.setValueAtTime(start + 1.2, position);
      pos.setValueAtTime(start + 1.8, [position[0], position[1] - 18]);
      pos.setValueAtTime(end, position);
    }
    return layer;
  }

  function addArrow(comp, start, end) {
    addText(comp, ">", [960, 610], 130, [1, 0.44, 0.07], 140, 130, start, end, "Orange Arrow");
  }

  function addQuestion(comp, start, end, compact, activeOption) {
    addSolid(comp, "Question Card BG", [1, 0.985, 0.95], [960, compact ? 190 : 340], compact ? [1200, 250] : [1280, 470], start, end, 18);
    var title = compact
      ? "Which moment matters most?"
      : "When judging whether someone would be\ra good life partner,\rwhich moment matters most?";
    addText(comp, title, [960, compact ? 115 : 195], compact ? 52 : 48, [0.12, 0.1, 0.08], compact ? 1120 : 1160, compact ? 76 : 170, start, end, "Question Title");

    var y = compact ? 245 : 420;
    var w = compact ? 350 : 360;
    var h = compact ? 100 : 142;
    addCard(comp, "A", "How they speak\runder pressure", 560, y, w, h, start, end, activeOption === "A" ? [1, 0.67, 0.13] : null);
    addCard(comp, "B", "How they treat\rservice staff", 960, y, w, h, start, end, activeOption === "B" ? [0.3, 0.68, 0.78] : null);
    addCard(comp, "C", "How they react when\rplans fall apart", 1360, y, w, h, start, end, activeOption === "C" ? [1, 0.67, 0.13] : null);
  }

  function addRoleCard(comp, footage, title, subtitle, x, start, end) {
    addSolid(comp, "Role Card BG - " + title, [1, 0.985, 0.95], [x, 425], [430, 460], start, end, 22);
    addImage(comp, footage, "Role Art - " + title, [x, 335], 20, start, end, false);
    addText(comp, title, [x, 535], 44, [0.12, 0.1, 0.08], 380, 64, start, end, "Role Title - " + title);
    addText(comp, subtitle, [x, 610], 28, [0.12, 0.1, 0.08], 360, 60, start, end, "Role Subtitle - " + title);
  }

  ensureProject();

  var conformer = importAsset("role-conformer.png");
  var minority = importAsset("role-minority.png");
  var follower = importAsset("role-follower.png");
  var hero = importAsset("hero-mascot.png");

  var comp = app.project.items.addComp("Trial Balloon Opening MVP", 1920, 1080, 1, 20, 30);
  comp.openInViewer();

  var bg = comp.layers.addSolid([0.98, 0.94, 0.86], "Warm Paper Background", 1920, 1080, 1, 20);
  bg.moveToEnd();

  // Scene 1: normal conversation
  addText(comp, "Just a normal\rconversation?", [960, 195], 54, [0.49, 0.21, 0.06], 720, 130, 0, 3, "Scene 1 Label");
  addImage(comp, conformer, "Yellow - Scene 1", [620, 620], 24, 0, 3, true);
  addImage(comp, minority, "Blue - Scene 1", [960, 605], 24, 0, 3, true);
  addImage(comp, follower, "Pink - Scene 1", [1300, 620], 24, 0, 3, true);

  // Scene 2: question card
  addQuestion(comp, 3, 6, false, null);

  // Scene 3: crowd-puller
  addQuestion(comp, 6, 9, true, "A");
  addImage(comp, conformer, "Yellow - Crowd Puller", [355, 690], 32, 6, 9, true);
  addArrow(comp, 6, 9);
  addText(comp, "Someone wants everyone\ron the same side.", [960, 850], 50, [0.49, 0.21, 0.06], 920, 130, 6, 9, "Crowd Puller Line");

  // Scene 4: outlier
  addQuestion(comp, 9, 12, true, "B");
  addImage(comp, minority, "Blue - Outlier", [960, 710], 32, 9, 12, true);
  addText(comp, "Someone wants to be\rthe only exception.", [960, 850], 50, [0.49, 0.21, 0.06], 960, 130, 9, 12, "Outlier Line");

  // Scene 5: shadow
  addImage(comp, follower, "Pink - Shadow", [430, 700], 34, 12, 16, true);
  var lens = addSolid(comp, "Magnifying Glass Lens", [1, 1, 1], [1080, 540], [430, 430], 12, 16, 215);
  lens.property("Transform").property("Opacity").setValueAtTime(12, 36);
  addSolid(comp, "Thought Bubble", [1, 0.985, 0.95], [1395, 300], [560, 190], 12, 16, 26);
  addText(comp, "\"Would they notice\rattitude first?\"", [1395, 280], 46, [0.12, 0.1, 0.08], 490, 150, 12, 16, "Thought Text");
  addText(comp, "Someone is watching\ryour thoughts.", [960, 850], 50, [0.49, 0.21, 0.06], 900, 130, 12, 16, "Shadow Line");

  // Scene 6A: role cards
  addRoleCard(comp, conformer, "Crowd-Puller", "Pull the room together", 480, 16, 18.5);
  addRoleCard(comp, minority, "Outlier", "Be the only exception", 960, 16, 18.5);
  addRoleCard(comp, follower, "Shadow", "Track your target", 1440, 16, 18.5);

  // Scene 6B: final title
  var heroLayer = addImage(comp, hero, "Final Hero Trio", [960, 310], 38, 18.5, 20, false);
  setFinalOpacity(heroLayer, 18.5, 20);
  addText(comp, "Trial Balloon", [960, 650], 128, [0.12, 0.1, 0.08], 1000, 150, 18.5, 20, "Final Title");
  addText(comp, "A normal conversation... with secret missions.", [960, 780], 52, [0.49, 0.21, 0.06], 1200, 80, 18.5, 20, "Final Subtitle");
  addSolid(comp, "Start Game Button", [1, 0.44, 0.07], [960, 900], [310, 82], 18.5, 20, 42);
  addText(comp, "Start Game", [960, 918], 42, [1, 1, 1], 300, 60, 18.5, 20, "Start Game Text");

  app.project.save(outputProject);
  app.endUndoGroup();

  alert("Trial Balloon Opening MVP created and saved:\n" + outputProject.fsName + "\n\nOpen the composition named 'Trial Balloon Opening MVP' and preview it.");
})();
