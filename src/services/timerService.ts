import { TimerState } from '../models/types';
import { getConfig } from './configService';

/**
 * 提醒函数类型定义
 */
type ReminderFunction = () => void;

// 提醒函数引用，避免循环依赖
let sitReminderFunction: ReminderFunction = () => {};
let drinkReminderFunction: ReminderFunction = () => {};

/**
 * 设置久坐提醒函数
 * @param fn 提醒函数
 */
export function setSitReminderFunction(fn: ReminderFunction): void {
    sitReminderFunction = fn;
}

/**
 * 设置喝水提醒函数
 * @param fn 提醒函数
 */
export function setDrinkReminderFunction(fn: ReminderFunction): void {
    drinkReminderFunction = fn;
}

/**
 * 计时器状态
 */
export let timerState: TimerState = {
    sitTimer: null,
    drinkTimer: null,
    sitStartTime: Date.now(),
    drinkStartTime: Date.now(),
};

/**
 * 启动所有计时器
 */
export function startTimers(): void {
    const config = getConfig();
    startSitTimer(config.sitInterval, config.enableSit);
    startDrinkTimer(config.drinkInterval, config.enableDrink);
}

/**
 * 启动久坐提醒计时器
 * @param interval 时间间隔（分钟）
 * @param enabled 是否启用
 */
function startSitTimer(interval: number, enabled: boolean): void {
    if (!enabled) return;

    timerState.sitTimer = setTimeout(() => {
        sitReminderFunction();
    }, interval * 60 * 1000);
    timerState.sitStartTime = Date.now();
}

/**
 * 启动喝水提醒计时器
 * @param interval 时间间隔（分钟）
 * @param enabled 是否启用
 */
function startDrinkTimer(interval: number, enabled: boolean): void {
    if (!enabled) return;

    timerState.drinkTimer = setTimeout(() => {
        drinkReminderFunction();
    }, interval * 60 * 1000);
    timerState.drinkStartTime = Date.now();
}

/**
 * 重启所有计时器
 */
export function restartTimers(): void {
    clearAllTimers();
    startTimers();
}

/**
 * 清除所有计时器
 */
export function clearAllTimers(): void {
    clearSitTimer();
    clearDrinkTimer();
}

/**
 * 清除久坐计时器
 */
function clearSitTimer(): void {
    if (timerState.sitTimer) {
        clearTimeout(timerState.sitTimer);
        timerState.sitTimer = null;
    }
}

/**
 * 清除喝水计时器
 */
function clearDrinkTimer(): void {
    if (timerState.drinkTimer) {
        clearTimeout(timerState.drinkTimer);
        timerState.drinkTimer = null;
    }
}

/**
 * 重置所有计时器
 */
export function resetAllTimers(): void {
    clearAllTimers();
    startTimers();
}

/**
 * 重置久坐计时器
 */
export function resetSitTimer(): void {
    const config = getConfig();

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
export function resetDrinkTimer(): void {
    const config = getConfig();

    // 清除现有计时器
    clearDrinkTimer();

    // 重新启动计时器（使用最新配置）
    if (config.enableDrink) {
        startDrinkTimer(config.drinkInterval, true);
    }
}
