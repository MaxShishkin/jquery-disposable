(function (Disposable, undefined) {
  /**
   * A callback function wrapper
   * Returns a new function that can be disposed
   */
  Disposable.prototype.callback = function (fn, ctx) {
    var that = this;

    this._checkDisposable();

    return function () {
      return that.isDisposed() ?
        undefined : fn.apply(ctx || this, arguments);
    }
  };

}(jQuery.Disposable));