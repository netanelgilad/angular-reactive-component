ReactiveComponent = (function() {
  let {Inject} = angular2now;


  let STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
  let ARGUMENT_NAMES = /([^\s,]+)/g;

  @Inject(['$scope', '$reactive'])
  class ReactiveComponent {
    constructor(childArgs) {
      if (childArgs && childArgs.length > 0 && childArgs.callee && childArgs.callee.$inject) {
        childArgs.callee.$inject.forEach((injected, i) => {
          this[injected] = childArgs[i];
        });

        if (this.$reactive && this.$scope) {
          this.$reactive(this).attach(this.$scope);
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