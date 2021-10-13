document.addEventListener("DOMContentLoaded", () => {
  addTouch();
  notification();
  changeOptions("none");
  sounds();
});

// Global variables
let Frame = document.querySelector(".frame");
let Page = document.querySelector(".page");
let refreshMenu = document.getElementById("refresh");
let runOnce = true;
let Logo = document.querySelector(".logo");
let volume = document.querySelector(".volume");
let illustration = document.querySelector(".illustration");

// Modal
let modal = document.querySelector(".modal");
let modalClose = document.querySelector(".modal-close");

// Notifications var
let closeBtn = document.querySelector(".close-btn");
let notify = document.querySelector(".notify");
let touchIcon = document.querySelector(".touch-icon");
let mouseIcon = document.querySelector(".mouse-icon");
let errorIcon = document.querySelector(".error-icon");
let primaryText = document.querySelector(".primary-text");
let secondaryText = document.querySelector(".secondary-text");

// Folder's variables
let Folder = document.querySelector(".folder");
let FolderContainer = document.querySelector(".folder-container");
let FolderName = document.querySelector(".folder-name");
let eyeSet = document.querySelectorAll(".eyes");
let pupilSet = document.querySelectorAll(".pupil");
let Mouth = document.querySelector(".mouth");
let eyeBrows = document.querySelectorAll(".eye-brow");
let sharinganEyes = document.querySelector(".sharingan-eyes");
let isFolderExist;
let isFolderCopy;
let isSelected = false;

// Shadow jutsu clouds
let clouds = document.getElementById("cloud-circle");

// Message Conversation
let MessageText = document.querySelector(".msg-text");

// Flames
let Flames = document.getElementById("flames");
let stage = new Konva.Stage({
  container: "flames",
  width: 500,
  height: 200,
});
let layer = new Konva.Layer();
stage.add(layer);
let canvas = document.createElement("canvas");

// Context Menu Code
let timer;
let touchduration = 500;
let contextMenu = document.getElementById("context-menu");
let menuText_1 = document.querySelector(".menu-text-1");

// For ios devices
let newFolder = document.getElementById("new-folder");
let delFolder = document.getElementById("delete-folder");
let CopyFolder = document.getElementById("copy-folder");
let PasteFolder = document.getElementById("paste-folder");
let RenameFolder = document.getElementById("rename-folder");

function addTouch() {
  // For iOS Devices
  if (!!navigator.platform.match(/iPhone|iPod|iPad/)) {
    window.addEventListener("touchstart", longPress);
    window.addEventListener("touchend", clearTimer);
  } else {
    //Other Devices
    window.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      contextMenu.style.top = e.pageY + "px";
      contextMenu.style.left = e.pageX + "px";
      contextMenu.classList.add("active");
      notify.style.right = "-300px";
      Frame.style.zIndex = "-2";
    });

    window.addEventListener("click", function clickRemove() {
      contextMenu.classList.remove("active");
      deselectFolder();
    });
    window.addEventListener("contextmenu", selectFolder);
  }
}

FolderName.addEventListener("keydown", function pressEnter(event) {
  if (event.keyCode === 13) {
    FolderName.blur();
  }
});

function clearTimer() {
  //stops short touches from firing the event
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
}

// https://stackoverflow.com/a/31535395  how to longPress?
function longPress(ev) {
  if (!timer) {
    timer = setTimeout(function () {
      openMenu(ev);
    }, touchduration);
  }
}

function openMenu(ev) {
  ev.preventDefault();
  contextMenu.style.top = ev.touches[0].pageY + "px";
  contextMenu.style.left = ev.touches[0].pageX + "px";
  contextMenu.classList.add("active");
  contextMenu.addEventListener("touchend", closeMenu);
  newFolder.addEventListener("touchstart", createFolder);
  notify.style.right = "-300px";
  Frame.style.zIndex = "-2";
}

function closeMenu() {
  contextMenu.classList.remove("active");
}
// Context Menu Code End

// notification alert code
function notification() {
  notify.style.right = "10px";
  if ("ontouchstart" in document.body) {
    touchIcon.style.display = "block";
    secondaryText.innerText = "Touch and hold to create a new folder";
  } else {
    mouseIcon.style.display = "block";
  }
}
closeBtn.addEventListener("click", function () {
  notify.style.right = "-400px";
});

// Folder code

function changeOptions(value) {
  delFolder.style.display = value;
  CopyFolder.style.display = value;
  PasteFolder.style.display = value;
  RenameFolder.style.display = value;
}

function createFolder() {
  if (!isFolderExist) {
    FolderContainer.style.display = "block";
    isFolderExist = true;
    FolderName.value = "Mr Untitled Folder";
    menuText_1.innerText = "Open";
    changeOptions("block");
    animations("popUp");
    animations("LookDown");
    illustration.style.display = "none";
    sounds("popUp");
    sounds("themeStop");
    volume.style.display = "none";
    MessageBox("Dude Give me a name !");
    Logo.style.display = "none";
    Mouth.classList.remove("mouth-excited");
    if (runOnce) {
      setTimeout(function () {
        info(
          "Include words Like (Uchiha, Dumb Or leave it Empty)",
          "Try to rename 😁"
        );
        runOnce = false;
      }, 1000);
    }
  } else {
    info(
      "You don't Have enough Chakra to access this folder ",
      "Access Denied"
    );
  }
}

function copyFolder() {
  if (isFolderExist) {
    Folder.style.opacity = "0.6";
    isFolderCopy = true;
    MessageBox("Paste Me ");
  }
}

function pasteFolder() {
  if (isFolderCopy) {
    Folder.style.opacity = "1";
    sounds("summon");
    isFolderCopy = false;
    animations("Flash");
    MessageBox("Clone jutsu Done!");
  } else {
    info("There is Nothing to Paste, Try to Copy First", "Invalid Jutsu");
  }
}

function renameFolder() {
  if (isFolderExist) {
    FolderName.select();
    Frame.style.zIndex = "1";
    MessageBox("Give me a name Like Uchi..");
  }
}

function hideShow(value) {
  eyeBrows.forEach(function (ele) {
    ele.style.display = value;
  });
  Flames.style.display = value;
}

function onNameChange() {
  if (FolderName.value.toLowerCase().includes("dumb")) {
    MessageText.innerText = "I'll kill you with my Amaterasu";
    animations("stareRev");
    animations("angry");
    hideShow("block");
    RenameFolder.style.display = "none";
    CopyFolder.style.display = "none";
    PasteFolder.style.display = "none";
    info("System Crash, Delete him Now!!!", "Forbidden Jutsu Detected");
    Mouth.classList.remove("mouth-excited");
    Frame.style.zIndex = "-2";
    setTimeout(function delay() {
      sharinganEyes.style.display = "block";
      amaterasuFlames();
      sounds("sharingan");
    }, 500);
  } else if (FolderName.value.toLowerCase().includes("uchiha")) {
    MessageText.innerText = "Yes! I like it";
    Mouth.classList.add("mouth-excited");
    animations("stareRev");
  } else if (
    FolderName.value.toLowerCase() === "" ||
    FolderName.value.toLowerCase() === " "
  ) {
    MessageText.innerText = "Really? Don't Leave it empty";
    animations("stareRev");
    Mouth.classList.remove("mouth-excited");
  } else {
    animations("stareRev");
    MessageText.innerText = "No No, I want to be named uchiha folder";
    Mouth.classList.remove("mouth-excited");
  }
}

function deleteFolder() {
  if (isFolderExist) {
    isFolderExist = false;
    initialState();
    menuText_1.innerText = "New folder";
    changeOptions("none");
    animations("popUpRev");
    sharinganEyes.style.display = "none";
    hideShow("none");
    Flames.style.display = "none";
    sounds("theme");
    volume.style.display = "block";
    illustration.style.display = "block";
  }
}

function selectFolder() {
  if (isFolderExist) {
    FolderContainer.style.background = "#fff5";
    FolderContainer.style.border = "2px solid #fff8";
    FolderContainer.style.borderRadius = "10vmin";
    refreshMenu.style.display = "none";
    animations("clearAll");
  }
}

function deselectFolder() {
  FolderContainer.style.background = "#0000";
  FolderContainer.style.border = "none";
  refreshMenu.style.display = "block";
}

function refresh() {
  let Count = Math.floor(Math.random() * 100);
  info(
    " Nine tails Chrome Browser uses Too much Chakra",
    "stops " + Count + " forbidden Jutsu"
  );
}

function About() {
  modal.style.display = "block";
}

modalClose.addEventListener("click", function () {
  modal.style.display = "none";
});

function animations(name) {
  if (name === "popUp") {
    FolderContainer.style.animation = "popUp 0.5s ease-in-out ";
  }
  if (name === "popUpRev") {
    FolderContainer.style.animation = "popUp 0.5s ease-in-out reverse forwards";
  }
  if (name === "Flash") {
    Page.style.animation = "pageFlash 0.4s linear";
  }
  if (name === "clearAll") {
    FolderContainer.style.removeProperty("animation");
    Page.style.removeProperty("animation");
    eyeSet.forEach(function (el) {
      el.style.removeProperty("animation");
    });
    pupilSet.forEach(function (el) {
      el.style.removeProperty("animation");
    });
  }

  if (name === "stare") {
    eyeSet.forEach(function (el) {
      el.style.animation = "blink 3.5s infinite, stare .7s  forwards  ";
      Mouth.classList.remove("mouth-excited");
      MessageBox("???");
    });
    pupilSet.forEach(function (el) {
      el.style.animation = "pupilDownStare .7s  forwards  ";
    });
  }

  if (name === "stareRev") {
    eyeSet.forEach(function (ele) {
      ele.style.animation = "blink 3.5s infinite, Lookup .7s forwards";
    });
    pupilSet.forEach(function (ele) {
      ele.style.animation = "pupilDownStare reverse .7s  forwards ";
    });
  }

  if (name === "LookDown") {
    eyeSet.forEach(function (ele) {
      ele.style.animation = "blink 3.5s infinite, Lookdown 3s linear";
    });
    pupilSet.forEach(function (ele) {
      ele.style.animation = "pupilDown 2s";
      ele.style.animationDelay = ".8s";
    });
  }
}

function initialState() {
  setTimeout(function reset() {
    FolderContainer.style.display = "none";
  }, 500);
}

function info(sub, ttl = "", icon = "error") {
  sounds("notify");
  notify.style.right = "10px";
  primaryText.innerText = ttl;
  secondaryText.innerText = sub;

  if (icon === "error") {
    animations("Flash");
    errorIcon.style.display = "block";
    mouseIcon.style.display = "none";
    touchIcon.style.display = "none";
  } else if (icon === "touch") {
    errorIcon.style.display = "none";
    mouseIcon.style.display = "none";
    touchIcon.style.display = "block";
  } else {
    errorIcon.style.display = "none";
    mouseIcon.style.display = "block";
    touchIcon.style.display = "none";
  }
}

function MessageBox(text) {
  MessageText.innerText = text;
}

function sounds(tune) {
  // Sounds Link
  let Notify_sound = new Audio("sounds/jutsu.mp3");
  let sharingan_sound = new Audio("sounds/sharingan.mp3");
  let shadow_jutsu_sound = new Audio("sounds/shadow_clone.mp3");
  let popUp_sound = new Audio("sounds/popUp.mp3");

  let NarutoTheme = document.getElementById("theme");

  if (tune === "notify") {
    Notify_sound.play();
  }
  if (tune === "sharingan") {
    sharingan_sound.play();
  }
  if (tune === "summon") {
    shadow_jutsu_sound.play();
  }
  if (tune === "popUp") {
    popUp_sound.play();
  }
  if (tune === "theme") {
    NarutoTheme.paused ? NarutoTheme.play() : NarutoTheme.pause();
  }
  if (tune === "themeStop") {
    NarutoTheme.pause();
  }
  // (NarutoTheme.currentTime = 0);
}

function amaterasuFlames() {
  // use external library to parse and draw gif animation
  function onDrawFrame(ctx, frame) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(frame.buffer, frame.x, frame.y);
    layer.draw();
  }

  gifler(
    "https://media0.giphy.com/media/lqGIGe6XTfwumBdSp1/giphy.gif?cid=790b7611739b1657b1df0d415b8706cb6f12400b432cb427&rid=giphy.gif&ct=s"
  ).frames(canvas, onDrawFrame, true);
  // draw resulted canvas into the stage as Konva.Image
  let image = new Konva.Image({
    image: canvas,
  });
  layer.add(image);
}
