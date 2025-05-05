<?php

if ( ! defined('ABSPATH')) {
    exit;
}
/**
 * WordPress - __PLUGIN_TITLE__
 *
 * Plugin Name:         __PLUGIN_TITLE__
 * Plugin URI:          https://wordpress.org/plugins/__PLUGIN_NAME__
 * Description:         Plugins short description
 * Version:             1.1.1
 * Requires at least:   5.2
 * Requires PHP:        7.2
 * Contributor:         Contributor according to the WordPress.org
 * Author:              Pluigns Author
 * Author URI:          https://suitepress.org/__PLUGIN_NAME__
 * License:             GPL v2 or later
 * License URI:         https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:         __PLUGIN_NAME__
 * Domain Path:         /languages
 */
require_once __DIR__ . '/vendor/autoload.php';

use PluginsNameSpaces\App;

if ( class_exists( 'PluginsNameSpaces\App' ) ) {
    $app = new App();
}
