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
    works.forEach(element => {
        console.log({ works, element });
        card_form.innerHTML += `<figure>
      <img src="${element.imageUrl}" crossorigin="anonymous" alt="${element.title}" id_category="${element.categoryId}" class="img_card">
      <figcaption id_category="${element.categoryId}">éditer</figcaption>
    </figure>`;
    });
}

document.getElementById('edition-mode').addEventListener("click", () => {
    let overlay = document.getElementById('overlay');

    console.log("coucou");
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