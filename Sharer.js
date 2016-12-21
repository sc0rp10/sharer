"use strict";
function Sharer (options) {
    options = options || {};
    var self = this;

    var def = {
        "vk": "https://vk.com/share.php",
        "fb": "https://www.facebook.com/dialog/share",
        "tw": "https://twitter.com/intent/tweet"
    };

    this.share_vk = function (e) {
        var node = e.currentTarget;
        var has_title = node.hasAttribute("data-title");
        var has_text = node.hasAttribute("data-text");
        var has_picture = node.hasAttribute("data-picture");
        var qs = "?url=" + window.location.href;

        if (has_title) {
            qs += "&title=" + encodeURIComponent(node.getAttribute("data-title"));
        }

        if (has_text) {
            qs += "&description=" + encodeURIComponent(node.getAttribute("data-text"));
        }

        if (has_picture) {
            qs += "&image=" + encodeURIComponent(node.getAttribute("data-picture"));
        }

        this._openPopup(def.vk + qs, "vk");
    }

    this.share_fb = function (e) {
        var node = e.currentTarget;
        var meta_app_id = document.querySelector("meta[property='fb:app_id']");
        var qs = "?display=page";
        var has_title = node.hasAttribute("data-title");
        var has_text = node.hasAttribute("data-text");
        var has_picture = node.hasAttribute("data-picture");

        if (meta_app_id) {
            qs += "&app_id=" + meta_app_id.getAttribute("content");
        }

        if (has_text) {
            qs += "&title=" + encodeURIComponent(node.getAttribute("data-title"));
        }

        if (has_text) {
            qs += "&description=" + encodeURIComponent(node.getAttribute("data-text"));
        }

        if (has_picture) {
            qs += "&picture=" + encodeURIComponent(node.getAttribute("data-picture"));
        }

        qs += "&href=" + window.location.href;

        this._openPopup(def.fb + qs, "fb");
    }

    this.share_tw = function (e) {
        var node = e.currentTarget;
        var meta_title = document.querySelector("meta[property='og:title']");
        var meta_creator = document.querySelector("meta[name='twitter:creator']");
        var has_text = node.hasAttribute("data-text");

        var text = document.title;
        var url = window.location.href,
            qs = "?url=" + url,
            via;

        if (meta_title) {
            text = meta_title.getAttribute("content");
        }

        if (has_text) {
            text = node.getAttribute("data-text");
        }

        if (meta_creator) {
            via = meta_creator.getAttribute("content").replace('@', '');
        }

        if (text) {
            qs += "&text=«" + encodeURIComponent(text) + "»";
        }

        if (via) {
            qs += "&via=" + via;
        }

        this._openPopup(def.tw + qs, "tw");
    }

    this._openPopup = function (url, name) {
        var w = 800;
        var h = 600;
        var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
        var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

        var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        var left = ((width / 2) - (w / 2)) + dualScreenLeft;
        var top = ((height / 2) - (h / 2)) + dualScreenTop;
        var newWindow = window.open(url, name + ' Share', 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

        if (window.focus) {
            newWindow.focus();
        }
    }

    this.bindEvents = function () {
        var self = this;

        Object.keys(def).forEach(function (network) {
            var selector = "[data-share='" + network + "']";
            var nodes = document.querySelectorAll(selector);

            for (var i = 0, l = nodes.length; i < l; i++) {
                nodes[i].addEventListener("click", self["share_" + network].bind(self));
            }
        });
    }

    this.run = this.bindEvents.bind(this);
};

module.exports = Sharer;
