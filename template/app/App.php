<?php
namespace PluginsNameSpaces;

use PluginsNameSpaces\Hooks\Handlers\AdminMenuHandlers;
use PluginsNameSpaces\Hooks\Handlers\RestApiHandlers;

class App {

    public function __construct() {
        add_action('init', [$this, 'init']);
    }

    public function init() {

        define( 'PLUGINS_NAMES_MIGRATOR', 'plugins-migrator' );
        define( 'PLUGINS_NAMES_MIGRATOR_PATH', untrailingslashit( plugin_dir_path( __DIR__ ) ) );
        define( 'PLUGINS_NAMES_MIGRATOR_URL', untrailingslashit( plugin_dir_url( __DIR__ ) ) );
        define( 'PLUGINS_NAMES_MIGRATOR_BUILD_PATH', PLUGINS_NAMES_MIGRATOR_PATH . '/public/assets' );
        define( 'PLUGINS_NAMES_MIGRATOR_BUILD_URL', PLUGINS_NAMES_MIGRATOR_URL . '/public/assets' );
        define( 'PLUGINS_NAMES_MIGRATOR_VERSION', '1.1.1' );


       (new AdminMenuHandlers())->init();
       new RestApiHandlers();
    }
}
