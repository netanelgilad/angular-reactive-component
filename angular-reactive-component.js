ReactiveComponent = (function() {
  let {Inject} = angular2now;


  let STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
  let ARGUMENT_NAMES = /([^\s,]+)/g;

  @Inject(['$scope', '$reactive'])
  class ReactiveComponent {
    constructor(childArgs) {
      if (childArgs && childArgs.length > 0) {
        let func = childArgs.callee;
        let fnStr = func.toString().replace(STRIP_COMMENTS, '');
        let result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);

        if (result === null)
          result = [];

        for (let i = 0; i < result.length; i++) {
          this[result[i]] = childArgs[i];
        }

        if (childArgs[childArgs.length - 2].constructor.toString().indexOf('Scope') > -1) {
          this.$scope = childArgs[childArgs.length - 2];
        }

        if (childArgs[childArgs.length - 1].toString().indexOf('ReactiveContext') > -1) {
          this.$reactive = childArgs[childArgs.length - 1];
        }
      }
    }

    helpers(def) {
      this.stopOnDestroy(this.$reactive(this).attach(this.$scope).helpers(def));
    }

    autorun(fn) {
      this.stopOnDestroy(Meteor.autorun(fn));
    }

    subscribe(subscriptionName, fn) {
      this.autorun(() => {
        let subscriptionParams = fn();
        this.stopOnDestroy(Meteor.subscribe(subscriptionName, ...subscriptionParams));
      })
    }

    stopOnDestroy(stoppable) {
      this.$scope.stopOnDestroy(stoppable);
    }

    $watch() {
      return this.$scope.$watch.apply(arguments);
    }

    $watchGroup() {
      return this.$scope.$watchGroup.apply(arguments);
    }

    $watchCollection() {
      return this.$scope.$watchCollection.apply(arguments);
    }

    $on() {
      return this.$scope.$on.apply(arguments);
    }

    $emit() {
      return this.$scope.$emit.apply(arguments);
    }

    $broadcast() {
      return this.$scope.$broadcast.apply(arguments);
    }

    $destroy() {
      return this.$scope.$destroy.apply(arguments);
    }
  }

  return ReactiveComponent;
})();