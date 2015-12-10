Package.describe({
  name: 'dotansimha:angular-reactive-component',
  version: '0.0.1',
  summary: 'Angular-Meteor ES6 base class for creating reactive component',
  git: 'https://github.com/dotansimha/angular-reactive-component',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('angular@1.3.0', 'client');
  api.use('pbastowski:angular2-now@1.0.1', 'client');
  api.use('pbastowski:angular-babel@1.0.6', 'client');
  api.addFiles('angular-reactive-component.js', 'client');

  api.export('ReactiveComponent', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('dotansimha:angular-reactive-component');
});
