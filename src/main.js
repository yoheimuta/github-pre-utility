var ChxGithubPreUtility = window.ChxGithubPreUtility = window.ChxGithubPreUtility || {};

ChxGithubPreUtility.KeydownEvent = (function() {
    var KeydownEvent = {};

    KeydownEvent.startWrap = function() {
        $(window).keydown(function(e){
            // r key
            if (e.keyCode == 82) {
                ChxGithubPreUtility.Controller.wrap();
            }

            return true;
        });
    };

    KeydownEvent.startCollapse = function() {
        $(window).keydown(function(e){
            // t key
            if (e.keyCode == 84) {
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

        chrome.runtime.sendMessage({method: "getLocalStorage", key: "wrap"}, function(res) {
            if (res.data == "auto") {
                that.wrap();
            } else {
                ChxGithubPreUtility.KeydownEvent.startWrap();
            }
        });

        chrome.runtime.sendMessage({method: "getLocalStorage", key: "collapse_char_length"}, function(res) {
            var length = res.data;
            if (length && 0 < length) {
                collapse_char_length = length;
            }

            chrome.runtime.sendMessage({method: "getLocalStorage", key: "collapse"}, function(res) {
                if (res.data == "auto") {
                    that.collapse();
                } else {
                    ChxGithubPreUtility.KeydownEvent.startCollapse();
                }
            });
        });
    };

    return Controller;
})();
