import { TimerState } from '../models/types';
import { getConfig } from './configService';
import { showSitReminder, showDrinkReminder } from '../ui/reminderUI';

export let timerState: TimerState = {
    sitTimer: null,
    drinkTimer: null,
    sitStartTime: Date.now(),
    drinkStartTime: Date.now(),
};

export function startTimers(): void {
    const config = getConfig();

    // 启动久坐计时器
    if (config.enableSit) {
        timerState.sitTimer = setTimeout(() => {
            showSitReminder();
        }, config.sitInterval * 60 * 1000);
        timerState.sitStartTime = Date.now();
    }

    // 启动喝水计时器
    if (config.enableDrink) {
        timerState.drinkTimer = setTimeout(() => {
            showDrinkReminder();
        }, config.drinkInterval * 60 * 1000);
        timerState.drinkStartTime = Date.now();
    }
}

export function restartTimers(): void {
    clearAllTimers();
    startTimers();
}

export function clearAllTimers(): void {
    if (timerState.sitTimer) {
        clearTimeout(timerState.sitTimer);
        timerState.sitTimer = null;
    }
    if (timerState.drinkTimer) {
        clearTimeout(timerState.drinkTimer);
        timerState.drinkTimer = null;
    }
}

export function resetAllTimers(): void {
    clearAllTimers();
    startTimers();
}

export function resetSitTimer(): void {
    const config = getConfig();
    if (timerState.sitTimer) {
        clearTimeout(timerState.sitTimer);
    }

    if (config.enableSit) {
        timerState.sitTimer = setTimeout(() => {
            showSitReminder();
        }, config.sitInterval * 60 * 1000);
        timerState.sitStartTime = Date.now();
    }
}

export function resetDrinkTimer(): void {
    const config = getConfig();
    if (timerState.drinkTimer) {
        clearTimeout(timerState.drinkTimer);
    }

    if (config.enableDrink) {
        timerState.drinkTimer = setTimeout(() => {
            showDrinkReminder();
        }, config.drinkInterval * 60 * 1000);
        timerState.drinkStartTime = Date.now();
    }
}
