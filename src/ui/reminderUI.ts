import * as vscode from 'vscode';
import { getConfig, getTexts } from '../services/configService';
import { resetSitTimer, resetDrinkTimer } from '../services/timerService';

export async function showSitReminder(): Promise<void> {
    const texts = getTexts();
    await showReminderModal(texts.sitReminderTitle, texts.sitReminderMessage, texts.sitReminderButton, () => {
        resetSitTimer();
    });
}

export async function showDrinkReminder(): Promise<void> {
    const texts = getTexts();
    await showReminderModal(texts.drinkReminderTitle, texts.drinkReminderMessage, texts.drinkReminderButton, () => {
        resetDrinkTimer();
    });
}

async function showReminderModal(title: string, message: string, buttonText: string, onConfirm: () => void): Promise<void> {
    // 创建webview面板作为全屏模态窗口
    const panel = vscode.window.createWebviewPanel('healthReminder', '健康提醒', vscode.ViewColumn.One, {
        enableScripts: true,
        retainContextWhenHidden: true,
    });

    // 生成HTML内容
    const html = generateReminderHTML(title, message, buttonText);
    panel.webview.html = html;

    // 确保面板获得焦点
    panel.reveal(vscode.ViewColumn.One, false);

    // 处理webview消息
    const messageHandler = panel.webview.onDidReceiveMessage(message => {
        switch (message.command) {
            case 'confirm':
                panel.dispose();
                onConfirm();
                const texts = getTexts();
                vscode.window.showInformationMessage(texts.confirmMessage);
                return;
        }
    });

    // 防止面板被意外关闭
    panel.onDidDispose(() => {
        messageHandler.dispose();
    });

    // 阻止其他操作的焦点变化（尽可能）
    const interval = setInterval(() => {
        if (panel.visible) {
            panel.reveal(vscode.ViewColumn.One, false);
        } else {
            clearInterval(interval);
        }
    }, 1000);

    // 5秒后清除间隔
    setTimeout(() => {
        clearInterval(interval);
    }, 5000);
}

function generateReminderHTML(title: string, message: string, buttonText: string): string {
    const texts = getTexts();
    const isEnglish = getConfig().language === 'en';

    return `
<!DOCTYPE html>
<html lang="${isEnglish ? 'en' : 'zh-CN'}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${isEnglish ? 'Health Reminder' : '健康提醒'}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: ${
                isEnglish
                    ? '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif'
                    : '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'
            };
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 999999;
        }

        .reminder-container {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 60px 80px;
            text-align: center;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
            max-width: 600px;
            width: 90%;
            animation: slideIn 0.5s ease-out;
            border: 1px solid rgba(255, 255, 255, 0.3);
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: scale(0.9) translateY(-20px);
            }
            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }

        .title {
            font-size: 2.5em;
            color: #333;
            margin-bottom: 20px;
            font-weight: 600;
        }

        .message {
            font-size: 1.2em;
            color: #666;
            line-height: 1.6;
            margin-bottom: 40px;
        }

        .confirm-btn {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            padding: 15px 40px;
            font-size: 1.1em;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
            opacity: 0.5;
            pointer-events: none;
        }

        .confirm-btn.enabled {
            opacity: 1;
            pointer-events: auto;
        }

        .confirm-btn.enabled:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 25px rgba(102, 126, 234, 0.4);
        }

        .countdown {
            font-size: 0.9em;
            color: #999;
            margin-top: 15px;
        }

        .pulse {
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    </style>
</head>
<body>
    <div class="reminder-container pulse">
        <div class="title">${title}</div>
        <div class="message">${message}</div>
        <button id="confirmBtn" class="confirm-btn">${buttonText}</button>
        <div id="countdown" class="countdown">${texts.waitSeconds} <span id="seconds">3</span> ${
        isEnglish ? 'seconds...' : '秒...'
    }</div>
    </div>

    <script>
        const vscode = acquireVsCodeApi();
        const confirmBtn = document.getElementById('confirmBtn');
        const countdownEl = document.getElementById('countdown');
        const secondsEl = document.getElementById('seconds');

        let countdown = 3;

        const timer = setInterval(() => {
            countdown--;
            secondsEl.textContent = countdown;

            if (countdown <= 0) {
                clearInterval(timer);
                confirmBtn.classList.add('enabled');
                countdownEl.style.display = 'none';
            }
        }, 1000);

        confirmBtn.addEventListener('click', () => {
            if (confirmBtn.classList.contains('enabled')) {
                vscode.postMessage({
                    command: 'confirm'
                });
            }
        });

        // 防止页面被意外关闭
        window.addEventListener('beforeunload', (e) => {
            e.preventDefault();
            e.returnValue = '';
        });

        // 获得焦点
        window.focus();
        document.body.focus();
    </script>
</body>
</html>`;
}
