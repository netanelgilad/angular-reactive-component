Package.describe({
  name: 'dotansimha:angular-reactive-component',
  version: '0.0.1',
  summary: '',
  git: 'https://github.com/dotansimha/angular-reactive-component',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('angular', 'client');
  api.use('pbastowski:angular2-now', 'client');
  api.use('pbastowski:angular-babel@1.0.6', 'client');
  api.addFiles('angular-reactive-component.js', 'client');

  api.export('ReactiveComponent', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('angular-reactive-component');
});
