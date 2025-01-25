# Space Nexus Defense Communications Console

A futuristic, sci-fi themed communications console built with Vue.js. This interactive web application simulates a starship's communication system with real-time message updates and status indicators.

## 🚀 Features

- **Real-time Message Updates**: Automatic generation of various message types (ALERT, WARNING, STATUS)
- **Interactive Console**: Click buttons to generate different types of messages
- **Visual Feedback**: Status indicators and message styling based on priority
- **Sci-fi Theme**: Retro-futuristic design with green-on-black terminal aesthetics
- **Responsive Design**: Works on both desktop and mobile devices

## 🛠️ Technology Stack

- **Frontend Framework**: Vue.js 3
- **Build Tool**: Vite
- **Router**: Vue Router
- **State Management**: Pinia
- **AI Integration**: TensorFlow.js and Face-api.js (for future features)
- **Styling**: Custom CSS with sci-fi theme

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/innerpixel/space-nexus-defense-comm.git
cd space-nexus-defense-comm
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## 🚀 Deployment

The application is deployed using GitHub Pages. To deploy:

1. Run the deploy script:
```bash
./deploy.sh
```

2. Visit the deployed site at:
[https://innerpixel.github.io/space-nexus-defense-comm/](https://innerpixel.github.io/space-nexus-defense-comm/)

## 🎮 Usage

### Communication Console

The main communication console features:

1. **Status Indicator**: Shows active connection status
2. **Message Types**:
   - `ALERT`: High-priority messages (red)
   - `WARNING`: Medium-priority messages (orange)
   - `STATUS`: Regular status updates (green)
3. **Interactive Controls**:
   - Click buttons to generate different message types
   - Messages include timestamps
   - Auto-scrolling message container

### Navigation

- `/`: Home page with main console
- `/communications`: Dedicated communications view
- `/about`: Information about the project

## 🔧 Configuration

The application can be configured through:

- `vite.config.js`: Build and deployment settings
- `src/router/index.js`: Route configurations
- `src/components/CommunicationConsole.vue`: Main console settings

## 🎨 Customization

You can customize the console by:

1. Modifying message types in `CommunicationConsole.vue`
2. Adjusting the color scheme in the component's style section
3. Adding new message categories or controls
4. Customizing the update frequency

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

MIT License - feel free to use this project for learning or as a base for your own sci-fi themed applications.

## 🔮 Future Features

- Voice command integration
- AI-powered message generation
- Video communication simulation
- Multi-channel support
- Authentication system
- Message encryption simulation

## 🐛 Troubleshooting

If you encounter issues:

1. Clear browser cache
2. Check console for errors
3. Verify all dependencies are installed
4. Ensure proper Node.js version
5. Check GitHub Pages settings if deployment fails

## 📞 Contact

For questions or suggestions, please open an issue on GitHub.
