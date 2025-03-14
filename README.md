
# Insurance Cost Chart WordPress Plugin

A simple WordPress plugin that displays an insurance cost comparison chart via shortcode.

## Installation

1. Download the plugin files from this repository.
2. Upload the plugin files to the `/wp-content/plugins/insurance-cost-chart` directory, or install the plugin through the WordPress plugins screen directly.
3. Activate the plugin through the 'Plugins' screen in WordPress.

## Usage

Use the shortcode `[insurance_cost_chart]` in any post, page, or widget area to display the chart.

### Shortcode Parameters

You can customize the chart by adding the following parameters to the shortcode:

```
[insurance_cost_chart title="Your Custom Title" description="Your custom description text."]
```

### Parameters:

- `title`: Changes the chart title (default: "Home Insurance Cost Comparison")
- `description`: Changes the chart description (default: "Average monthly home insurance premiums across major North Carolina cities compared to the state average.")

## Features

- Interactive bar chart showing insurance costs across North Carolina cities
- Tooltip showing detailed information when hovering over bars
- Ability to download the chart as an image
- Responsive design that works on all device sizes
- Reference line showing the state average cost

## Requirements

This plugin requires a WordPress installation with JavaScript enabled in the visitor's browser.

## Notes

The plugin uses external dependencies from unpkg.com CDN:
- React 18
- ReactDOM 18
- Recharts 2.12.7
- Babel Standalone
- html2canvas

These are loaded only when the shortcode is used on a page.
