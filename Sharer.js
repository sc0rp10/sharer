var Sharer = function (options) {
	options = options || {};
	var self = this;

	this._default = {
		"vk": {
			"popup_url": "http://vk.com/share.php?url="
		},
		"fb": {
			"popup_url": "http://fb.com/sharer/sharer.php?u="
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
		var content = meta_title.attr("content");
		var title = content ? " " + content : "";

		this._openPopup(this.config.tw.popup_url + window.location.href + title, "tw");
	}

	this._openPopup = function (url, name) {
		window.open(url, name + ' Share', 'width=620,height=430,resizable=no,scrollbars=no,status=no')
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
