/*
 * Debug parameters.
 */
WebVRConfig = {
  /**
   * webvr-polyfill configuration
   */

  // Forces availability of VR mode.
  FORCE_ENABLE_VR: true, // Default: false.
  // Complementary filter coefficient. 0 for accelerometer, 1 for gyro.
  //K_FILTER: 0.98, // Default: 0.98.
  // How far into the future to predict during fast motion.
  //PREDICTION_TIME_S: 0.040, // Default: 0.040 (in seconds).
  // Flag to disable touch panner. In case you have your own touch controls
  //TOUCH_PANNER_DISABLED: true, // Default: false.
  // Enable yaw panning only, disabling roll and pitch. This can be useful for
  // panoramas with nothing interesting above or below.
  //YAW_ONLY: true, // Default: false.

  /**
   * webvr-boilerplate configuration
   */
  // Forces distortion in VR mode.
  //FORCE_DISTORTION: true, // Default: false.
  // Override the distortion background color.
  // DISTORTION_BGCOLOR: {x: 1, y: 0, z: 0, w: 1}, // Default: (0,0,0,1).
  // Prevent distortion from happening.
  //PREVENT_DISTORTION: true, // Default: false.
  // Show eye centers for debugging.
  // SHOW_EYE_CENTERS: true, // Default: false.
  // Prevent the online DPDB from being fetched.
  // NO_DPDB_FETCH: true,  // Default: false.
};