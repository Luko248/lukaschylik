export default {
  plugins: {
    '@tailwindcss/postcss': {
      // Enable optimizations for better performance
      optimize: true,
      // Enable CSS nesting support
      nesting: true,
      // Enable container queries
      container: true,
      // Enable modern CSS features
      'future-flags': [
        'no-arbitrary-value-in-hash',
        'deprecate-arbitrary-value-in-hash',
      ],
    },
    'postcss-preset-env': {
      // Use stage 2 for better browser compatibility in 2025
      stage: 2,
      features: {
        'custom-properties': {
          // Preserve custom properties for better CSS variables support
          preserve: true,
        },
        'nesting-rules': true,
        'custom-media-queries': true,
        'media-query-ranges': true,
        'logical-properties-and-values': true,
        'color-functional-notation': true,
        'cascade-layers': true,
      },
      // Modern browser support for 2025
      browsers: [
        '> 1%',
        'last 2 versions',
        'not dead',
        'not ie 11',
        'not op_mini all',
      ],
    },
    autoprefixer: {
      // Modern browser support focusing on current and recent versions
      overrideBrowserslist: [
        '> 1%',
        'last 2 versions',
        'not dead',
        'not ie 11',
        'not op_mini all',
        'not android < 5',
        'not ios < 12',
      ],
      // Optimize for modern browsers - reduce vendor prefixes
      grid: 'autoplace',
      // Remove outdated prefixes for better performance
      remove: true,
      // Add prefixes only when needed
      add: true,
      // Support flexbox with modern syntax
      flexbox: 'no-2009',
      // Enable cascade for better specificity handling
      cascade: false,
    },
  },
}
