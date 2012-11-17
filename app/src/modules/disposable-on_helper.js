(function ($, Disposable, undefined) {
  /**
   * Checks whether given object implements IEventManager interface
   */
  var isIEventManager = function (obj) {
    if (!isIEventManager.sample) {
      var geoObj = new ymaps.GeoObject();
      isIEventManager.sample = geoObj.events;
    };

    return interfaceMatch(obj, isIEventManager.sample);
  },

  /**
   * Compares two objects by interface
   */
  interfaceMatch = function (obj1, obj2) {
    var match = true;

    for (var prop in obj1) {
      if (obj2[prop] === undefined) {
        match = false;
        break;
      }
    }

    return match;
  };

  /**
   * Alias function for attaching event callbacks
   */
  $.Disposable.prototype.on = function (elem) {
    var rest = Array.prototype.slice.call(arguments, 1);

    // a jQuery object
    if (elem instanceof $ && this.jQuery) {
      return this.jQuery(elem).on.apply(this, rest);
    }
    // a BEM block
    else if (elem instanceof BEM && this.BEM) {
      return this.BEM(elem).on.apply(this, rest);
    }
    // a ymaps object
    else if (this.ymaps && isIEventManager(elem.events)) {
      this.ymaps(elem).on.apply(this, rest);
    }
  };

}(jQuery, jQuery.Disposable));