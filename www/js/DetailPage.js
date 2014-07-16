currentPage = {};
currentPage.init = function() {
    console.log("DetailPage :: init");
    detailUser();
};
currentPage.back = function() {
    console.log("DetailPage :: back");
    $("body").load(path + "pages/ListPage.html", function() {
        $.getScript(path + "js/ListPage.js", function() {
            if (currentPage.init) {
                currentPage.init();
            }
        });
    });
};
currentPage.edit = function() {
    console.log("DetailPage :: edit");
    var userId = sessionStorage.userId;
    var name = $("#name").val();
    var officeNumber = $("#officeNumber").val();
    var phoneNumber = $("#phoneNumber").val();
    var email = $("#email").val();
    formData = {
        userId: sessionStorage.userId,
        name: $("#name").val(),
        officeNumber: $("#officeNumber").val(),
        phoneNumber: $("#phoneNumber").val(),
        email: $("#email").val()
    }
    if (name == "") {
        alert("Please enter name");
    } else if (officeNumber == "") {
        alert("Please enter office number");
    } else if (phoneNumber == "") {
        alert("Alert", "Please enter phone number");
    } else if (email == "") {
        alert("Alert", "Please enter email");
    } else {
        $.ajax({
            type: "get",
            url: "http://demo.revivalx.com/worklight/update_user.php",
            data: formData,
            dataType: "json",
            success: function(data) {
                alert("Edit user success");
                $("body").load(path + "pages/ListPage.html", function() {
                    $.getScript(path + "js/ListPage.js", function() {
                        if (currentPage.init) {
                            currentPage.init();
                        }
                    });
                });
            },
            error: function() {
                alert("Edit user failure");
            }
        });
    }
};
 
function detailUser() {
    formData = {
        userId: sessionStorage.userId
    }
    $.ajax({
        type: "get",
        url: "http://demo.revivalx.com/worklight/get_user_details.php",
        data: formData,
        dataType: "json",
        success: function(data) {
            $('#name').val(data.user[0].name);
            $('#officeNumber').val(data.user[0].officeNumber);
            $('#phoneNumber').val(data.user[0].phoneNumber);
            $('#email').val(data.user[0].email);
        },
        error: function() {
            alert("Detail user failure");
        }
    });
}
currentPage.remove = function() {
    console.log("DetailPage :: delete");
    deleteUser();
};
 
function deleteUser() {
    formData = {
        userId: sessionStorage.userId
    }
    $.ajax({
        type: "get",
        url: "http://demo.revivalx.com/worklight/delete_user.php",
        data: formData,
        dataType: "json",
        success: function(data) {
            alert("Delete user success");
            $("body").load(path + "pages/ListPage.html", function() {
                $.getScript(path + "js/ListPage.js", function() {
                    if (currentPage.init) {
                        currentPage.init();
                    }
                });
            });
        },
        error: function() {
            alert("Delete user failure");
        }
    });
}