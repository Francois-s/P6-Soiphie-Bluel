function is_co() {
  if (window.localStorage.getItem('isco') == "yes") {
    document.getElementById('log').innerHTML = "logout";
  } else {
    document.getElementById('log').innerHTML = "login";
  }
}
document.getElementById('log').addEventListener("click", () => {
  window.localStorage.setItem('isco', 'no');
  is_co();
});

is_co();

document.querySelector("#envoyer").addEventListener("click", () => {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then((response) => response.json()).then((response) => {
    if (!response.userId && response.message) {
      window.localStorage.setItem('isco', 'no');
      alert(" informations utilisateur incorrectes");
    } else if (response.userId) {
      window.localStorage.setItem('isco', 'yes');
      window.location.replace("./index.html");
      window.localStorage.setItem("data", JSON.stringify(response))
    } else {
      window.localStorage.setItem('isco', 'no');
      alert("Mot de passe incorrecte");
    }
    is_co();
  })
    .catch(function (err) {
      console.log({ error: err });
      alert("Erreur System");
    });
});


