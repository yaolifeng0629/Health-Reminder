"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const configService_1 = require("./services/configService");
const timerService_1 = require("./services/timerService");
const statusService_1 = require("./services/statusService");
// Import the reminderUI to ensure the reminder functions are registered
require("./ui/reminderUI");
function activate(context) {
    console.log('健康提醒插件已激活');
    // 注册命令
    const resetCommand = vscode.commands.registerCommand('healthReminder.resetTimers', () => {
        (0, timerService_1.resetAllTimers)();
        const texts = (0, configService_1.getTexts)();
        vscode.window.showInformationMessage(texts.resetMessage);
    });
    const statusCommand = vscode.commands.registerCommand('healthReminder.showStatus', () => {
        (0, statusService_1.showCurrentStatus)();
    });
    context.subscriptions.push(resetCommand, statusCommand);
    // 启动计时器
    (0, timerService_1.startTimers)();
    // 监听配置变化
    vscode.workspace.onDidChangeConfiguration(e => {
        if (e.affectsConfiguration('healthReminder')) {
            (0, timerService_1.resetAllTimers)();
        }
    });
}
function deactivate() {
    (0, timerService_1.clearAllTimers)();
}
//# sourceMappingURL=extension.js.map