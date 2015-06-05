var Sharer = function (options) {
	options = options || {};
	var self = this;

	this._default = {
		"vk": {
			"popup_url": "http://vk.com/share.php?url="
		},
		"fb": {
			"popup_url": "http://facebook.com/sharer/sharer.php?u="
		},
		"tw": {
			"popup_url": "https://twitter.com/intent/tweet?url="
		}
	};

	this.config = $.extend(this._default, options);

	this.share_vk = function () {
		this._openPopup(this.config.vk.popup_url + window.location.href, "vk");
	}
	this.share_fb = function () {
		this._openPopup(this.config.fb.popup_url + window.location.href, "fb");
	}
	this.share_tw = function () {
		var meta_title = $("meta[property='og:title']");
		var text = "&text=" + meta_title.attr("content");

		this._openPopup(this.config.tw.popup_url + window.location.href + text, "tw");
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

		// Puts focus on the newWindow
		if (window.focus) {
			newWindow.focus();
		}
	}

	this.bindEvents = function () {
		var self = this;

		Object.keys(this.config).forEach(function (network) {
			var selector = "[data-share='" + network + "']";
			$(selector).on("click", self["share_" + network].bind(self));
		});
	}

	this.run = function() {
		this.bindEvents();
	}.bind(this)
};
