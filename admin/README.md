# Admin Project

This project is an admin panel built with React and Vite. It includes a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Available Scripts

In the project directory, you can run:

### `npm run admin`

Runs the app in the development mode using Vite.\
Open [http://localhost:5173] to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run lint`

Runs ESLint to analyze the code for potential errors and code style issues.

### `npm run preview`

Previews the production build locally using Vite.

### File Structure

```bash
admin/
├── node_modules/              
├── public/                    
├── src/                       
│   ├── assets/                
│   ├── components/            
│   │   ├── Alert.jsx          # Alert component for notifications
│   │   ├── Header.jsx         # Header component for the application
│   │   ├── Sidebar.jsx        # Sidebar navigation component
│   │   └── TopCards.jsx       # Component for displaying top-level metrics
│   ├── layout/                # Layout components
│   │   └── FullLayout.jsx     # Main layout wrapper component
│   └── pages/                 
│       ├── auth/              # Authentication-related pages
│       ├── Dashboard.jsx      # Main dashboard page
│       ├── NotFound.jsx       # 404 Not Found page
│       └── Profile.jsx        # User profile page
├── App.jsx                    # Root React component
├── data.json                  # Mock data or configuration
├── Login.jsx                  
├── main.jsx                   
├── Routes.jsx                 # React Router configuration
├── styles.css                 # Global CSS styles
├── .eslintrc.config.js        # ESLint configuration for code linting
├── index.html                 # HTML template for the application
├── package-lock.json          
├── package.json               # Project metadata and dependencies
└── README.md                  # Project documentation
```

## Learn More

You can learn more in the [Vite documentation](https://vitejs.dev/guide/).

To learn React, check out the [React documentation](https://reactjs.org/).

## Plugins

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
