# Angular Reactive Component

This components represents a ECMAScript6 class which can be used as a base class for creating reactive components using AngularJS, Meteor and [Angular-Meteor](angular-meteor.com) project.

The purpose of this component are:

1. Remove the need to inject `$reactive` and `$scope`
2. Remove the need to call `$reactive(this).attach($scope)` when working with Angular-Meteor with components and `controllerAs`.
3. Remove the need to put your injectables on `this` inside your constructor for each service.

## Usage

In order to use it, create a component class using [angular2-now](https://github.com/pbastowski/angular2-now) package and extend `ReactiveComponent`.

Then, call the `super` constructor, sending `arguments`

For example:
```js
  let {Component, View, Inject, SetModule} = angular2now;
  
  SetModule('myApp');
  
  @Component({
    selector: 'my-component'
  })
  @View({templateUrl: 'my-component.html'})
  @Inject('MyService')
  class myComponent extends ReactiveComponent {
    constructor(MyService) {
      this.helpers({...}); // angular-meteor usage
    }
    
    // This method can use your injected services!
    myMethod() {
      this.MyService.doSomething(); 
    }
  }  
```

### More Information

You can find more information in the following links:

- [Angular-Meteor website](http://www.angular-meteor.com)
- [Angular-Meteor GitHub](https://github.com/Urigo/angular-meteor)
- [angular2-now GitHub](https://github.com/pbastowski/angular2-now)

### Thanks
@Urigo, @pbastowski, @netanelgilad
