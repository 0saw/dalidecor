"use strict";

function sTools () {
  this.ver = '18-01-17';

  this.cssProps = {
    transf: Modernizr.prefixed('transform'),
  }
}


sTools.prototype.toggleClass = function(el, className) {
  if (el.classList) {
    el.classList.toggle(className);
  } else {
    var classes = el.className.split(' ');
    var existingIndex = classes.indexOf(className);

    if (existingIndex >= 0)
      classes.splice(existingIndex, 1);
    else
      classes.push(className);

    el.className = classes.join(' ');
  }
};

sTools.prototype.addClass = function(el, className) {
  if (el.classList)
    el.classList.add(className);
  else
    el.className += ' ' + className;
};

sTools.prototype.removeClass = function(el, className) {
  if (el.classList)
    el.classList.remove(className);
  else
    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
};

sTools.prototype.ready = function(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
};

sTools.prototype.raf = Modernizr.prefixed('requestAnimationFrame', window);


var st = new sTools;