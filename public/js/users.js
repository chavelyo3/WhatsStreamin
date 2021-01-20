$(document).ready(() => {
    $(document).on("click","#submitBtn",addUser);
    $(document).on("click",".delete-btn",deleteUser);

    function addUser() {
        const name = $("#username").val();
        alert(name);
    };

    function deleteUser() {
        alert("delete me");
    };
});
