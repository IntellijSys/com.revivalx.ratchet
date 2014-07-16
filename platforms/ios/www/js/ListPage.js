currentPage = {};
currentPage.init = function() {
    console.log("ListPage :: init");
    listUsers();
};
currentPage.loadPage = function(pageIndex) {
    console.log("ListPage :: loadPage :: pageIndex: " + pageIndex);
    $("body").load(path + "pages/" + pageIndex + ".html");
    $.getScript(path + "js/" + pageIndex + ".js", function() {
        if (currentPage.init) {
            currentPage.init();
        }
    });
};
currentPage.detailPage = function(userId) {
    sessionStorage.setItem("userId", userId);
    $("body").load(path + "pages/DetailPage.html");
    $.getScript(path + "js/DetailPage.js", function() {
        if (currentPage.init) {
            currentPage.init();
        }
    });
};
 
function listUsers() {
    $.ajax({
        type: "get",
        url: "http://demo.revivalx.com/worklight/get_all_users.php",
        dataType: "json",
        success: function(data) {
            var ul = $('#userList');
            var html = '';
            $.each(data.users, function(index, item) {
                html += '<li class="table-view-cell">';
                html += '<a class="navigate-right" onclick="currentPage.detailPage(' + item.userId + ');" >';
                html += item.name;
                html += '</a></li>';
            });
            ul.append(html);
        },
        error: function() {
            alert("List user failure");
        }
    });
}