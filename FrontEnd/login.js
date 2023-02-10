document.querySelector("#envoyer").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then((response) => response.json()).then((response) => {
      console.log(response);
      console.log("coucou");
    })
    .catch(function (err) {
      console.log({error:err});
      alert("Erreur System");
    });
});