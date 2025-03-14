
<?php
/**
 * Plugin Name: Insurance Cost Chart
 * Plugin URI: https://yourwebsite.com
 * Description: A simple plugin that displays an insurance cost comparison chart via shortcode [insurance_cost_chart].
 * Version: 1.0.0
 * Author: Your Name
 * Author URI: https://yourwebsite.com
 * License: GPL2
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register script and style assets
 */
function insurance_cost_chart_register_assets() {
    // Register external scripts
    wp_register_script('react', 'https://unpkg.com/react@18/umd/react.production.min.js', array(), '18.0.0', true);
    wp_register_script('react-dom', 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js', array('react'), '18.0.0', true);
    wp_register_script('recharts', 'https://unpkg.com/recharts@2.12.7/umd/Recharts.min.js', array('react'), '2.12.7', true);
    wp_register_script('babel', 'https://unpkg.com/babel-standalone@6/babel.min.js', array(), '6.0.0', true);
    wp_register_script('html2canvas', 'https://unpkg.com/html2canvas@1.4.1/dist/html2canvas.min.js', array(), '1.4.1', true);
    
    // Register plugin script with all dependencies
    wp_register_script(
        'insurance-chart-script', 
        plugins_url('js/insurance-chart.js', __FILE__), 
        array('react', 'react-dom', 'recharts', 'babel', 'html2canvas'), 
        '1.0.0', 
        true
    );
    
    // Register plugin stylesheet
    wp_register_style(
        'insurance-chart-style',
        plugins_url('css/insurance-chart-style.css', __FILE__),
        array(),
        '1.0.0'
    );
}
add_action('wp_enqueue_scripts', 'insurance_cost_chart_register_assets');

/**
 * Create shortcode for the insurance cost chart
 */
function insurance_cost_chart_shortcode($atts) {
    // Parse attributes
    $atts = shortcode_atts(
        array(
            'title' => 'Home Insurance Cost Comparison',
            'description' => 'Average monthly home insurance premiums across major North Carolina cities compared to the state average.',
        ),
        $atts,
        'insurance_cost_chart'
    );
    
    // Enqueue necessary scripts and styles
    wp_enqueue_script('react');
    wp_enqueue_script('react-dom');
    wp_enqueue_script('recharts');
    wp_enqueue_script('babel');
    wp_enqueue_script('html2canvas');
    wp_enqueue_script('insurance-chart-script');
    wp_enqueue_style('insurance-chart-style');
    
    // Start output buffering
    ob_start();
    
    // Container for the chart
    echo '<div id="insurance-chart-root" 
               data-title="' . esc_attr($atts['title']) . '" 
               data-description="' . esc_attr($atts['description']) . '">
          </div>';
    
    // Return the buffered content
    return ob_get_clean();
}
add_shortcode('insurance_cost_chart', 'insurance_cost_chart_shortcode');
