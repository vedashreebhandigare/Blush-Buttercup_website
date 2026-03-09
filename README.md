# Blush & Buttercup - Boutique Bakery Landing Page

This project is a high-end landing page for "Blush & Buttercup", a premium boutique bakery based in Mumbai. It is built with React, Vite, Tailwind CSS, and Framer Motion, with a backend intended for the Internet Computer (ICP).

## 🧁 Quick Start (Mock Backend)

The easiest way to run the project is using the **Mock Backend**. This allows you to view the full premium design and interact with the UI without needing to set up a local ICP environment.

1. **Install Dependencies**:
   Open your terminal in the project root and run:
   ```powershell
   npx pnpm install
   ```

2. **Enable Mock Mode**:
   Ensure the following file exists and has mocking enabled:
   - **File**: `scripts/src/frontend/.env`
   - **Content**: `VITE_USE_MOCK=true`

3. **Launch the Frontend**:
   Navigate to the frontend directory and start the dev server:
   ```powershell
   cd scripts/src/frontend
   npx pnpm dev
   ```

4. **Visit the App**:
   The app is configured to run at [http://localhost:5001](http://localhost:5001).

## 🛠 Features

- **Premium Parisian Aesthetic**: Elegant typography (Parisienne & Poppins) with rich chocolate and raspberry tones.
- **Dynamic Menu**: Browsable collections of cakes, macarons, and signature bakes.
- **Interactive UI**: Smooth animations powered by Framer Motion and custom glassmorphism effects.
- **Mobile Responsive**: Fully optimized for phones, tablets, and desktops.

## 🔗 Running with Real Backend (ICP)

To use the actual Motoko backend code (`backend/main.mo`):

1. **Install DFX**: Ensure the [Internet Computer SDK](https://sdk.dfinity.org/docs/quickstart/local-quickstart.html) is installed.
2. **Start Local Replica**: `dfx start --background --clean`
3. **Deploy Canisters**: `dfx deploy`
4. **Configure Frontend**: Set `VITE_USE_MOCK=false` in `scripts/src/frontend/.env`.
5. **Run Frontend**: `npx pnpm dev` (inside the frontend directory).

## 📁 Project Layout

- `/backend`: The Motoko actor logic for managing menu items and inquiries.
- `/scripts/src/frontend`: The React application source.
- `/scripts/src/frontend/src/mocks`: Mock data implementation for rapid development.
- `/scripts/src/frontend/src/components/ui`: Custom premium UI components.
