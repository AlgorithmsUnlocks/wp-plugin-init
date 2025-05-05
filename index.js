#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pluginName = process.argv[2];

if (!pluginName) {
    console.log(chalk.red("❌ Please provide a plugin name."));
    process.exit(1);
}

const readablePluginName = pluginName
    .split(/[-_]/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' '); // e.g., "Test One"

const classPrefix = readablePluginName.replace(/\s+/g, ''); // e.g., "TestOne"
const constantPrefix = pluginName.toUpperCase().replace(/[-\s]/g, '_'); // e.g., TEST_ONE

const targetDir = path.join(process.cwd(), pluginName);
const templateDir = path.join(__dirname, 'template');

(async () => {
    try {
        if (await fs.pathExists(targetDir)) {
            console.log(chalk.red(`❌ Folder '${pluginName}' already exists.`));
            return;
        }

        await fs.copy(templateDir, targetDir);

        // Rename main plugin file
        const oldFile = path.join(targetDir, 'wp-plugins-boilerplate.php');
        const newFile = path.join(targetDir, `${pluginName}.php`);
        if (await fs.pathExists(oldFile)) {
            await fs.rename(oldFile, newFile);
            console.log(chalk.blue(`✅ plugin file name updated with plugin name.`));
        }

        // Update contents in main plugin file
        let content = await fs.readFile(newFile, 'utf-8');
        content = content
            .replace(/__PLUGIN_NAME__/g, pluginName)
            .replace(/__PLUGIN_TITLE__/g, readablePluginName); // ✅ added replacement
        await fs.writeFile(newFile, content);

        // Update README.md
        const readmePath = path.join(targetDir, 'README.md');
        if (await fs.pathExists(readmePath)) {
            let readme = await fs.readFile(readmePath, 'utf-8');
            readme = readme
                .replace(/__PLUGIN_NAME__/g, pluginName)
                .replace(/__PLUGIN_TITLE__/g, readablePluginName);
            await fs.writeFile(readmePath, readme);
            console.log(chalk.blue(`✅ readme.md updated with plugin name.`));
        }

        // Update package.json
        const pkgPath = path.join(targetDir, 'package.json');
        if (await fs.pathExists(pkgPath)) {
            const pkg = await fs.readJson(pkgPath);
            pkg.name = pluginName;
            pkg.description = `Boilerplate for ${pluginName}`;
            await fs.writeJson(pkgPath, pkg, { spaces: 2 });
            console.log(chalk.blue(`✅ package.json updated with plugin name.`));
        }

        // Update composer.json
        const composerPath = path.join(targetDir, 'composer.json');
        if (await fs.pathExists(composerPath)) {
            const composer = await fs.readJson(composerPath);
            composer.name = `your-vendor/${pluginName}`;
            composer.description = `Boilerplate for ${pluginName}`;

            if (composer.autoload?.['psr-4']) {
                delete composer.autoload['psr-4']['PluginsNameSpaces\\'];
                composer.autoload['psr-4'][`${classPrefix}\\`] = 'app/';
            }

            await fs.writeJson(composerPath, composer, { spaces: 2 });

            console.log(chalk.blue(`✅ composer.json namespace set to "${classPrefix}\\\\"`));

            try {
                await execPromise('composer dump-autoload', { cwd: targetDir });
                console.log(chalk.green('✅ composer dump-autoload ran successfully.'));
            } catch (error) {
                console.error(chalk.red('❌ Error running composer dump-autoload:', error));
            }
        }

        // Replace namespaces, class names, constants in all PHP files
        const phpFiles = glob.sync(path.join(targetDir, '**/*.php'));

        for (const file of phpFiles) {
            let content = await fs.readFile(file, 'utf8');

            // Dashboard text and slug
            content = content.replace(/Plugins Names - Short Intro/g, `${readablePluginName} - Short Intro`);
            content = content.replace(/Plugins Names/g, readablePluginName);
            content = content.replace(/plugins-names-dashboard/g, `${pluginName}-dashboard`);

            // Namespace and class references
            content = content.replace(/namespace\s+PluginsNameSpaces/g, `namespace ${classPrefix}`);
            content = content.replace(/use\s+PluginsNameSpaces\\/g, `use ${classPrefix}\\`);
            content = content.replace(/(['"])PluginsNameSpaces\\/g, `$1${classPrefix}\\`);
            content = content.replace(/new\s+PluginsNameSpaces\\/g, `new ${classPrefix}\\`);
            content = content.replace(/PluginsNameSpaces\\/g, `${classPrefix}\\`);

            // Constant replacement
            content = content.replace(/PLUGINS_NAMES_MIGRATOR/g, constantPrefix);

            await fs.writeFile(file, content);
        }
        console.log(chalk.blue(`✅ Updated namespace and constants`));

        console.log(chalk.green(`✅ Plugin '${pluginName}' created successfully!`));
    } catch (err) {
        console.error(chalk.red("❌ Error creating plugin:"), err);
    }
})();
