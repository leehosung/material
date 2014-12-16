(function() {
'use strict';

/**
 * Initialization function that validates environment
 * requirements.
 */
angular.module('material.core', [])
  .run(MdCoreInitialize)
  .config(MdCoreConfigure);

function MdCoreInitialize() {
  if (typeof Hammer === 'undefined') {
    throw new Error(
      'ngMaterial requires HammerJS to be preloaded.'
    );
  }
}

function MdCoreConfigure($provide, $mdThemingProvider) {
  $provide.decorator('$$rAF', ['$delegate', '$rootScope', rAFDecorator]);

  // Define a default theme with our newly loaded colors
  $mdThemingProvider.theme('default')
    .primaryColor('blue')
    .accentColor('green')
    .warnColor('red')
    .backgroundColor('grey');

  // Define a default theme with our newly loaded colors
  $mdThemingProvider.theme('default-dark')
    .backgroundColor('grey', {
      'default': '500',
      'hue-1': '300',
      'hue-2': '600',
      'hue-3': '800',
    })
    .dark();

  function rAFDecorator($$rAF, $rootScope) {
    /**
     * Use this to debounce events that come in often.
     * The debounced function will always use the *last* invocation before the
     * coming frame.
     *
     * For example, window resize events that fire many times a second:
     * If we set to use an raf-debounced callback on window resize, then
     * our callback will only be fired once per frame, with the last resize
     * event that happened before that frame.
     *
     * @param {function} callback function to debounce
     */
    $$rAF.debounce = function(cb) {
      var queueArgs, alreadyQueued, queueCb, context;
      return function debounced() {
        queueArgs = arguments;
        context = this;
        queueCb = cb;
        if (!alreadyQueued) {
          alreadyQueued = true;
          $$rAF(function() {
            queueCb.apply(context, queueArgs);
            alreadyQueued = false;
          });
        }
      };
    };
    return $$rAF;

  }

}

})();
