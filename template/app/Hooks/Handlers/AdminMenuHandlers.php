<?php
namespace PluginsNameSpaces\Hooks\Handlers;

class AdminMenuHandlers {

    public function __construct() {
        $this->init();
    }

    public function init() {
        add_action('admin_menu', [$this, 'plugins_names_add_admin_menu']);
        add_action('admin_enqueue_scripts', [$this, 'conditionally_enqueue_assets']);
    }

    public function conditionally_enqueue_assets($hook) {
        // Only load assets on our plugin page
        if ($hook !== 'toplevel_page_plugins-names-dashboard') {
            return;
        }
        $this->suitepress_plugins_names_enqueue_assets();
    }

    public function plugins_names_add_admin_menu() {
        add_menu_page(
            'Plugins Names - Short Intro',
            'Plugins Names',
            'manage_options',
            'plugins-names-dashboard',
            [$this, 'render_dashboard'],
            'dashicons-admin-generic',
            26
        );
    }

    public function render_dashboard() {
        echo '<div id="my-vue-admin-app"></div>';
    }

    public function suitepress_plugins_names_enqueue_assets() {

        $dev_server = 'http://localhost:5173';
        $hot_file_path = PLUGINS_NAMES_MIGRATOR_PATH . '/.hot';
        $is_dev = file_exists($hot_file_path);

        if ($is_dev) {
            // Log to debug.log
//            error_log('Vue Dev Mode: loading from Vite dev server');

            // Enqueue Vite HMR client and main entry
            wp_enqueue_script('vite-client', $dev_server . '/@vite/client', [], null, true);
            wp_enqueue_script('my-plugin-vite', $dev_server . '/js/main.js',  [], null, true);

            wp_localize_script('my-plugin-vite', 'SuitePressSettings', [
                'restUrl' => esc_url_raw(rest_url('suitepress/v1/plugin-stats')),
                'nonce'   => wp_create_nonce('wp_rest'),
            ]);

        } else {

            error_log(PLUGINS_NAMES_MIGRATOR_BUILD_URL);
            // Load compiled assets
            wp_enqueue_script('my-plugin-main', PLUGINS_NAMES_MIGRATOR_BUILD_URL . '/main.js', [], null, true);
            wp_enqueue_style('my-plugin-style', PLUGINS_NAMES_MIGRATOR_BUILD_URL . '/main.css');

            wp_localize_script('my-plugin-main', 'SuitePressSettings', [
                'restUrl' => esc_url_raw(rest_url('suitepress/v1/plugin-stats')),
                'nonce'   => wp_create_nonce('wp_rest'),
            ]);
        }

        // Optional: Add type="module" for both dev and prod
        add_filter('script_loader_tag', function ($tag, $handle) {
            if (in_array($handle, ['vite-client', 'my-plugin-vite', 'my-plugin-main'])) {
                $tag = str_replace('<script ', '<script type="module" ', $tag);
            }
            return $tag;
        }, 10, 2);
    }
}
