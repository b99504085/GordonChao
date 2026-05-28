/*
  Trial Balloon Mascot Rig Assembler
  Run in After Effects:
  File > Scripts > Run Script File... > select this JSX file.

  This creates one layered precomp per mascot from the cutout parts in:
  after-effects/rig-assets
*/

(function () {
  app.beginUndoGroup("Assemble Trial Balloon Mascot Rigs");

  var scriptFile = new File($.fileName);
  var repoRoot = scriptFile.parent.parent;
  var rigDir = new Folder(repoRoot.fsName + "/after-effects/rig-assets");
  var outputProject = new File(repoRoot.fsName + "/after-effects/TrialBalloonMascotRigs.aep");

  function ensureProject() {
    if (!app.project) {
      app.newProject();
    }
  }

  function readText(file) {
    file.open("r");
    var text = file.read();
    file.close();
    return text;
  }

  function importAsset(relativePath) {
    var file = new File(rigDir.fsName + "/" + relativePath);
    if (!file.exists) {
      throw new Error("Missing rig part: " + file.fsName);
    }
    var options = new ImportOptions(file);
    return app.project.importFile(options);
  }

  function partSize(part) {
    var box = part.sourceBox;
    return [box[2] - box[0], box[3] - box[1]];
  }

  function partCenter(part) {
    var box = part.sourceBox;
    return [(box[0] + box[2]) / 2, (box[1] + box[3]) / 2];
  }

  function compPoint(character, point) {
    return [point[0], point[1]];
  }

  function suggestedAnchor(partName, size) {
    var w = size[0];
    var h = size[1];
    if (partName.indexOf("left_arm") >= 0) return [w * 0.78, h * 0.45];
    if (partName.indexOf("right_arm") >= 0) return [w * 0.22, h * 0.45];
    if (partName.indexOf("left_foot") >= 0) return [w * 0.7, h * 0.25];
    if (partName.indexOf("right_foot") >= 0) return [w * 0.3, h * 0.25];
    if (partName.indexOf("left_ear") >= 0) return [w * 0.72, h * 0.82];
    if (partName.indexOf("right_ear") >= 0) return [w * 0.28, h * 0.82];
    if (partName === "balloon") return [w * 0.52, h * 0.88];
    if (partName === "balloon_string") return [w * 0.5, h * 0.08];
    if (partName === "magnifying_glass") return [w * 0.5, h * 0.55];
    if (partName === "star") return [w * 0.5, h * 0.5];
    return [w * 0.5, h * 0.5];
  }

  function setLayerAnchorKeepingPosition(layer, anchor) {
    var oldAnchor = layer.property("Transform").property("Anchor Point").value;
    var oldPosition = layer.property("Transform").property("Position").value;
    layer.property("Transform").property("Anchor Point").setValue(anchor);
    layer.property("Transform").property("Position").setValue([
      oldPosition[0] + anchor[0] - oldAnchor[0],
      oldPosition[1] + anchor[1] - oldAnchor[1]
    ]);
  }

  function layerOrderWeight(name) {
    if (name === "balloon_string") return 5;
    if (name === "balloon") return 10;
    if (name.indexOf("ear") >= 0) return 15;
    if (name.indexOf("foot") >= 0) return 20;
    if (name === "body") return 30;
    if (name.indexOf("arm") >= 0) return 40;
    if (name.indexOf("cheek") >= 0) return 50;
    if (name.indexOf("eye") >= 0 || name === "mouth") return 60;
    if (name === "star" || name === "magnifying_glass") return 70;
    return 45;
  }

  function addGuideText(comp, text, position) {
    var layer = comp.layers.addText(text);
    layer.name = "Rig Notes";
    var doc = layer.property("Source Text").value;
    doc.text = text;
    doc.fontSize = 28;
    doc.fillColor = [0.45, 0.28, 0.12];
    doc.font = "ArialMT";
    doc.justification = ParagraphJustification.LEFT_JUSTIFY;
    layer.property("Source Text").setValue(doc);
    layer.property("Transform").property("Position").setValue(position);
    layer.enabled = false;
    return layer;
  }

  function animateSample(comp, characterName) {
    var duration = 3;
    comp.duration = duration;
    for (var i = 1; i <= comp.layers.length; i += 1) {
      var layer = comp.layers[i];
      if (layer.name.indexOf("left_arm") >= 0 || layer.name.indexOf("right_arm") >= 0) {
        var rotation = layer.property("Transform").property("Rotation");
        rotation.setValueAtTime(0, -8);
        rotation.setValueAtTime(1.0, 10);
        rotation.setValueAtTime(2.0, -8);
      }
      if (layer.name.indexOf("foot") >= 0) {
        var footRotation = layer.property("Transform").property("Rotation");
        footRotation.setValueAtTime(0, 0);
        footRotation.setValueAtTime(1.0, layer.name.indexOf("left") >= 0 ? -6 : 6);
        footRotation.setValueAtTime(2.0, 0);
      }
      if (layer.name === "balloon" || layer.name === "star" || layer.name === "magnifying_glass") {
        var pos = layer.property("Transform").property("Position");
        var p = pos.value;
        pos.setValueAtTime(0, p);
        pos.setValueAtTime(1.0, [p[0], p[1] - 18]);
        pos.setValueAtTime(2.0, p);
      }
      if (layer.name === "body") {
        var scale = layer.property("Transform").property("Scale");
        scale.setValueAtTime(0, [100, 100]);
        scale.setValueAtTime(1.0, [101.5, 98.5]);
        scale.setValueAtTime(2.0, [100, 100]);
      }
    }
  }

  ensureProject();
  var manifest = {
  "version": 2,
  "note": "Auto-cut MVP rig parts from flat PNG artwork. Use as AE rig draft, not final PSD-quality separation.",
  "characters": {
    "crowd-puller": {
      "source": "role-conformer.png",
      "sourceSize": [
        1254,
        1254
      ],
      "parts": {
        "body": {
          "file": "crowd-puller/body.png",
          "sourceBox": [
            274,
            209,
            987,
            892
          ],
          "center": [
            630.5,
            550.5
          ],
          "suggestedAnchor": "center"
        },
        "left_arm": {
          "file": "crowd-puller/left_arm.png",
          "sourceBox": [
            129,
            429,
            401,
            735
          ],
          "center": [
            265.0,
            582.0
          ],
          "suggestedAnchor": "center"
        },
        "right_arm": {
          "file": "crowd-puller/right_arm.png",
          "sourceBox": [
            855,
            392,
            1125,
            725
          ],
          "center": [
            990.0,
            558.5
          ],
          "suggestedAnchor": "center"
        },
        "left_foot": {
          "file": "crowd-puller/left_foot.png",
          "sourceBox": [
            387,
            789,
            582,
            985
          ],
          "center": [
            484.5,
            887.0
          ],
          "suggestedAnchor": "center"
        },
        "right_foot": {
          "file": "crowd-puller/right_foot.png",
          "sourceBox": [
            694,
            794,
            882,
            985
          ],
          "center": [
            788.0,
            889.5
          ],
          "suggestedAnchor": "center"
        },
        "left_eye": {
          "file": "crowd-puller/left_eye.png",
          "sourceBox": [
            472,
            503,
            531,
            562
          ],
          "center": [
            501.5,
            532.5
          ],
          "suggestedAnchor": "center"
        },
        "right_eye": {
          "file": "crowd-puller/right_eye.png",
          "sourceBox": [
            722,
            495,
            781,
            553
          ],
          "center": [
            751.5,
            524.0
          ],
          "suggestedAnchor": "center"
        },
        "mouth": {
          "file": "crowd-puller/mouth.png",
          "sourceBox": [
            578,
            537,
            677,
            618
          ],
          "center": [
            627.5,
            577.5
          ],
          "suggestedAnchor": "center"
        },
        "left_cheek": {
          "file": "crowd-puller/left_cheek.png",
          "sourceBox": [
            409,
            558,
            522,
            623
          ],
          "center": [
            465.5,
            590.5
          ],
          "suggestedAnchor": "center"
        },
        "right_cheek": {
          "file": "crowd-puller/right_cheek.png",
          "sourceBox": [
            754,
            553,
            867,
            618
          ],
          "center": [
            810.5,
            585.5
          ],
          "suggestedAnchor": "center"
        },
        "balloon": {
          "file": "crowd-puller/balloon.png",
          "source": "hero-mascot.png",
          "sourceBox": [
            72,
            181,
            234,
            402
          ],
          "center": [
            153.0,
            291.5
          ],
          "suggestedAnchor": "center"
        },
        "balloon_string": {
          "file": "crowd-puller/balloon_string.png",
          "source": "hero-mascot.png",
          "sourceBox": [
            80,
            350,
            150,
            688
          ],
          "center": [
            115.0,
            519.0
          ],
          "suggestedAnchor": "center"
        }
      }
    },
    "outlier": {
      "source": "role-minority.png",
      "sourceSize": [
        1254,
        1254
      ],
      "parts": {
        "body": {
          "file": "outlier/body.png",
          "sourceBox": [
            279,
            201,
            982,
            999
          ],
          "center": [
            630.5,
            600.0
          ],
          "suggestedAnchor": "center"
        },
        "left_arm": {
          "file": "outlier/left_arm.png",
          "sourceBox": [
            291,
            714,
            448,
            897
          ],
          "center": [
            369.5,
            805.5
          ],
          "suggestedAnchor": "center"
        },
        "right_arm": {
          "file": "outlier/right_arm.png",
          "sourceBox": [
            664,
            590,
            892,
            846
          ],
          "center": [
            778.0,
            718.0
          ],
          "suggestedAnchor": "center"
        },
        "left_foot": {
          "file": "outlier/left_foot.png",
          "sourceBox": [
            411,
            853,
            582,
            1031
          ],
          "center": [
            496.5,
            942.0
          ],
          "suggestedAnchor": "center"
        },
        "right_foot": {
          "file": "outlier/right_foot.png",
          "sourceBox": [
            632,
            853,
            832,
            1032
          ],
          "center": [
            732.0,
            942.5
          ],
          "suggestedAnchor": "center"
        },
        "left_eye": {
          "file": "outlier/left_eye.png",
          "sourceBox": [
            485,
            456,
            575,
            535
          ],
          "center": [
            530.0,
            495.5
          ],
          "suggestedAnchor": "center"
        },
        "right_eye": {
          "file": "outlier/right_eye.png",
          "sourceBox": [
            711,
            455,
            762,
            505
          ],
          "center": [
            736.5,
            480.0
          ],
          "suggestedAnchor": "center"
        },
        "mouth": {
          "file": "outlier/mouth.png",
          "sourceBox": [
            570,
            515,
            679,
            551
          ],
          "center": [
            624.5,
            533.0
          ],
          "suggestedAnchor": "center"
        },
        "left_cheek": {
          "file": "outlier/left_cheek.png",
          "sourceBox": [
            414,
            522,
            527,
            584
          ],
          "center": [
            470.5,
            553.0
          ],
          "suggestedAnchor": "center"
        },
        "right_cheek": {
          "file": "outlier/right_cheek.png",
          "sourceBox": [
            744,
            522,
            857,
            584
          ],
          "center": [
            800.5,
            553.0
          ],
          "suggestedAnchor": "center"
        },
        "star": {
          "file": "outlier/star.png",
          "sourceBox": [
            755,
            170,
            1007,
            419
          ],
          "center": [
            881.0,
            294.5
          ],
          "suggestedAnchor": "center"
        }
      }
    },
    "shadow": {
      "source": "role-follower.png",
      "sourceSize": [
        1254,
        1254
      ],
      "parts": {
        "body": {
          "file": "shadow/body.png",
          "sourceBox": [
            330,
            335,
            1091,
            1002
          ],
          "center": [
            710.5,
            668.5
          ],
          "suggestedAnchor": "center"
        },
        "left_ear": {
          "file": "shadow/left_ear.png",
          "sourceBox": [
            241,
            136,
            530,
            489
          ],
          "center": [
            385.5,
            312.5
          ],
          "suggestedAnchor": "center"
        },
        "right_ear": {
          "file": "shadow/right_ear.png",
          "sourceBox": [
            440,
            111,
            684,
            424
          ],
          "center": [
            562.0,
            267.5
          ],
          "suggestedAnchor": "center"
        },
        "left_arm": {
          "file": "shadow/left_arm.png",
          "sourceBox": [
            270,
            619,
            472,
            837
          ],
          "center": [
            371.0,
            728.0
          ],
          "suggestedAnchor": "center"
        },
        "right_arm": {
          "file": "shadow/right_arm.png",
          "sourceBox": [
            914,
            583,
            1115,
            817
          ],
          "center": [
            1014.5,
            700.0
          ],
          "suggestedAnchor": "center"
        },
        "left_foot": {
          "file": "shadow/left_foot.png",
          "sourceBox": [
            430,
            849,
            607,
            1049
          ],
          "center": [
            518.5,
            949.0
          ],
          "suggestedAnchor": "center"
        },
        "right_foot": {
          "file": "shadow/right_foot.png",
          "sourceBox": [
            678,
            849,
            863,
            1039
          ],
          "center": [
            770.5,
            944.0
          ],
          "suggestedAnchor": "center"
        },
        "eye": {
          "file": "shadow/eye.png",
          "sourceBox": [
            810,
            653,
            857,
            707
          ],
          "center": [
            833.5,
            680.0
          ],
          "suggestedAnchor": "center"
        },
        "mouth": {
          "file": "shadow/mouth.png",
          "sourceBox": [
            645,
            615,
            777,
            725
          ],
          "center": [
            711.0,
            670.0
          ],
          "suggestedAnchor": "center"
        },
        "cheek": {
          "file": "shadow/cheek.png",
          "sourceBox": [
            848,
            697,
            958,
            759
          ],
          "center": [
            903.0,
            728.0
          ],
          "suggestedAnchor": "center"
        },
        "magnifying_glass": {
          "file": "shadow/magnifying_glass.png",
          "sourceBox": [
            320,
            490,
            720,
            955
          ],
          "center": [
            520.0,
            722.5
          ],
          "suggestedAnchor": "center"
        }
      }
    }
  }
};
  var created = [];

  for (var characterName in manifest.characters) {
    if (!manifest.characters.hasOwnProperty(characterName)) continue;
    var character = manifest.characters[characterName];
    var comp = app.project.items.addComp(
      "rig_" + characterName,
      character.sourceSize[0],
      character.sourceSize[1],
      1,
      3,
      30
    );
    comp.bgColor = [0.98, 0.94, 0.86];

    var parts = [];
    for (var partName in character.parts) {
      if (!character.parts.hasOwnProperty(partName)) continue;
      parts.push({ name: partName, data: character.parts[partName] });
    }
    parts.sort(function (a, b) {
      return layerOrderWeight(a.name) - layerOrderWeight(b.name);
    });

    for (var p = 0; p < parts.length; p += 1) {
      var item = parts[p];
      var footage = importAsset(item.data.file);
      var layer = comp.layers.add(footage);
      layer.name = item.name;

      var size = partSize(item.data);
      var center = partCenter(item.data);
      layer.property("Transform").property("Position").setValue(compPoint(character, center));
      setLayerAnchorKeepingPosition(layer, suggestedAnchor(item.name, size));
    }

    addGuideText(
      comp,
      "MVP rig assembled from flat PNG cutouts. Use Puppet Pin or rotation keyframes for motion.",
      [38, 54]
    );
    animateSample(comp, characterName);
    created.push(comp.name);
  }

  var preview = app.project.items.addComp("rig_preview_all_mascots", 1920, 1080, 1, 3, 30);
  var xPositions = [470, 960, 1450];
  for (var c = 0; c < created.length; c += 1) {
    var rigComp = null;
    for (var itemIndex = 1; itemIndex <= app.project.items.length; itemIndex += 1) {
      if (app.project.items[itemIndex].name === created[c]) {
        rigComp = app.project.items[itemIndex];
        break;
      }
    }
    if (!rigComp) continue;
    var rigLayer = preview.layers.add(rigComp);
    rigLayer.name = created[c];
    rigLayer.property("Transform").property("Position").setValue([xPositions[c], 565]);
    rigLayer.property("Transform").property("Scale").setValue([42, 42]);
  }

  app.project.save(outputProject);
  app.endUndoGroup();

  alert(
    "Mascot rig precomps created and saved:\n" +
      outputProject.fsName +
      "\n\nOpen rig_preview_all_mascots or any rig_* precomp to inspect the layers."
  );
})();
