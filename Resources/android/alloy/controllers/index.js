function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function onClickPrev() {
        Ti.App.fireEvent("app:prevPage", {});
    }
    function onClickNext() {
        Ti.App.fireEvent("app:nextPage", {});
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "#fff",
        exitOnClose: true,
        navbarHidden: true,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.menu = Ti.UI.createView({
        top: 0,
        height: 40,
        left: 0,
        right: 0,
        layout: "horizontal",
        id: "menu"
    });
    $.__views.index.add($.__views.menu);
    $.__views.btn_prev = Ti.UI.createButton({
        title: "Zurück",
        id: "btn_prev"
    });
    $.__views.menu.add($.__views.btn_prev);
    $.__views.btn_next = Ti.UI.createButton({
        title: "Vor",
        id: "btn_next"
    });
    $.__views.menu.add($.__views.btn_next);
    $.__views.webview = Ti.UI.createWebView({
        top: 40,
        bottom: 0,
        left: 0,
        right: 0,
        id: "webview"
    });
    $.__views.index.add($.__views.webview);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var file = String(Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "index.html").read());
    var pdf = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "pdf.pdf");
    file = file.replace(/pdffile/gi, pdf.nativePath);
    $.btn_next.addEventListener("click", onClickNext);
    $.btn_prev.addEventListener("click", onClickPrev);
    $.webview.html = file;
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;