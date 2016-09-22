"use strict";
function Sharer (options) {
	options = options || {};
	var self = this;

	var def = {
		"vk": "https://vk.com/share.php?url=",
		"fb": "http://facebook.com/sharer/sharer.php?u=",
		"tw": "https://twitter.com/intent/tweet?url="
	};

	this.share_vk = function () {
		this._openPopup(def.vk + window.location.href, "vk");
	}
	this.share_fb = function () {
		this._openPopup(def.fb + window.location.href, "fb");
	}
	this.share_tw = function () {
		var meta_title = document.querySelector("meta[property='og:title']");
		var text = document.title;

		if (meta_title) {
			text = meta_title.getAttribute("content");
		}

		this._openPopup(def.tw + window.location.href + "&text=" + text, "tw");
	}

	this._openPopup = function (url, name) {
		var w = 620;
		var h = 430;
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
			document.querySelectorAll(selector).forEach(function(element) {
				element.addEventListener("click", self["share_" + network].bind(self));
			});
		});
	}

	this.run = function() {
		this.bindEvents();
	}.bind(this)
};

module.exports = Sharer;
