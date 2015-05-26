var ChxGithubPreUtility = window.ChxGithubPreUtility = window.ChxGithubPreUtility || {};

ChxGithubPreUtility.KeydownEvent = (function() {
    var KeydownEvent = {};

    KeydownEvent.startWrap = function(key_code) {
        $(window).keydown(function(e){
            if (e.keyCode == key_code) {
                ChxGithubPreUtility.Controller.wrap();
            }

            return true;
        });
    };

    KeydownEvent.startCollapse = function(key_code) {
        $(window).keydown(function(e){
            if (e.keyCode == key_code) {
                ChxGithubPreUtility.Controller.collapse();
            }

            return true;
        });
    };

    return KeydownEvent;
})();

ChxGithubPreUtility.Controller = (function() {
    function toggleCss(element, class_name) {
        $(element).toggleClass(class_name);
    }

    var Controller = {};
    var collapse_char_length = 80;

    // r key
    var wrap_key_code = 82;

    // t key
    var collapse_key_code = 84;

    Controller.wrap = function() {
        var class_name = "chrome_extension_pre_wrap";
        toggleCss("pre", class_name);
        toggleCss("code", class_name);
    };

    Controller.collapse = function() {
        var class_name = "chrome_extension_pre_collapse";
        toggleCss("pre", class_name);

        // TODO: not toggle
        $(".chrome_extension_pre_collapse").collapser({
            mode: "chars",
            truncate: collapse_char_length
        });
    };

    Controller.run = function() {
        var that = this;

        chrome.runtime.sendMessage({method: "getLocalStorage", key: "config"}, function(res) {
            var config = JSON.parse(res.data);
            if (config) {
                var length = config.collapse_char_length;
                if (length && 0 < length) {
                    collapse_char_length = length;
                }

                var wrap_key = config.wrap_key_code;
                if (wrap_key && 0 < wrap_key) {
                    wrap_key_code = wrap_key;
                }

                var collapse_key = config.collapse_key_code;
                if (collapse_key && 0 < collapse_key) {
                    collapse_key_code = collapse_key;
                }
            }

            chrome.runtime.sendMessage({method: "getLocalStorage", key: "wrap"}, function(res) {
                if (res.data == "auto") {
                    that.wrap();
                } else {
                    ChxGithubPreUtility.KeydownEvent.startWrap(wrap_key_code);
                }
            });

            chrome.runtime.sendMessage({method: "getLocalStorage", key: "collapse"}, function(res) {
                if (res.data == "auto") {
                    that.collapse();
                } else {
                    ChxGithubPreUtility.KeydownEvent.startCollapse(collapse_key_code);
                }
            });
        });
    };

    return Controller;
})();
