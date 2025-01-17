window.onload = function () {
  main();
};

let animPaused = false;
let cc;
let scene;
let skeleton;
let allAGs;

function main() {
  let helpButton = document.getElementById("help");
  let closeButton = document.getElementById("closehelp");
  let pauseButton = document.getElementById("pause");
  let el = document.getElementById("overlay");

  let canvasElement = document.getElementById("renderCanvas");

  helpButton.onclick = closeButton.onclick = () => {
    el.style.visibility = el.style.visibility == "visible" ? "hidden" : "visible";
  };

  pauseButton.onclick = () => {
    if (animPaused) {
      pauseButton.innerHTML = "Pause";
      allAGs[7].stop();
      cc.enableKeyBoard(true);
      cc.resumeAnim();
      canvasElement.focus();
    } else {
      cc.pauseAnim();
      cc.enableKeyBoard(false);
      pauseButton.innerHTML = "Resume";
      allAGs[7].start(false, 1);
      canvasElement.focus();
    }
    animPaused = !animPaused;
  };

  /*
   * The scene
   */
  var canvas = document.querySelector("#renderCanvas");
  var engine = new BABYLON.Engine(canvas, true);
  scene = new BABYLON.Scene(engine);

  scene.clearColor = new BABYLON.Color3(0.75, 0.75, 0.75);
  scene.ambientColor = new BABYLON.Color3(1, 1, 1);

  scene.debugLayer.show({ showExplorer: true, embedMode: true });

  var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
  light.intensity = 0.3;

  var light2 = new BABYLON.DirectionalLight("light2", new BABYLON.Vector3(-1, -1, -1), scene);
  light2.position = new BABYLON.Vector3(0, 128, 0);
  light2.intensity = 0.7;

  var groundMaterial = createGroundMaterial(scene);
  var ground = createGround(scene, groundMaterial);

  loadPlayer(scene, engine, canvas);

  //box to test view obstruction
  var box = BABYLON.Mesh.CreateBox("box", 2, scene);
  box.checkCollisions = true;
  box.position = new BABYLON.Vector3(0, 8, 5);

  window.addEventListener("resize", function () {
    engine.resize();
  });
}

function loadPlayer(scene, engine, canvas) {
  // BABYLON.SceneLoader.ImportMesh("", "https://models.readyplayer.me/63c96afcf5987e4c180668b1.glb", "", scene, (meshes, particleSystems, skeletons) => {
  BABYLON.SceneLoader.ImportMesh("", "player/", "Vincent-frontFacing.glb", scene, (meshes, particleSystems, skeletons) => {
    var player = meshes[0];

    //clean up this player mesh
    //it has camera and lights, lets remove them
    let m = meshes[0].getChildren();
    let l = m.length - 1;
    for (let i = l; i >= 0; i--) {
      if (m[i].name == "Camera" || m[i].name == "Hemi" || m[i].name == "Lamp") m[i].dispose();
    }


    player.position = new BABYLON.Vector3(0, 12, 0);
    player.checkCollisions = true;

    player.ellipsoid = new BABYLON.Vector3(0.5, 1, 0.5);
    player.ellipsoidOffset = new BABYLON.Vector3(0, 1, 0);

    // character controller  needs rotation in euler.
    // if your mesh has rotation in quaternion then convert that to euler.
    // NOTE: The GLTF/GLB files have rotation in quaternion
    player.rotation = player.rotationQuaternion.toEulerAngles();
    player.rotationQuaternion = null;

    //rotate the camera behind the player
    //.glbs are RHS
    var alpha = Math.PI / 2 + player.rotation.y
    var beta = Math.PI / 2.5;
    var target = new BABYLON.Vector3(player.position.x, player.position.y + 1.5, player.position.z);
    var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", alpha, beta, 5, target, scene);

    // make sure the keyboard keys controlling camera are different from those controlling player
    // here we will not use any keyboard keys to control camera
    camera.keysLeft = [];
    camera.keysRight = [];
    camera.keysUp = [];
    camera.keysDown = [];

    // below are all standard camera settings.
    // nothing specific to charcter controller
    camera.wheelPrecision = 15;
    camera.checkCollisions = true;
    // how close can the camera come to player
    camera.lowerRadiusLimit = 1.5;
    // how far can the camera go from the player
    camera.upperRadiusLimit = 20;
    camera.attachControl(canvas, false);

    // provide all your animation groups as a map to the character controller
    // the map should have
    // key = the name of the character controller  animation
    // and
    // value = the AnimationGroup corresponding to that animation.

    allAGs = scene.animationGroups;

    //stop all animations
    //also lets print to console the list of animation groups we have in this file, to help map them properly
    for (i = 0; i < allAGs.length; i++) {
      allAGs[i].stop();
      console.log(i + "," + allAGs[i].name);
    }

    var agMap = createAGmap(allAGs);

    cc = new CharacterController(player, camera, scene, agMap, true);

    cc.setMode(0);
    cc.setTurningOff(true)
    cc.setFaceForward(true)
    //below makes the controller point the camera at the player head which is approx
    //1.5m above the player origin
    cc.setCameraTarget(new BABYLON.Vector3(0, 1.5, 0));

    //if the camera comes close to the player then we want cc to enter first person mode.
    cc.setNoFirstPerson(false);
    //the height of steps which the player can climb
    cc.setStepOffset(0.4);
    //the minimum and maximum slope the player can go up
    //between the two the player will start sliding down if it stops
    cc.setSlopeLimit(30, 60);

    //tell controller
    // - which animation range/ animation group should be used for which player animation
    // - rate at which to play that animation range
    // - wether the animation range should be looped
    //use this if name, rate or looping is different from default
    //set a parm to null if you donot want to change that

    cc.setIdleAnim(null, 1, true);
    cc.setTurnLeftAnim(null, 0.5, true);
    cc.setTurnRightAnim(null, 0.5, true);
    cc.setWalkAnim(agMap["walk2"], 1, true);
    cc.setWalkBackAnim(null, 0.5, true);
    cc.setIdleJumpAnim(null, 0.5, false);
    cc.setRunJumpAnim(null, 0.6, false);
    cc.setFallAnim(null, 2, false);
    cc.setSlideBackAnim(null, 1, false);

    //let's set footstep sound
    //this sound will be played for all actions except idle.
    //the sound will be played twice per cycle of the animation
    //the rate will be set automatically based on frames and fps of animation
    let sound = new BABYLON.Sound(
      "footstep",
      "./sounds/footstep_carpet_000.ogg",
      scene,
      () => {
        cc.setSound(sound);
      },
      { loop: false }
    );

    //set how smmothly should we transition from one animation to another
    cc.enableBlending(0.05);

    //if somehting comes between camera and avatar move camera in front of the obstruction?
    cc.setCameraElasticity(true);
    //if something comes between camera and avatar make the obstruction invisible?
    cc.makeObstructionInvisible(false);

    cc.start();

    engine.runRenderLoop(function () {
      scene.render();
    });
  });
}

function createAGmap(allAGs) {
  //lets map ag groups to the character controller actions.
  let agMap = {
    idle: allAGs[0],
    strafeLeft: allAGs[3],
    strafeRight: allAGs[4],
    turnRight: allAGs[5],
    walk: allAGs[6],
    fall: allAGs[8],
    slideBack: allAGs[9],
    runJump: allAGs[10],
    turnLeft: allAGs[11],
    walkBack: allAGs[12],
    run: allAGs[13],
    idleJump: allAGs[14],
  };

  return agMap;
}

function createGround(scene, groundMaterial) {
  BABYLON.MeshBuilder.CreateGroundFromHeightMap(
    "ground",
    "ground/ground_heightMap.png",
    {
      width: 128,
      height: 128,
      minHeight: 0,
      maxHeight: 10,
      subdivisions: 32,
      onReady: (grnd) => {
        grnd.material = groundMaterial;
        grnd.checkCollisions = true;
        grnd.isPickable = true;
        grnd.freezeWorldMatrix();
      },
    },
    scene
  );
}

function createGroundMaterial(scene) {
  let groundMaterial = new BABYLON.StandardMaterial("groundMat", scene);
  groundMaterial.diffuseTexture = new BABYLON.Texture("ground/ground.jpg", scene);
  groundMaterial.diffuseTexture.uScale = 4.0;
  groundMaterial.diffuseTexture.vScale = 4.0;

  groundMaterial.bumpTexture = new BABYLON.Texture("ground/ground-normal.png", scene);
  groundMaterial.bumpTexture.uScale = 12.0;
  groundMaterial.bumpTexture.vScale = 12.0;

  groundMaterial.diffuseColor = new BABYLON.Color3(0.9, 0.6, 0.4);
  groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  return groundMaterial;
}
