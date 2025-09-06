// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('@chiragrupani/karma-chromium-edge-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      logLevel: 'debug',
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/chat-ui'),
      subdir: '.',
      reporters: [
        {type: 'html'},
        {type: 'text-summary'},
        {type: 'lcovonly'},
        {type: 'json'}
      ]
    },
    reporters: ['progress', 'kjhtml'],
    colors: true,
    loglevel: config.LOG_INFO,
    singleRun: false, // dev false
    autoWatch: true, // dev true
    browsersDisconnectTimeout: 60000,
    browserNoActivityTimeout: 60000,
    captureTimeout: 60000,
    browsers: ['Edge'], // o 'EdgeHeadless' para modo headless
    restartOnFileChange: true, // no reiniciar en CI false
    customLaunchers: {
      EdgeHeadless: {
        base: 'Edge',
        flags: [
          '--headless',
          '--no-sandbox',
          '--disable-gpu',
          '--disable-sandbox',
          '--disable-setuid-sandbox'
        ]
      }
    },
    browserConsoleLogOptions: {
      level: 'log',
      format: '%b %T: %m',
      terminal: true,
    }
  });
};
