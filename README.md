# 🧁 Blush & Buttercup - Premium Bakery Landing Page

Welcome to the official repository of **Blush & Buttercup**, a premium boutique bakery based in Mumbai. This project is a high-end web presence designed with a Parisian aesthetic, vibrant animations, and a seamless ordering flow.

---
* Deployed website: https://blushbuttercupbakery.netlify.app/
## 🚀 One-Click Quick Start (Recommended)

I have created automated scripts to handle all installations and technical setup for you.

### **Windows Users (PowerShell)**:
1.  Open PowerShell in the project root.
2.  Run the following command:
    ```powershell
    .\run_dev.ps1
    ```

### **Mac/Linux Users (Bash)**:
1.  Open your terminal in the project root.
2.  Run the following command:
    ```bash
    sh run_dev.sh
    ```

---

## 🛠 Manual Setup Instructions

If you prefer to set up the project step-by-step:

### **1. Prerequisites**
*   **Node.js**: Version 18.0 or higher.
*   **pnpm** (Recommended) or **npm**.

### **2. Installation**
In the project root, install all required dependencies:
```bash
npx pnpm install
```

### **3. Setting up Local Environment**
Ensure you have a `.env` file in `scripts/src/frontend/` with the following content:
```env
VITE_USE_MOCK=true
VITE_PORT=5001
```

### **4. Running the Development Server**
Navigate to the frontend directory and start the bakery:
```bash
cd scripts/src/frontend
npx pnpm dev
```
👉 Access the site at **[http://localhost:5001](http://localhost:5001)**.

---

## 📁 Key Folders

*   **`scripts/src/frontend/`**: The core React/Vite source code.
*   **`scripts/src/frontend/public/assets/generated/`**: Where you can swap your own bakery images.
*   **`scripts/src/frontend/src/App.tsx`**: The main file for changing UI text and layout.
*   **`scripts/src/backend/`**: Internet Computer (ICP) Motoko backend logic.

---

## ✨ Features & Technologies

*   **⚡ Powered by Vite**: Lighting fast development and build.
*   **🍰 Parisian Aesthetic**: Elegant "Parisienne" and "Poppins" typography.
*   **🪄 Framer Motion**: Premium hover effects and scroll animations.
*   **🍦 Glassmorphism**: High-end UI cards with frosted glass effects.
*   **🎨 Custom Palette**: Raspberry, blush pink, and warm cream tones.

---

**Baked with Love, Frosted with Magic 🧁✨**
