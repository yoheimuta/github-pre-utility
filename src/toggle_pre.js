var ChromeExtensionPreWrap = window.ChromeExtensionPreWrap = window.ChromeExtensionPreWrap || {};

ChromeExtensionPreWrap.KeydownEvent = (function() {
    $(window).keydown(function(e){
        // r key
        if (e.keyCode == 82) {
            wrap();
        }
        // t key
        if (e.keyCode == 84) {
            collapse();
        }

        return true;
    });

    function wrap() {
        var class_name = "chrome_extension_pre_wrap";
        toggleCss("pre", class_name);
        toggleCss("code", class_name);
    }

    function collapse() {
        var class_name = "chrome_extension_pre_collapse";
        toggleCss("pre", class_name);

        // TODO: not toggle
        $(".chrome_extension_pre_collapse").collapser({
            mode: "chars",
            truncate: 80
        });
    }

    function toggleCss(element, class_name) {
        $(element).toggleClass(class_name);
    }
})();
