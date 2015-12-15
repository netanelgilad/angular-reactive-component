ReactiveComponent = (function() {
  let {Inject} = angular2now;

  @Inject(['$scope', '$reactive'])
  class ReactiveComponent {
    constructor(childArgs) {
      if (childArgs && childArgs.length > 0 && childArgs.callee && childArgs.callee.$inject && angular.isArray(childArgs.callee.$inject)) {
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

    $watch(...args) {
      return this.$scope.$watch.apply(this.$scope, args);
    }

    $watchGroup(...args) {
      return this.$scope.$watchGroup.apply(this.$scope, args);
    }

    $watchCollection(...args) {
      return this.$scope.$watchCollection.apply(this.$scope, args);
    }

    $on(...args) {
      return this.$scope.$on.apply(this.$scope, args);
    }

    $emit(...args) {
      return this.$scope.$emit.apply(this.$scope, args);
    }

    $broadcast(...args) {
      return this.$scope.$broadcast.apply(this.$scope, args);
    }

    $destroy(...args) {
      return this.$scope.$destroy.apply(this.$scope, args);
    }
  }

  return ReactiveComponent;
})();