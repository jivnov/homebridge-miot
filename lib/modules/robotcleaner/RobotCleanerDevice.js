const BaseDevice = require('../../base/BaseDevice.js');
const RobotCleanerProperties = require('./RobotCleanerProperties.js');
const RobotCleanerActions = require('./RobotCleanerActions.js');
const Constants = require('../../constants/Constants.js');
const DevTypes = require('../../constants/DevTypes.js');


class RobotCleanerDevice extends BaseDevice {
  constructor(miioDevice, model, deviceId, name, logger) {
    super(miioDevice, model, deviceId, name, logger);
  }


  /*----------========== INIT ==========----------*/

  initialPropertyFetchDone() {
    super.initialPropertyFetchDone();
    // log the the main brush left time when supported
    if (this.supportsMainBrushLeftTimeReporting()) {
      this.logger.info(`Main brush left time: ${this.getMainBrushLeftTime()} hours.`);
    }
    // log the the main brush life level when supported
    if (this.supportsMainBrushLifeLevelReporting()) {
      this.logger.info(`Main brush life level: ${this.getMainBrushLifeLevel()}%.`);
    }
    // log the the side brush left time when supported
    if (this.supportsSideBrushLeftTimeReporting()) {
      this.logger.info(`Side brush left time: ${this.getSideBrushLeftTime()} hours.`);
    }
    // log the the side brush life level when supported
    if (this.supportsSideBrushLifeLevelReporting()) {
      this.logger.info(`Side brush life level: ${this.getSideBrushLifeLevel()}%.`);
    }
    // log the the filter life level when supported
    if (this.supportsFilterLifeLevelReporting()) {
      this.logger.info(`Filter life level: ${this.getFilterLifeLevel()}%.`);
    }
    // log the the filter used time when supported
    if (this.supportsFilterUsedTimeReporting()) {
      this.logger.info(`Filter used time: ${this.getFilterUsedTime()} hours.`);
    }
    // log the the total clean time when supported
    if (this.supportsTotalCleanTimeReporting()) {
      this.logger.info(`Total clean time: ${this.getTotalCleanTime()} hours.`);
    }
    // log the the total clean times when supported
    if (this.supportsTotalCleanTimesReporting()) {
      this.logger.info(`Total cleaned: ${this.getTotalCleanTimes()} times.`);
    }
    // log the the total clean area when supported
    if (this.supportsTotalCleanAreaReporting()) {
      this.logger.info(`Total clean area: ${this.getTotalCleanArea()} m2.`);
    }
  }


  /*----------========== INFO ==========----------*/

  getType() {
    return DevTypes.ROBOT_CLEANER;
  }


  /*----------========== CONFIG ==========----------*/

  statusSweepingValue() {
    return -1;
  }

  statusIdleValue() {
    return -1;
  }

  statusPausedValue() {
    return -1;
  }

  statusErrorValue() {
    return -1;
  }

  statusGoChargingValue() {
    return -1;
  }

  statusChargingValue() {
    return -1;
  }


  /*----------========== FEATURES ==========----------*/

  // mop modes
  mopModes() {
    return this.getPropertyValueList(RobotCleanerProperties.MOP_MODE);
  }

  supportsMopModes() {
    return this.mopModes().length > 0;
  }

  // do not disturb
  supportsDoNotDisturb() {
    return this.hasProperty(RobotCleanerProperties.DO_NOT_DISTURB);
  }

  // main brush
  supportsMainBrushLeftTimeReporting() {
    return this.hasProperty(RobotCleanerProperties.BRUSH_LEFT_TIME);
  }

  supportsMainBrushLifeLevelReporting() {
    return this.hasProperty(RobotCleanerProperties.BRUSH_LIFE_LEVEL);
  }

  // side brush
  supportsSideBrushLeftTimeReporting() {
    return this.hasProperty(RobotCleanerProperties.SIDE_BRUSH_LEFT_TIME);
  }

  supportsSideBrushLifeLevelReporting() {
    return this.hasProperty(RobotCleanerProperties.SIDE_BRUSH_LIFE_LEVEL);
  }

  // filter
  supportsFilterLifeLevelReporting() {
    return this.hasProperty(RobotCleanerProperties.FILTER_LIFE_LEVEL);
  }

  supportsFilterUsedTimeReporting() {
    return this.hasProperty(RobotCleanerProperties.FILTER_USED_TIME);
  }

  // totals
  supportsTotalCleanTimeReporting() {
    return this.hasProperty(RobotCleanerProperties.TOTAL_CLEAN_TIME);
  }

  supportsTotalCleanTimesReporting() {
    return this.hasProperty(RobotCleanerProperties.TOTAL_CLEAN_TIMES);
  }

  supportsTotalCleanAreaReporting() {
    return this.hasProperty(RobotCleanerProperties.TOTAL_CLEAN_AREA);
  }

  //actions
  supportsStartSweepAction() {
    return this.hasAction(RobotCleanerActions.START_SWEEP);
  }

  supportsStopSweepAction() {
    return this.hasAction(RobotCleanerActions.STOP_SWEEP);
  }

  supportsStartMopAction() {
    return this.hasAction(RobotCleanerActions.START_MOP);
  }

  supportsStartSweepMopAction() {
    return this.hasAction(RobotCleanerActions.START_SWEEP_MOP);
  }

  supportsStartRoomSweepAction() {
    return this.hasAction(RobotCleanerActions.START_ROOM_SWEEP);
  }

  supportsStartCleanAction() {
    return this.hasAction(RobotCleanerActions.START_CLEAN);
  }

  supportsStopCleanAction() {
    return this.hasAction(RobotCleanerActions.STOP_CLEAN);
  }

  supportsStartChargeAction() {
    return this.hasAction(RobotCleanerActions.START_CHARGE);
  }

  supportsPlaySoundAction() {
    return this.hasAction(RobotCleanerActions.PLAY_SOUND);
  }

  supportsLocateRobotAction() {
    return this.hasAction(RobotCleanerActions.LOCATE_ROBOT);
  }


  /*----------========== GETTERS ==========----------*/

  isPowerOn() {
    return this.isConnected();
  }

  getMopMode() {
    return this.getPropertyValue(RobotCleanerProperties.MOP_MODE);
  }

  isDoNotDisturbEnabled() {
    return this.getPropertyValue(RobotCleanerProperties.DO_NOT_DISTURB);
  }

  getMainBrushLeftTime() {
    return this.getPropertyValue(RobotCleanerProperties.BRUSH_LEFT_TIME);
  }

  getMainBrushLifeLevel() {
    return this.getPropertyValue(RobotCleanerProperties.BRUSH_LIFE_LEVEL);
  }

  getSideBrushLeftTime() {
    return this.getPropertyValue(RobotCleanerProperties.SIDE_BRUSH_LEFT_TIME);
  }

  getSideBrushLifeLevel() {
    return this.getPropertyValue(RobotCleanerProperties.SIDE_BRUSH_LIFE_LEVEL);
  }

  getFilterLifeLevel() {
    return this.getPropertyValue(RobotCleanerProperties.FILTER_LIFE_LEVEL);
  }

  getFilterUsedTime() {
    return this.getPropertyValue(RobotCleanerProperties.FILTER_USED_TIME);
  }

  getTotalCleanTime() {
    return this.getPropertyValue(RobotCleanerProperties.TOTAL_CLEAN_TIME);
  }

  getTotalCleanTimes() {
    return this.getPropertyValue(RobotCleanerProperties.TOTAL_CLEAN_TIMES);
  }

  getTotalCleanArea() {
    return this.getPropertyValue(RobotCleanerProperties.TOTAL_CLEAN_AREA);
  }

  getStatus() {
    return this.getPropertyValue(RobotCleanerProperties.STATUS);
  }


  /*----------========== SETTERS ==========----------*/

  async setPowerOn(power) {
    // do nothing
  }

  async setMopMode(mopMode) {
    return this.setPropertyValue(RobotCleanerProperties.MOP_MODE, mopMode);
  }

  async setDoNotDisturbEnabled(enabled) {
    this.setPropertyValue(RobotCleanerProperties.DO_NOT_DISTURB, enabled);
  }


  /*----------========== ACTIONS ==========----------*/

  async fireStartSweep() {
    this.fireAction(RobotCleanerActions.START_SWEEP);
  }

  async fireStopSweep() {
    this.fireAction(RobotCleanerActions.STOP_SWEEP);
  }

  async fireStartMop() {
    this.fireAction(RobotCleanerActions.START_MOP);
  }

  async fireStartSweepMop() {
    this.fireAction(RobotCleanerActions.START_SWEEP_MOP);
  }

  async fireStartRoomSweep() {
    this.fireAction(RobotCleanerActions.START_ROOM_SWEEP, []);
  }

  async fireStartClean() {
    this.fireAction(RobotCleanerActions.START_CLEAN, []);
  }

  async fireStopClean() {
    this.fireAction(RobotCleanerActions.STOP_CLEAN);
  }

  async fireStartCharge() {
    this.fireAction(RobotCleanerActions.START_CHARGE);
  }

  async firePlaySound() {
    this.fireAction(RobotCleanerActions.PLAY_SOUND);
  }

  async fireLocateRobot() {
    this.fireAction(RobotCleanerActions.LOCATE_ROBOT);
  }


  /*----------========== CONVENIENCE ==========----------*/

  isStatusSweeping() {
    return this.getStatus() === this.statusSweepingValue();
  }

  isStatusIdle() {
    return this.getStatus() === this.statusIdleValue();
  }

  isStatusPause() {
    return this.getStatus() === this.statusPausedValue();
  }

  isStatusError() {
    return this.getStatus() === this.statusErrorValue();
  }

  isStatusGoCharging() {
    return this.getStatus() === this.statusGoChargingValue();
  }

  isStatusCharging() {
    return this.getStatus() === this.statusChargingValue();
  }

  async setSweepActive(active) {
    if (active) {
      this.fireStartSweep();
    } else {
      //  this.fireStopSweep(); // this just pauses the robot
      this.fireStartCharge(); // this forces the robot to go back to the dock even during cleaning
    }
  }


  /*----------========== HELPERS ==========----------*/


}

module.exports = RobotCleanerDevice;