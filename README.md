````markdown
# wp-plugin-init

`Modern WordPress Plugin Boilerplate Generator`
Scaffold a complete WordPress plugin powered by PHP OOP, Composer, Vue.js, Vite, and MVC architecture — with a single command.

---

## What is wp-plugin-init?

`wp-plugin-init` is a CLI tool that instantly bootstraps a modern, scalable, and production-ready WordPress plugin boilerplate.  
It’s ideal for developers who want to:

- Use `Object-Oriented PHP` and `PSR-4 autoloading`
- Structure plugins with `MVC architecture`
- Integrate a modern `JavaScript frontend` powered by `Vue 3 + Vite`
- Maintain clean, namespaced code with `Composer`

---

## Features

✅ Automatic namespace generation based on your plugin name  
✅ Composer-ready with PSR-4 autoloading  
✅ Vue 3 + Vite-based frontend development workflow  
✅ Clean MVC file structure  
✅ Auto-configured constants, file paths, and menu slugs  
✅ Dashboard admin page setup  
✅ Instantly replaces placeholders across all files  
✅ Works with `Node.js`, `npm`, and `composer`

---

## Requirements

- `Node.js` v14+
- `Composer`
- `PHP` 7.4 or later
- `npm` (for frontend tooling)

---

## Installation

Install globally via npm:

```bash
npm install -g wp-plugin-init
````

---

## Usage

Run the generator with your desired plugin name:

```bash
wp-plugin-init my-awesome-plugin
```

This will:

* Create a folder named `my-awesome-plugin`
* Set up PHP namespace `MyAwesomePlugin`
* Replace all references in PHP/JS files
* Generate constants like `MY_AWESOME_PLUGIN_VERSION`
* Prepare the admin dashboard menu
* Install `composer.json` and frontend assets folder

---

## Example Output

**Command:**

```bash
wp-plugin-init suite-one
```

**Result:**

* Namespace: `SuiteOne\\`
* Main File: `suite-one.php`
* Constants: `SUITE_ONE_PATH`, `SUITE_ONE_VERSION`
* Admin Menu: “Suite One”
* Folder: `/suite-one/app`, `/suite-one/public/assets`
* Vue 3 and Vite pre-configured

---

## Boilerplate Structure

```
suite-one/
├── app/
│   ├── Controllers/
│   ├── Models/
│   ├── Views/
│   └── App.php
├── public/
│   └── assets/
├── resources/
│   └── js/           # Vue 3 + Vite entry
├── vite.config.js
├── composer.json
├── package.json
├── suite-one.php     # Main plugin file
└── README.md
```

---

## Technologies Used

* ✅ **PHP 7.4+** (OOP, Namespaces)
* ✅ **Composer** (PSR-4 Autoloading)
* ✅ **Vue 3** (Composition API)
* ✅ **Vite** (Hot Module Replacement, fast builds)
* ✅ **MVC pattern**
* ✅ **WordPress Plugin API**

---

## After Generation

Inside the new plugin folder:

```bash
composer install
npm install
npm run dev     # Start Vite dev server
npm run build   # Build assets for production
```

---

## Customization

All text and identifiers are automatically generated from your input plugin name:

* `plugin-name` → file/folder slugs
* `PluginName` → PHP namespace
* `PLUGIN_NAME` → constants
* Dashboard labels, menu titles, and slugs

You can customize this behavior by modifying the generated boilerplate.

---

## Philosophy

This project aims to combine the best of **modern PHP architecture** and **JavaScript frontend tooling** for WordPress plugin developers, giving you a clean, scalable starting point for any project.

---

## License

MIT © 2025 [Ruman Ahmed](https://github.com/AlgorithmsUnlocks)

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues, submit PRs, or suggest features.

```
