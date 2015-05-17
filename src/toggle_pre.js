window.ChromeExtensionPreWrap = {

  keydownEvent: function() {

    $(window).keydown(function(e){
        // r key
        if (e.keyCode != 82) {
            return true;
        }

        toggleCss("pre");
        toggleCss("code");

        return true;
    });

    function toggleCss(element) {
        $(element).toggleClass("chrome_extension_pre_wrap");
    }
  }
};

ChromeExtensionPreWrap.keydownEvent();
