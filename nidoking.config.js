window.addEventListener('DOMContentLoaded', () => {
  // Everything below here is what you already have inside nidoking.config.js

  const canvas = document.querySelector("#unity-canvas");

  function unityShowBanner(msg, type) {
    const warningBanner = document.querySelector("#unity-warning");
    function updateBannerVisibility() {
      warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
    }
    const div = document.createElement('div');
    div.innerHTML = msg;
    warningBanner.appendChild(div);
    if (type === 'error') div.style = 'background: red; padding: 10px;';
    else {
      if (type === 'warning') div.style = 'background: yellow; padding: 10px;';
      setTimeout(() => {
        warningBanner.removeChild(div);
        updateBannerVisibility();
      }, 5000);
    }
    updateBannerVisibility();
  }

  const buildUrl = "Build";
  const loaderUrl = buildUrl + "/WGL Shooter 0.1b.loader.js";
  const config = {
    dataUrl: buildUrl + "/WGL Shooter 0.1b.data",
    frameworkUrl: buildUrl + "/WGL Shooter 0.1b.framework.js",
    codeUrl: buildUrl + "/WGL Shooter 0.1b.wasm",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "DefaultCompany",
    productName: "WGL Shooter",
    productVersion: "5.0.1",
    showBanner: unityShowBanner,
  };

  if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
    document.getElementsByTagName('head')[0].appendChild(meta);
  }

  document.querySelector("#unity-loading-bar").style.display = "block";

  const script = document.createElement("script");
  script.src = loaderUrl;
  script.onload = () => {
    createUnityInstance(canvas, config, (progress) => {
      document.querySelector("#unity-progress-bar-full").style.width = 100 * progress + "%";
    }).then((unityInstance) => {
      document.querySelector("#unity-loading-bar").style.display = "none";
      document.querySelector("#unity-fullscreen-button").onclick = () => {
        unityInstance.SetFullscreen(1);
      };
    }).catch((message) => {
      alert(message);
    });
  };
  document.body.appendChild(script);

  // Frame switcher
  const frameSelector = document.getElementById('frameStyle');
  const frameOverlay = document.getElementById('frameOverlay');

  const frames = {
    switch: 'Overlays/switch_overlay.png',
    switch2: 'Overlays/switch2_overlay.png',
    rog: 'Overlays/rog_ally_overlay.png',
    beammworks: 'Overlays/beammworks_overlay.png'
  };

  const savedStyle = localStorage.getItem('frameStyle') || 'switch';
  frameSelector.value = savedStyle;
  frameOverlay.src = frames[savedStyle];

  frameSelector.addEventListener('change', () => {
    const selected = frameSelector.value;
    frameOverlay.src = frames[selected];
    localStorage.setItem('frameStyle', selected);
  });
});
