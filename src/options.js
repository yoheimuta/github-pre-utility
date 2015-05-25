function save(key, value) {
    localStorage[key] = value;
}

function restore(key, selector) {
    var selected_value = localStorage[key];
    if (!selected_value) {
        return;
    }

    selector.val(selected_value);
}

$(function(){
    restore("wrap", $("[name=wrap]"));
    restore("collapse", $("[name=collapse]"));
    restore("collapse_char_length", $("#collapse_char_length"));
});

$("#save").click(function() {
    save("wrap", $("[name=wrap] option:selected").val());
    save("collapse", $("[name=collapse] option:selected").val());
    save("collapse_char_length", $("#collapse_char_length").val());

    // Update status to let user know options were saved.
    var status = $("#status");
    status.html("Options Saved.");
    setTimeout(function() {
        status.html("");
    }, 2000);
});
