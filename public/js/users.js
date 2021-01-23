$(document).ready(() => {
  $(document).on("click", "#submitBtn", addUser);
  $(document).on("click", ".delete-btn", deleteUser);

  function addUser(event) {
    event.preventDefault();
    const name = $("#username").val();
    const obj = { user: name };

    $.post("/api/users", obj).then(location.reload());
  }

  function deleteUser(event) {
    event.preventDefault();
    const id = $(this).data("id");

    $.ajax({
      method: "DELETE",
      url: "/api/users/delete/" + id
    }).then(location.reload());
  }
});
