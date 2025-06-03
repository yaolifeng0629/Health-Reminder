# Health Reminder

A minimalist VS Code extension providing mandatory reminders for prolonged sitting and drinking water.

## About the Author

-   Author: [Immerse](https://yaolifeng.com)
-   Blog: [https://yaolifeng.com](https://yaolifeng.com)
-   WeChat Official Account: [沉浸式趣谈](https://yaolifeng.com/sponsor/wx_public_account.webp)
-   Github: [https://github.com/yaolifeng0629](https://github.com/yaolifeng0629)
-   Personal Introduction: An independent developer and content creator. Sharing interesting content about `programming`, `indie development`, `AI resources`, `open source`, and `personal thoughts`.

## 🌟 Core Features

### Independent Timers

-   **Sitting Timer**: Tracks working time, default reminder set to 60 minutes
-   **Hydration Timer**: Tracks intervals between water intake, default reminder set to 45 minutes
-   **Auto Reset**: Each timer automatically resets after confirmation

### Mandatory Full-Screen Reminders

-   **Full-Screen Modal**: Displays an unclosable full-screen popup when a reminder triggers
-   **UI Lock**: Must confirm the reminder to continue working
-   **Delayed Confirmation**: 3-second countdown before the confirm button becomes clickable
-   **Beautiful Interface**: Gradient backgrounds, frosted glass effect, animated transitions

## ⚙️ Configuration Options

Search for "Health Reminder" in VS Code settings or directly edit `settings.json`:

```json
{
    "healthReminder.sitReminderInterval": 60, // Sitting reminder interval (minutes)
    "healthReminder.drinkReminderInterval": 45, // Drinking reminder interval (minutes)
    "healthReminder.enableSitReminder": true, // Enable sitting reminder
    "healthReminder.enableDrinkReminder": true, // Enable drinking reminder
    "healthReminder.language": "zh-CN" // Interface language: "zh-CN" or "en"
}
```

### 🌐 Language Support

The extension supports two languages:

-   **Simplified Chinese** (`zh-CN`) - Default
-   **English** (`en`)

You can switch languages by configuring `healthReminder.language`, and all interface text (including reminder popups, buttons, status messages, etc.) will change accordingly.

## 🎮 Commands

-   `Health Reminder: Reset All Timers` - Manually reset all timers
-   `Health Reminder: Show Reminder Status` - View current timer status

## 📦 Installation

### Method 1: Install from VS Code Extension Marketplace

1. Open VS Code Extension Marketplace
2. Search for "Health Reminder"
3. Click "Install"

### Method 2: Install from Source Code

1. Clone or download the project files
2. Run `npm install` in the project directory
3. Run `npm run compile` to compile TypeScript
4. Press `F5` in VS Code to run in debug mode, or package as a `.vsix` file for installation

## 🔧 Development

```bash
# Install dependencies
npm install

# Compile
npm run compile

# Watch mode compilation
npm run watch
```

## 📝 File Structure

```
health-reminder/
├── package.json          # Extension configuration
├── tsconfig.json         # TypeScript configuration
├── src/
│   └── extension.ts      # Main logic
├── out/                  # Compilation output
└── README.md            # Documentation
```

## 🎯 Features

-   **Minimalist Design**: Focus on core functionality without complex features
-   **Mandatory Reminders**: Ensure users truly notice health reminders
-   **Beautiful Interface**: Modern UI design providing excellent user experience
-   **Independent Timing**: Sitting and drinking reminders work independently
-   **Configurable**: Supports custom intervals and control switches

## 💡 Usage Suggestions

-   Recommended sitting reminder interval: 45-60 minutes
-   Recommended drinking reminder interval: 30-45 minutes
-   Keep the extension enabled while working to develop healthy habits

## 💰 Support the Developer

If you find this extension helpful, feel free to support me. Your support is my greatest motivation.

<img src="https://yaolifeng.com/sponsor/weixin.png" alt="WeChat Payment" width="200" height="200">
<img src="https://yaolifeng.com/sponsor/ali.png" alt="Alipay Payment" width="200" height="200">

## 🤝 Support

If you have any issues or suggestions, feel free to raise an Issue or contribute code.

---

Stay healthy first, then work efficiently! 💪
