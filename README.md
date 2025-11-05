# 🚀 Dynamic Data Table Manager

A modern, flexible, and interactive table management web application built with React and Next.js.  
Designed for seamless CSV data import/export, effortless column reordering, and robust in-browser data editing—without compromise on user experience.

---

## ✨ Features

- **CSV Import/Export:** One-click upload and download of tabular data.
- **Add, Edit, Delete Rows:** Manage table data directly from the UI. No backend needed!
- **Column Reordering:** Drag-and-drop columns to customize your workflow.
- **Toggle, Add, and Remove Columns:** Show/hide or add new columns on the fly.
- **Column Sorting:** Click headers to toggle sorting (ASC/DESC).
- **Persistent State:** Column order, visibility, and data are remembered even after reload using Redux Persist.
- **Responsive UI:** Clean, modern material design—works on laptop, tablet, or phone.
- **Pagination & Search:** Instantly find or page through your data.
- **Light/Dark Mode:** Instantly switch for eye comfort.

---

## 🛠️ Tech Stack

- **Next.js 16+ (App Router)**
- **React 18**
- **Redux Toolkit + Redux Persist**
- **Material UI (MUI v5)**
- **@hello-pangea/dnd** (drag-and-drop)
- **papaparse** (csv)
- **TypeScript (strict types; for maintainability)**

---

## 📦 Folder Structure

```
SUREFY-INTERVIEW-TASK/
├── .git/ # Git version control folder
├── .next/ # Next.js build output (auto-generated)
├── app/
│ ├── layout.tsx # Root layout for the app
│ └── page.tsx # Main page entry point
├── node_modules/ # Installed dependencies
├── public/ # Static assets (images, icons, etc.)
├── src/
│ ├── components/ # Reusable UI components
│ │ ├── AddRowModal.tsx
│ │ ├── DataTable.tsx
│ │ ├── ManageColumnsModal.tsx
│ │ ├── RawEditForm.tsx
│ │ ├── TableToolbar.tsx
│ │ └── ThemeToggle.tsx
│ │
│ ├── features/ # Redux slices and related logic
│ │ ├── table/
│ │ │ └── tableSlice.ts
│ │ └── ui/
│ │ ├── columnPrefsSlice.ts
│ │ ├── searchSlice.ts
│ │ └── themeSlice.ts
│ │
│ ├── hooks/ # Custom React hooks
│ │ └── usePagination.ts
│ │
│ ├── types/ # TypeScript type definitions
│ │ └── table.ts
│ │
│ ├── declarations.d.ts # Global type declarations
│ ├── store.ts # Redux store configuration│
├── .gitignore # Git ignored files
├── eslint.config.mjs # ESLint configuration
├── next.config.ts # Next.js configuration
├── next-env.d.ts # Next.js TypeScript environment file
├── package.json # Project metadata & dependencies
├── package-lock.json # Dependency lock file
├── tsconfig.json # TypeScript configuration
└── README.md # Project documentation

```

---

## 🚀 Getting Started

### 1. Install dependencies

npm install

### 2. Run development server

npm run dev

Go to [http://localhost:3000](http://localhost:3000)

### 3. Production build

npm run build

npm start

---

## 🏗️ Usage

- **Import CSV:** Click "Import CSV", upload any .csv to populate the table.
- **Add Row:** Click "Add Row", enter data, and submit.
- **Edit/Delete:** Use the buttons in the Actions column.
- **Export CSV:** Instantly download the current table state.
- **Drag Column Headers:** Rearrange as needed.
- **Manage Columns:** Show/hide/add columns using the dialog.
- **Search & Pagination:** Quickly search or browse large datasets.

All preferences and changes are auto-saved in your browser.

---

## 📸 Demo Screenshot

<img width="1440" height="900" alt="Screenshot 2025-11-05 at 07 47 06" src="https://github.com/user-attachments/assets/5fd6604e-90b3-4233-8393-c469751b823a" />

---

## 🙋 Author

**Sumit Attri**  
[Frontend Engineer]

---

## 📜 License

MIT License.  
Created as part of a Surefy interview project, 2025.

---

> **Pro tip:** Fork this project and adapt it for inventory tracking, contacts, experimental data, or anywhere you need inline spreadsheet-like power in the browser!
