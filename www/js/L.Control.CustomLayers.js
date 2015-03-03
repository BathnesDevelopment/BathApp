(function (factory, window) {
    // see https://github.com/Leaflet/Leaflet/blob/master/PLUGIN-GUIDE.md#module-loaders
    // for details on how to structure a leaflet plugin.

    // define an AMD module that relies on 'leaflet'
    if (typeof define === 'function' && define.amd) {
        define(['leaflet'], factory);
    } else if (typeof exports === 'object') {
        if (typeof window !== 'undefined' && window.L) {
            module.exports = factory(L);
        } else {
            module.exports = factory(require('leaflet'));
        }
    }

    // attach your plugin to the global 'L' variable
    if (typeof window !== 'undefined' && window.L) {
        window.L.CustomLayers = factory(L);
    }

    L.control.customlayers = function (options) {
        return new L.Control.CustomLayers(options);
    };

}(function (L) {

    L.Control.CustomLayers = L.Control.extend({
        options: {
            position: 'topright',
            action: function() {}
        },

        onAdd: function (map) {
            var container = L.DomUtil.create('div', 'leaflet-bar');
            L.DomEvent.on(container, 'click', this.options.action);
            container.innerHTML = '<button><i class="fa fa-sliders map-custom-layers"></i></button>';
            return container;
        }
    });

    return L.Control.CustomLayers;

}, window));