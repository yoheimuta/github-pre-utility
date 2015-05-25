function save_options(option) {
    var selected_value = $("[name=" + option + "] option:selected").val();
    localStorage[option] = selected_value;
}

function restore_options(option) {
    var selected_value = localStorage[option];
    if (!selected_value) {
        return;
    }

    $("[name=" + option + "]").val(selected_value);
}

$(function(){
    restore_options("wrap");
    restore_options("collapse");
});

$("#save").click(function() {
    save_options("wrap");
    save_options("collapse");

    // Update status to let user know options were saved.
    var status = $("#status");
    status.html("Options Saved.");
    setTimeout(function() {
        status.html("");
    }, 2000);
});
