"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timerState = void 0;
exports.startTimers = startTimers;
exports.restartTimers = restartTimers;
exports.clearAllTimers = clearAllTimers;
exports.resetAllTimers = resetAllTimers;
exports.resetSitTimer = resetSitTimer;
exports.resetDrinkTimer = resetDrinkTimer;
const configService_1 = require("./configService");
const reminderUI_1 = require("../ui/reminderUI");
exports.timerState = {
    sitTimer: null,
    drinkTimer: null,
    sitStartTime: Date.now(),
    drinkStartTime: Date.now(),
};
function startTimers() {
    const config = (0, configService_1.getConfig)();
    // 启动久坐计时器
    if (config.enableSit) {
        exports.timerState.sitTimer = setTimeout(() => {
            (0, reminderUI_1.showSitReminder)();
        }, config.sitInterval * 60 * 1000);
        exports.timerState.sitStartTime = Date.now();
    }
    // 启动喝水计时器
    if (config.enableDrink) {
        exports.timerState.drinkTimer = setTimeout(() => {
            (0, reminderUI_1.showDrinkReminder)();
        }, config.drinkInterval * 60 * 1000);
        exports.timerState.drinkStartTime = Date.now();
    }
}
function restartTimers() {
    clearAllTimers();
    startTimers();
}
function clearAllTimers() {
    if (exports.timerState.sitTimer) {
        clearTimeout(exports.timerState.sitTimer);
        exports.timerState.sitTimer = null;
    }
    if (exports.timerState.drinkTimer) {
        clearTimeout(exports.timerState.drinkTimer);
        exports.timerState.drinkTimer = null;
    }
}
function resetAllTimers() {
    clearAllTimers();
    startTimers();
}
function resetSitTimer() {
    const config = (0, configService_1.getConfig)();
    if (exports.timerState.sitTimer) {
        clearTimeout(exports.timerState.sitTimer);
    }
    if (config.enableSit) {
        exports.timerState.sitTimer = setTimeout(() => {
            (0, reminderUI_1.showSitReminder)();
        }, config.sitInterval * 60 * 1000);
        exports.timerState.sitStartTime = Date.now();
    }
}
function resetDrinkTimer() {
    const config = (0, configService_1.getConfig)();
    if (exports.timerState.drinkTimer) {
        clearTimeout(exports.timerState.drinkTimer);
    }
    if (config.enableDrink) {
        exports.timerState.drinkTimer = setTimeout(() => {
            (0, reminderUI_1.showDrinkReminder)();
        }, config.drinkInterval * 60 * 1000);
        exports.timerState.drinkStartTime = Date.now();
    }
}
//# sourceMappingURL=timerService.js.map