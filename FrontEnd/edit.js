function editIndex() {
    let top_box = document.getElementById('top_box');
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
      <i class="fa-regular fa-trash-can trash" id="supp_mg " trash-id="${idx}"></i>
      <figcaption class="text_card" id_category="${element.categoryId}">éditer</figcaption>
    </figure>`;
    });
}

function trashBin(stk) {
    console.log(stk);
}

function trash_call() {
    const trash_table = document.getElementById("card_form").getElementsByTagName("i");

    console.log(trash_table);
    console.log("coucouc1");
    for (let stk = 0; stk < trash_table.length; stk++) {
        console.log("coucou");
        trash_table[stk].addEventListener("click", () => {
            trashBin(stk);
            console.log("coucou");
        });
    }
}

document.getElementById('edition-mode').addEventListener("click", () => {
    let overlay = document.getElementById('overlay');

    if (overlay.getAttribute('idx') == 0) {
        overlay.classList.remove("invisible");
        overlay.setAttribute("idx", 1);
    } else {
        overlay.classList.add("invisible");
        overlay.setAttribute("idx", 0);
    }
    setWork();
    trash_call();
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

editIndex();