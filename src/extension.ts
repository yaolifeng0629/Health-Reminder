import * as vscode from 'vscode';
import { getTexts } from './services/configService';
import { startTimers, resetAllTimers, clearAllTimers } from './services/timerService';
import { showCurrentStatus } from './services/statusService';
// Import the reminderUI to ensure the reminder functions are registered
import './ui/reminderUI';

export function activate(context: vscode.ExtensionContext) {
    console.log('健康提醒插件已激活');

    // 注册命令
    const resetCommand = vscode.commands.registerCommand('healthReminder.resetTimers', () => {
        resetAllTimers();
        const texts = getTexts();
        vscode.window.showInformationMessage(texts.resetMessage);
    });

    const statusCommand = vscode.commands.registerCommand('healthReminder.showStatus', () => {
        showCurrentStatus();
    });

    context.subscriptions.push(resetCommand, statusCommand);

    // 启动计时器
    startTimers();

    // 监听配置变化
    vscode.workspace.onDidChangeConfiguration(e => {
        if (e.affectsConfiguration('healthReminder')) {
            resetAllTimers();
        }
    });
}

export function deactivate() {
    clearAllTimers();
}
