
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
  const scene = params.get('scene');
  sceneToSubmodelIndex = {
    '2022-06-06_duckworthd_apartment': 4,
    'mildenhall': 4,
    'nottingham': 4,
    'westcombe_20percent': 4
  }
  submodelIndex = 0;
  if (scene in sceneToSubmodelIndex) {
    submodelIndex = sceneToSubmodelIndex[scene];
  }
  dirUrl = 'https://storage.googleapis.com/realtime-nerf-360/smerf/' + params.get('scene') + '/sm_' + digits(submodelIndex, 3) + '&useDistanceGrid=true';
  console.log('scene:', scene);

  if (scene in sceneToSubmodelIndex) {
    dirUrl += '&vfovy=70&mouseMode=fps&exposure=0.016&near=0.02&mergeSlices=false'
  }

  const qualityPresets = ['phone', 'low', 'medium', 'high'];
  for (const quality of qualityPresets) {
    console.log(quality);
    const e = document.getElementById(quality);
    e.setAttribute('href', "/viewer?dir=" + dirUrl + '&quality=' + quality);
  }
}

window.onload = start;
