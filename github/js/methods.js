window.jQuery = window.$ = function(el) {
    /*Hack de seletor jquery para angular*/
    if (typeof el === "string" && el.charAt(0) !== '<') {
            el = document.querySelectorAll(el);
    }
    return angular.element(el);
};

Array.prototype.indexOf||(Array.prototype.indexOf=function(a,b){for(var c=b||0,d=this.length;c<d;c++)if(this[c]===a)return c;return-1});window.intervalList=[];window.oldSetInterval=window.setInterval;window.oldClearInterval=window.clearInterval;window.setInterval=function(a,b){var c=[].slice.call(arguments,2),d=window.oldSetInterval(function(){a.apply(this,c)},b);window.intervalList.push(d);return d};
function arrayObject(a){var b={};$.each(a,function(a,d){b.hasOwnProperty(d.name)?(b[d.name]=$.makeArray(b[d.name]),b[d.name].push(d.value)):b[d.name]=d.value});return b}function toObject(a){var b={};$.each(a,function(c,d){0===c%2&&!b.hasOwnProperty(d)&&(b[d]=a[c+1])});return b}function getCookie(a){var b,c,d,e=document.cookie.split(";");for(b=0;b<e.length;b++)if(c=e[b].substr(0,e[b].indexOf("=")),d=e[b].substr(e[b].indexOf("=")+1),c=c.replace(/^\s+|\s+$/g,""),c===a)return unescape(d)}
function isEmail(c) {
    return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(c) ? !0 : !1
}

String.prototype.removeAccents = function() {
    b = this.split("");
    for (var c = [], a = b.length, d = 0; d < a; d++)
        -1 != "\u00c0\u00c1\u00c2\u00c3\u00c4\u00c5\u00e0\u00e1\u00e2\u00e3\u00e4\u00e5\u00d2\u00d3\u00d4\u00d5\u00d5\u00d6\u00d8\u00f2\u00f3\u00f4\u00f5\u00f6\u00f8\u00c8\u00c9\u00ca\u00cb\u00e8\u00e9\u00ea\u00eb\u00f0\u00c7\u00e7\u00d0\u00cc\u00cd\u00ce\u00cf\u00ec\u00ed\u00ee\u00ef\u00d9\u00da\u00db\u00dc\u00f9\u00fa\u00fb\u00fc\u00d1\u00f1\u0160\u0161\u0178\u00ff\u00fd\u017d\u017e".indexOf(b[d]) ? c[d] = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz".substr("\u00c0\u00c1\u00c2\u00c3\u00c4\u00c5\u00e0\u00e1\u00e2\u00e3\u00e4\u00e5\u00d2\u00d3\u00d4\u00d5\u00d5\u00d6\u00d8\u00f2\u00f3\u00f4\u00f5\u00f6\u00f8\u00c8\u00c9\u00ca\u00cb\u00e8\u00e9\u00ea\u00eb\u00f0\u00c7\u00e7\u00d0\u00cc\u00cd\u00ce\u00cf\u00ec\u00ed\u00ee\u00ef\u00d9\u00da\u00db\u00dc\u00f9\u00fa\u00fb\u00fc\u00d1\u00f1\u0160\u0161\u0178\u00ff\u00fd\u017d\u017e".indexOf(b[d]), 1) : c[d] = b[d];
    return c.join("")
};

String.prototype.capitalize=function(){return this.replace(/(^|\s)([a-z])/g,function(a,b,c){return b+c.toUpperCase()})};
Array.prototype.filter || (Array.prototype.filter = function(c, a) {
  var d = this.length >>> 0;
  if ("function" != typeof c) {
    throw new TypeError;
  }
  for (var e = [], f = 0; f < d; f++) {
    if (f in this) {
      var h = this[f];
      c.call(a, h, f, this) && e.push(h);
    }
  }
  return e;
});


Array.prototype.forEach || (Array.prototype.forEach = function(c, a) {
  for (var d = 0, e = this.length;d < e;++d) {
    c.call(a, this[d], d, this);
  }
});

String.prototype.initialCaps = function() {
  return this.replace(/[^|\.|\!|\?/]+/g, function(c, a, d) {
    return 0 > d.charAt(a - 1).search(/[^\s-]/) ? c.charAt(0).toUpperCase() + c.substr(1).toLowerCase() : " " + c.charAt(1).toUpperCase() + c.substr(2).toLowerCase();
  });
};

Array.prototype.sortBy = function() {
  function c(a) {
    var c = 1;
    "-" == a[0] && (c = -1, a = a.substr(1));
    return function(e, f) {
      return(e[a] < f[a] ? -1 : e[a] > f[a] ? 1 : 0) * c;
    };
  }
  return this.sort(function() {
    if (0 == arguments.length) {
      throw "Zero length arguments not allowed for Array.sortBy()";
    }
    var a = arguments;
    return function(d, e) {
      for (var f = 0, h = 0;0 == f && h < a.length;h++) {
        f = c(a[h])(d, e);
      }
      return f;
    };
  }.apply(null, arguments));
};

Array.prototype.unique = function() {
  var unique = [];
    for (var i = 0; i < this.length; i++) {
        if (unique.indexOf(this[i]) == -1) {
            unique.push(this[i]);
        }
    }
    return unique;
};

Array.prototype.map || (Array.prototype.map = function(c, a) {
  var d = this.length;
  if ("function" != typeof c) {
    throw new TypeError;
  }
  for (var e = Array(d), f = 0;f < d;f++) {
    f in this && (e[f] = c.call(a, this[f], f, this));
  }
  return e;
});