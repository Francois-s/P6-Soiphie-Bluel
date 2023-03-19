function editIndex(stock) {
    let top_box = document.getElementById('top_box');

    if (stock == "yes") {
        top_box.classList.remove('invisibleb');
    } else {
        top_box.classList.add('invisibleb');
    }
}

function is_co() {
    if (window.localStorage.getItem('isco') == "yes") {
        document.getElementById('loging').innerHTML = "logout";
    } else {
        document.getElementById('loging').innerHTML = "login";
    }
    editIndex(window.localStorage.getItem('isco'));
}

window.onload = function () {
    document.getElementById('loging').addEventListener("click", () => {
        window.localStorage.setItem('isco', 'no');
        is_co();
    });

    is_co();
}

async function getWorks() {

    try {
        let reponse = await fetch("http://localhost:5678/api/works");
        let result = await reponse.json();
        return (result);
    } catch (error) {
        console.log('error', error);
    }
}

async function setWork() {
    let works = await getWorks();
    let card_form = document.getElementById('card_form');

    card_form.innerHTML = '';
    works.forEach((element) => {
        card_form.innerHTML += `<figure>
      <img src="${element.imageUrl}" crossorigin="anonymous" alt="${element.title}" id_category="${element.categoryId}" class="img_card">
      <i class="fa-regular fa-trash-can trash"" id="supp_mg" trash-id="${element.id}"></i>
      <figcaption class="text_card" id_category="${element.categoryId}">éditer</figcaption>
    </figure>`;
    });
    let trash_tab = document.getElementsByClassName("trash");
    for (let inc = 0; inc < trash_tab.length; inc++)
        trash_tab[inc].addEventListener("click", () => {
            trashBin(trash_tab[inc].getAttribute("trash-id"));
        });
}

function prevPage() {
    document.getElementById('card_block').classList.remove('invisible');
    document.getElementById('card_block2').classList.add('invisible');

    setWork();
}

function trashBin(stk) {
    fetch("http://localhost:5678/api/works/" + stk, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("data")).token,
        },
    })
        .then((response) => {
            console.log(response);
            setWork();
            displayCategorie(0);
        })
        .catch((err) => console.log(err, "error fetch"));
}

function overlayClear() {
    let overlay = document.getElementById('overlay');
    enableScroll();
    overlay.classList.add("invisible");

}

function clearMode() {
    let overlay = document.getElementById('overlay');
    let card_block1 = document.getElementById('card_block');

    if (overlay.getAttribute('idx') == 0) {

        overlay.classList.remove("invisible");
        overlay.setAttribute("idx", 1);
        if (card_block1.getAttribute('idx') == 1) {
            card_block1.classList.remove('invisible');
            document.getElementById('card_block2').classList.add('invisible');
        }
    } else {
        overlay.classList.add("invisible");
        overlay.setAttribute("idx", 0);
    }
    setWork();
}

document.getElementById("img_upload").addEventListener("change", () => {
    let output = document.getElementById("rendu-upload");
    output.style.zIndex = "1";
    console.log(event.target.files[0]);
    output.src = URL.createObjectURL(event.target.files[0]);
    output.addEventListener("load", function () {
        URL.revokeObjectURL(output.src);
    });
});

document.getElementById('edition-mode').addEventListener("click", clearMode);
document.getElementById('prev1').addEventListener("click", prevPage);
document.getElementById('card_close2').addEventListener("click", clearMode);

document.getElementById('button_gallery').addEventListener("click", () => {
    let card_block1 = document.getElementById('card_block');

    document.getElementById('card_block2').classList.remove("invisible");
    card_block1.classList.add("invisible");
    card_block1.setAttribute('idx', 1);
});

document.getElementById('card_close').addEventListener("click", () => {
    let overlay = document.getElementById('overlay');

    if (overlay.getAttribute('idx') == 0) {
        overlay.classList.remove("invisible");
        overlay.setAttribute("idx", 1);
    } else {
        overlay.classList.add("invisible");
        overlay.setAttribute("idx", 0);
    }
    setWork();
});

document.getElementById("form_gallery").addEventListener("submit", (resp) => {
    resp.preventDefault();

    const data = new FormData();
    data.append("image", resp.target.img_upload.files[0]);
    data.append("title", resp.target.title_form.value);
    data.append("category", Number(resp.target.categrory_form.value));

    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            accept: "application/json",
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("data")).token,
        },
        body: data,
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            prevPage();
            document.getElementById("rendu-upload").style.zIndex = "-1";
            document.getElementById("button_gallery_2").style.backgroundColor = "#A7A7A7";
            resp.target.title_form.value = "";
            resp.target.categrory_form.value = "";
            displayCategorie(0);
        })
        .catch((err) => console.log(err, "error fetch"));
});

document.getElementById("form_gallery").addEventListener("input", () => {
    colorbtn = document.getElementById("button_gallery_2");
    if (document.getElementById("form_gallery").checkValidity()) {
        colorbtn.style.cursor = "pointer";
        colorbtn.style.backgroundColor = "#1D6154";
    } else
        colorbtn.style.backgroundColor = "#A7A7A7";
})

editIndex();