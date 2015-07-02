var ChxGithubPreUtility = window.ChxGithubPreUtility = window.ChxGithubPreUtility || {};

ChxGithubPreUtility.KeydownEvent = (function() {
    var KeydownEvent = {};

    KeydownEvent.startWrap = function(key_code) {
        $(window).keydown(function(e){
            if (e.keyCode == key_code) {
                ChxGithubPreUtility.Dom.wrap();
            }

            return true;
        });
    };

    KeydownEvent.startCollapse = function(key_code, char_length) {
        $(window).keydown(function(e){
            if (e.keyCode == key_code) {
                ChxGithubPreUtility.Dom.collapse(char_length);
            }

            return true;
        });
    };

    return KeydownEvent;
})();

ChxGithubPreUtility.Dom = (function() {
    function toggleCss(element, class_name) {
        $(element).toggleClass(class_name);
    }

    var Dom = {};

    Dom.wrap = function() {
        var class_name = "chrome_extension_pre_wrap";
        toggleCss("pre", class_name);
        toggleCss("code", class_name);
    };

    Dom.collapse = function(char_length) {
        var class_name = "chrome_extension_pre_collapse";
        toggleCss("pre", class_name);

        // TODO: not toggle
        $(".chrome_extension_pre_collapse").collapser({
            mode: "chars",
            truncate: char_length
        });
    };

    return Dom;
})();

ChxGithubPreUtility.LocalStorage = (function() {
    function LocalStorage() {
        this.info = {};
        this.info.collapse_char_length = 80;
        this.info.wrap_key_code        = 82; // r key
        this.info.collapse_key_code    = 84; // t key
        this.auto_wrap                 = false;
        this.auto_collapse             = false;
    }

    LocalStorage.prototype.toObject = function() {
        return this.info;
    };

    LocalStorage.prototype.getConfig = function(callback) {
        var that = this;

        chrome.runtime.sendMessage({method: "getLocalStorage", key: "config"}, function(res) {
            if (!res || !res.data) {
                callback(null);
                return;
            }

            var config = JSON.parse(res.data);
            if (!config) {
                callback(null);
                return;
            }

            var length = config.collapse_char_length;
            if (length && 0 < length) {
                that.info.collapse_char_length = length;
            }

            var wrap_key = config.wrap_key_code;
            if (wrap_key && 0 < wrap_key) {
                that.info.wrap_key_code = wrap_key;
            }

            var collapse_key = config.collapse_key_code;
            if (collapse_key && 0 < collapse_key) {
                that.info.collapse_key_code = collapse_key;
            }

            callback(null);
        });
    };

    LocalStorage.prototype.getWrap = function(callback) {
        var that = this;

        chrome.runtime.sendMessage({method: "getLocalStorage", key: "wrap"}, function(res) {
            if (res.data != "manual") {
                that.info.auto_wrap = true;
            }

            callback(null);
        });
    };

    LocalStorage.prototype.getCollapse = function(callback) {
        var that = this;

        chrome.runtime.sendMessage({method: "getLocalStorage", key: "collapse"}, function(res) {
            if (res.data != "manual") {
                that.info.auto_collapse = true;
            }

            callback(null);
        });
    };

    return LocalStorage;
})();

ChxGithubPreUtility.Controller = (function() {
    var Controller = {};
    var storage    = new ChxGithubPreUtility.LocalStorage();

    Controller.run = function() {
        storage.getConfig(function(err) {
            if (err) {
                return;
            }

            ChxGithubPreUtility.KeydownEvent.startWrap(storage.toObject().wrap_key_code);
            ChxGithubPreUtility.KeydownEvent.startCollapse(storage.toObject().collapse_key_code, storage.toObject().collapse_char_length);

            storage.getWrap(function(wrap_err) {
                if (wrap_err) {
                    return;
                }

                if (storage.toObject().auto_wrap) {
                    ChxGithubPreUtility.Dom.wrap();
                }
            });
            storage.getCollapse(function(collapse_err) {
                if (collapse_err) {
                    return;
                }

                if (storage.toObject().auto_collapse) {
                    ChxGithubPreUtility.Dom.collapse();
                }
            });
        });
    };

    return Controller;
})();
