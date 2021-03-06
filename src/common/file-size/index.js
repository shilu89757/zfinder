'use strict';
/**
 * index module
 * @module index
 * @see module:index
 */
import filesize from 'filesize';
import './index.less';

const fileSize = Object.create(HTMLElement.prototype);

fileSize._setContent = function () {
  const me = this;
  const size = me.getAttribute('size');
  me.textContent = filesize(size);
};

fileSize.createdCallback = function () {
  this._setContent();
};

fileSize.attributeChangedCallback = function () {
  this._setContent();
};

export default document.registerElement('file-size', {
  prototype: fileSize
});
