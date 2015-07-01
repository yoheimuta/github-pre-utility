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

ChxGithubPreUtility.Controller = (function() {
    var Controller = {};
    var collapse_char_length = 80;

    // r key
    var wrap_key_code = 82;

    // t key
    var collapse_key_code = 84;

    Controller.run = function() {

        chrome.runtime.sendMessage({method: "getLocalStorage", key: "config"}, function(res) {
            if (res && res.data) {
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
            }

            chrome.runtime.sendMessage({method: "getLocalStorage", key: "wrap"}, function(res) {
                if (res.data != "manual") {
                    ChxGithubPreUtility.Dom.wrap();
                }
                ChxGithubPreUtility.KeydownEvent.startWrap(wrap_key_code);
            });

            chrome.runtime.sendMessage({method: "getLocalStorage", key: "collapse"}, function(res) {
                if (res.data != "manual") {
                    ChxGithubPreUtility.Dom.collapse(collapse_char_length);
                }
                ChxGithubPreUtility.KeydownEvent.startCollapse(collapse_key_code, collapse_char_length);
            });
        });
    };

    return Controller;
})();
