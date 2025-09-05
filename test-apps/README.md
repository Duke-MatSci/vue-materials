# Vue Materials Test App

This is a test application for the Vue Materials component library, demonstrating the MdApp component with nested MdList functionality.

## Features Demonstrated

- ✅ **MdApp** with reveal mode
- ✅ **MdAppToolbar** with navigation and theme toggle
- ✅ **MdAppDrawer** with nested lists
- ✅ **MdList** with expandable items
- ✅ **MdListItem** with icons and text
- ✅ **MdBadge** for notifications
- ✅ **MdDivider** for visual separation
- ✅ **Theme switching** between light and dark modes

## Getting Started

### Prerequisites

- Node.js 16+ (compatible with the current setup)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## Usage

The test app demonstrates:

1. **Navigation Drawer**: Click the menu button to open/close the navigation drawer
2. **Nested Lists**: Expandable sections with multiple levels of nesting
3. **Interactive Elements**: Click on list items to navigate (check console for logs)
4. **Theme Toggle**: Click the theme button to switch between light and dark modes
5. **Expand/Collapse**: Use the buttons to expand or collapse all sections

## Project Structure

```
test-apps/
├── src/
│   ├── App.vue          # Main application component
│   └── main.js          # Application entry point
├── dist/                # Vue Materials library (from parent)
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md           # This file
```

## Components Used

- `md-app` - Main application container
- `md-app-toolbar` - Top navigation bar
- `md-app-drawer` - Side navigation drawer
- `md-app-content` - Main content area
- `md-list` - List container
- `md-list-item` - Individual list items
- `md-list-item-expand` - Expandable list items
- `md-icon` - Material Design icons
- `md-button` - Action buttons
- `md-badge` - Notification badges
- `md-divider` - Visual separators

## Development

To modify the test app:

1. Edit `src/App.vue` to change the layout or add new features
2. The app will automatically reload when you save changes
3. Check the browser console for navigation logs

## Troubleshooting

If you encounter issues:

1. Make sure the Vue Materials library is built (`npm run build` in parent directory)
2. Check that all dependencies are installed
3. Verify the server is running on port 3000
4. Check browser console for any JavaScript errors

## Building for Production

To build the test app for production:

```bash
npm run build
```

This will create a `dist` folder with the optimized production build.
