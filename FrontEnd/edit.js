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
    console.log(window.localStorage.getItem('isco'));
    editIndex(window.localStorage.getItem('isco'));
}

window.onload = function () {
    document.getElementById('loging').addEventListener("click", () => {
        window.localStorage.setItem('isco', 'no');
        is_co();
    });

    is_co();
}

//addEventListener("click", () => {
async function getWorks() {

    try {
        let reponse = await fetch("http://localhost:5678/api/works");
        let result = await reponse.json();
        return (result);
    } catch (error) {
        console.log('There was an error', error);
    }
}

async function setWork() {
    let works = await getWorks();
    let card_form = document.getElementById('card_form');

    card_form.innerHTML = '';
    works.forEach((element, idx) => {
        card_form.innerHTML += `<figure>
      <img src="${element.imageUrl}" crossorigin="anonymous" alt="${element.title}" id_category="${element.categoryId}" class="img_card">
      <i class="fa-regular fa-trash-can trash" onclick="trashBin(${element.id})" id="supp_mg " trash-id="${idx}"></i>
      <figcaption class="text_card" id_category="${element.categoryId}">éditer</figcaption>
    </figure>`;
    });
}

function prevPage() {
    console.log("test");
    let card_block1 = document.getElementById('card_block');
    let card_block2 = document.getElementById('card_block2');


    card_block2.classList.add('invisible');
    card_block1.classList.remove('invisible');
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
        .catch((err) => console.log(err, "fetch error "));
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
        console.log("coucou2");

        overlay.classList.remove("invisible");
        overlay.setAttribute("idx", 1);
        disableScroll();
        if (card_block1.getAttribute('idx') == 1) {
            card_block1.classList.remove('invisible');
            document.getElementById('card_block2').classList.add('invisible');
        }
    } else {
        console.log("coucou");
        overlay.classList.add("invisible");
        overlay.setAttribute("idx", 0);
        enableScroll()
    }
    setWork();
}

document.getElementById("img_upload").addEventListener("change", () => {
    let output = document.getElementById("rendu-upload");
    output.style.zIndex = "1";
    console.log(event.target.files[0]);
    output.src = URL.createObjectURL(event.target.files[0]); //URL that points to the selected file
    output.addEventListener("load", function () {
        URL.revokeObjectURL(output.src); //to revoke the URL created by URL.createObjectURL(this.files[0]) to free memory
    });
});

document.getElementById('edition-mode').addEventListener("click", clearMode);
document.getElementById('prev1').addEventListener("click", prevPage);
document.getElementById('card_close2').addEventListener("click", clearMode);

document.getElementById('button_gallery').addEventListener("click", () => {
    let card_block1 = document.getElementById('card_block');
    let card_block2 = document.getElementById('card_block2');

    card_block1.classList.add("invisible");
    card_block1.setAttribute('idx', 1);
    card_block2.classList.remove("invisible");
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

var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; }
    }));
} catch (e) { }

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';


// call this to Disable
function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

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
            prevPage();
            document.getElementById("rendu-upload").style.zIndex = "-1";
            document.getElementById("button_gallery_2").style.backgroundColor = "#A7A7A7";
            resp.target.title_form.value = "";
            resp.target.categrory_form.value = "";
            displayCategorie(0);
        })
        .catch((err) => console.log(err, "fetch error"));
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