/*
 * tiled
 * https://github.com/juan/tiled-js
 *
 * Copyright (c) 2014 Juan Pablo Pinilla Ossa
 * Licensed under the MIT license.
 */

/*global document, HTMLElement */
(function(exports) {

  'use strict';

  var bgImage = document.createElement('img');
  var config = {};
  var context;

  var types = {
    ORTO: 'orthogonal',
    ISO: 'isometric'
  };

  /**
   * @param {Object} options
   * @param {Object} options.source tiled map editor exported json
   * @param {HTMLElement|String} options.el element target
   * @constructor
   */
  function Tiled(options) {
    options = options || {};

    this.source = options.source;

    if (options.el) {
      if (options.el instanceof HTMLElement) {
        this.el = options.el;
      } else {
        this.el = document.querySelector(options.el);
      }

      if (this.el.nodeName !== 'CANVAS') {
        var canvas = document.createElement('canvas');
        this.el.appendChild(canvas);
        this.el = canvas;
      }

      context = this.el.getContext('2d');
    }
  }

  /**
   *
   */
  var draw = function() {
    var layers = config.layers;

    for (var i = 0, len = layers.length; i < len; i++) {
      var layer = layers[i];
      if (layer.data) {
        drawLayer(layer);
      }
    }
  };

  /**
   * @param {Object} layer
   */
  var drawLayer = function(layer) {
    var data = layer.data;
    var width = layer.width;

    for (var i = 0; data.length > i; i++) {

    }

    context.drawImage(bgImage, 0, 0);
  };

  /**
   *
   */
  Tiled.prototype.draw = function() {
    var source = this.source;
    var tileset = source.tilesets[0];
    var image = tileset.image;

    bgImage.src = image;
    bgImage.onload = draw;

    config.bgImage = bgImage;
    config.tileheight = source.tileheight;
    config.tilewidth = source.tilewidth;
    config.layers = source.layers;
  };

  /**
   *
   */
  Tiled.prototype.validate = function() {
    var source = this.source;

    if (!source) {
      throw new Error('source is required, ex. new Tiled({source: source, el: el})');
    }

    if (typeof source !== 'object') {
      throw new Error('source must be an object');
    }

    if (!source.hasOwnProperty('layers') || !source.hasOwnProperty('orientation') || !source.hasOwnProperty('tilesets')) {
      throw new Error('source must be a Tiled Map Editor valid json');
    }

    var el = this.el;

    if (!source) {
      throw new Error('el is required, ex. new Tiled({source: source, el: el})');
    }
  };

  exports.Tiled = Tiled;

}(typeof exports === 'object' && exports || this));
