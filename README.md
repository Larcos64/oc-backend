# Psychological Studies Surveys (Backend)

First install the database server before compiling the project dependencies.

## 🧰 Prerequisites

This project requires **Node.js v18.18.0 or higher**.

> ⚠️ The backend uses modern Node features such as `AsyncLocalStorage` and dependencies (`pg@8+`, `pkg-logger`) that are **not compatible with older Node versions (v14 or below)**.

**Recommended environment:**
- **Node.js:** ≥ 18.18.0 LTS  
- **npm:** ≥ 9.x  
- **(Optional)** [nvm](https://github.com/nvm-sh/nvm) to manage Node versions

To ensure the correct Node version:

```bash
nvm install 18.18.0
nvm use 18.18.0
```

## Database configuration

In the `src/config/global.ts` file the host (for local tests), bucket name, user and password must be placed.

___

# Compiling dependencies
To install the Node packages run the following command in the root folder of the project:

```bash
npm install
```

Note: sometimes when the project dependencies do not compile it is recommended to remove the `/node_modules` folder from the project root folder and the package-lock.json file and remove the cache when installing dependencies with `npm install r -c`_.

___

# Build and run API
To build the project and start running the backend, run the following command:

```bash
npm run buildandrun
```