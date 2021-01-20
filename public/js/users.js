/* eslint-disable */

$(document).ready(() => {
    $(document).on("click","#submitBtn",addUser);
    $(document).on("click",".delete-btn",deleteUser);

    function addUser(event) {
        event.preventDefault();
        const name = $("#username").val();
        const obj = { user : name};

        $.post("/api/users",obj)
        .then(location.reload());
    };

    function deleteUser() {
        alert("delete me");
    };
});
