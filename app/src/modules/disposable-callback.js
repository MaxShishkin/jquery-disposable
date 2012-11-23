(function (Disposable, undefined) {
  /**
   * A callback function wrapper
   * Returns a new function that can be disposed
   */
  Disposable.prototype.callback = function (fn, ctx) {
    var that = this;

    if (this._disposed) {
      throw new Error(Disposable.disposedErrMsg);
    }

    return function () {
      return that._disposed ?
        undefined : fn.apply(ctx || this, arguments);
    }
  };

}(jQuery.Disposable));