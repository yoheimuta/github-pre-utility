function save(key, value) {
    localStorage[key] = value;
}

function restore(key) {
    var selected_value = localStorage[key];
    return selected_value;
}

function set(value, selector) {
    if (!value) {
        return;
    }

    selector.val(value);
}

$(function(){
    set(restore("wrap")     , $("[name=wrap]"));
    set(restore("collapse") , $("[name=collapse]"));

    var config = JSON.parse(restore("config"));
    if (config) {
        set(config.collapse_char_length , $("#collapse_char_length"));
        set(config.wrap_key_code        , $("#wrap_key_code"));
        set(config.collapse_key_code    , $("#collapse_key_code"));
    }
});

$("#save").click(function() {
    save("wrap"     , $("[name=wrap] option:selected").val());
    save("collapse" , $("[name=collapse] option:selected").val());

    var config = {
        collapse_char_length : $("#collapse_char_length").val(),
        wrap_key_code        : $("#wrap_key_code").val(),
        collapse_key_code    : $("#collapse_key_code").val()
    };
    save("config", JSON.stringify(config));

    // Update status to let user know options were saved.
    var status = $("#status");
    status.html("Options Saved.");
    setTimeout(function() {
        status.html("");
    }, 2000);
});
