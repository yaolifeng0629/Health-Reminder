"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timerState = void 0;
exports.setSitReminderFunction = setSitReminderFunction;
exports.setDrinkReminderFunction = setDrinkReminderFunction;
exports.startTimers = startTimers;
exports.restartTimers = restartTimers;
exports.clearAllTimers = clearAllTimers;
exports.resetAllTimers = resetAllTimers;
exports.resetSitTimer = resetSitTimer;
exports.resetDrinkTimer = resetDrinkTimer;
const configService_1 = require("./configService");
// 提醒函数引用，避免循环依赖
let sitReminderFunction = () => { };
let drinkReminderFunction = () => { };
/**
 * 设置久坐提醒函数
 * @param fn 提醒函数
 */
function setSitReminderFunction(fn) {
    sitReminderFunction = fn;
}
/**
 * 设置喝水提醒函数
 * @param fn 提醒函数
 */
function setDrinkReminderFunction(fn) {
    drinkReminderFunction = fn;
}
/**
 * 计时器状态
 */
exports.timerState = {
    sitTimer: null,
    drinkTimer: null,
    sitStartTime: Date.now(),
    drinkStartTime: Date.now(),
};
/**
 * 启动所有计时器
 */
function startTimers() {
    const config = (0, configService_1.getConfig)();
    startSitTimer(config.sitInterval, config.enableSit);
    startDrinkTimer(config.drinkInterval, config.enableDrink);
}
/**
 * 启动久坐提醒计时器
 * @param interval 时间间隔（分钟）
 * @param enabled 是否启用
 */
function startSitTimer(interval, enabled) {
    if (!enabled)
        return;
    exports.timerState.sitTimer = setTimeout(() => {
        sitReminderFunction();
    }, interval * 60 * 1000);
    exports.timerState.sitStartTime = Date.now();
}
/**
 * 启动喝水提醒计时器
 * @param interval 时间间隔（分钟）
 * @param enabled 是否启用
 */
function startDrinkTimer(interval, enabled) {
    if (!enabled)
        return;
    exports.timerState.drinkTimer = setTimeout(() => {
        drinkReminderFunction();
    }, interval * 60 * 1000);
    exports.timerState.drinkStartTime = Date.now();
}
/**
 * 重启所有计时器
 */
function restartTimers() {
    clearAllTimers();
    startTimers();
}
/**
 * 清除所有计时器
 */
function clearAllTimers() {
    clearSitTimer();
    clearDrinkTimer();
}
/**
 * 清除久坐计时器
 */
function clearSitTimer() {
    if (exports.timerState.sitTimer) {
        clearTimeout(exports.timerState.sitTimer);
        exports.timerState.sitTimer = null;
    }
}
/**
 * 清除喝水计时器
 */
function clearDrinkTimer() {
    if (exports.timerState.drinkTimer) {
        clearTimeout(exports.timerState.drinkTimer);
        exports.timerState.drinkTimer = null;
    }
}
/**
 * 重置所有计时器
 */
function resetAllTimers() {
    clearAllTimers();
    startTimers();
}
/**
 * 重置久坐计时器
 */
function resetSitTimer() {
    const config = (0, configService_1.getConfig)();
    // 清除现有计时器
    clearSitTimer();
    // 重新启动计时器（使用最新配置）
    if (config.enableSit) {
        startSitTimer(config.sitInterval, true);
    }
}
/**
 * 重置喝水计时器
 */
function resetDrinkTimer() {
    const config = (0, configService_1.getConfig)();
    // 清除现有计时器
    clearDrinkTimer();
    // 重新启动计时器（使用最新配置）
    if (config.enableDrink) {
        startDrinkTimer(config.drinkInterval, true);
    }
}
//# sourceMappingURL=timerService.js.map