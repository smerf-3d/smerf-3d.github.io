
/**
 * Formats the integer i as a string with "min" leading zeroes.
 * @param {number} i
 * @param {number} min
 * @return {string}
 */
function digits(i, min) {
  const s = '' + i;
  if (s.length >= min) {
    return s;
  } else {
    return ('00000' + s).substr(-min);
  }
}


function start() {
  const params = new URL(window.location.href).searchParams;
  let newParamsForScene = ['useDistanceGrid=true','useBits=true'];

  // Determine url of first submodel's assets.
  const scene = params.get('scene');
  sceneToSubmodelIndex = {
    'berlin': 22,
    'nyc': 4,
    'alameda': 4,
    'london': 19
  }
  submodelIndex = 0;
  if (scene in sceneToSubmodelIndex) {
    submodelIndex = sceneToSubmodelIndex[scene];
  }
  dirUrl = 'https://storage.googleapis.com/realtime-nerf-360/smerf/' + params.get('scene') + '/sm_' + digits(submodelIndex, 3);

  // Compile new url parameters for this scene.
  newParamsForScene.push(`dir=${dirUrl}`);
  if (scene in sceneToSubmodelIndex) {
    newParamsForScene.push('vfovy=70');
    newParamsForScene.push('exposure=0.016');
    newParamsForScene.push('near=0.02');
  }

  const qualityPresets = [
    {platform: 'phone', mouseModeBig: 'map', mouseModeSmall: 'orbit'},
    {platform: 'low', mouseModeBig: 'fps', mouseModeSmall: 'orbit'},
    {platform: 'medium', mouseModeBig: 'fps', mouseModeSmall: 'orbit'},
    {platform: 'high', mouseModeBig: 'fps', mouseModeSmall: 'orbit'},
  ];
  for (let preset of qualityPresets) {
    // Finalize url parameters for this preset for this scene.
    const mouseMode = scene in sceneToSubmodelIndex ? preset.mouseModeBig : preset.mouseModeSmall;
    let newParamsForPreset = [...newParamsForScene, `quality=${preset.platform}`, `mouseMode=${mouseMode}`];
    if (preset.platform == 'phone') {
      newParamsForPreset.push('submodelCacheSize=0'); // Lower RAM usage.
    }
    const newParamsForPresetStr = newParamsForPreset.join('&');

    // Update HTML.
    const e = document.getElementById(preset.platform);
    e.setAttribute('href', `/viewer?${newParamsForPresetStr}`);
  }
}

window.onload = start;
