async function getWorks() {
  try {
    let reponse = await fetch("http://localhost:5678/api/works");
    let result = await reponse.json();
    return (result);
  } catch (error) {
    console.log('There was an error', error);
  }
}

async function getCategories() {
  try {
    let reponse = await fetch("http://localhost:5678/api/categories");
    let result = await reponse.json();
    return (result);
  } catch (error) {
    console.log('There was an error', error);
  }
}

async function displayCategorie(stk) {
  let gallery_stock = document.getElementById("gallery");
  let works = await getWorks();


  gallery_stock.innerHTML = "";
  console.log(works);
  works.forEach(element => {
    console.log({ works, element });
    if (stk == 0 || element.categoryId == stk) {
      gallery_stock.innerHTML += `<figure>
      <img src="${element.imageUrl}" crossorigin="anonymous" alt="${element.title}" id_category="${element.categoryId}">
      <figcaption id_category="${element.categoryId}">${element.title}</figcaption>
    </figure>`;
    }
  });
}

function colorButton(stk) {
  let categories = document.getElementById('categories');
  document.getElementById('btn_' + categories.getAttribute('last_pos')).classList.remove('active_button');
  categories.setAttribute('last_pos', stk);
  let bt = document.getElementById('btn_' + stk);
  bt.classList.add('active_button');

  displayCategorie(stk);
}

function setIntoIndex(categories, works) {
  let gallery_stock = document.getElementById("gallery");
  let categories_stock = document.getElementById("categories");

  works.forEach(element => {
    gallery_stock.innerHTML += `<figure>
      <img src="${element.imageUrl}" crossorigin="anonymous" alt="${element.title}" id_category="${element.categoryId}">
      <figcaption id_category="${element.categoryId}">${element.title}</figcaption>
    </figure>`;
  });
  categories_stock.innerHTML += `<button class="active_button" id="btn_0" class="btn">Tous</button>`
  categories.forEach(element => {
    categories_stock.innerHTML += `<button id="btn_${element.id}" class="btn">${element.name}</button>`
  });

  const btn_table = categories_stock.getElementsByTagName("button");

  for (let stk = 0; stk < btn_table.length; stk++) {
    btn_table[stk].addEventListener("click", () => {
      colorButton(stk);
    });
  }
}

async function getInfos() {
  let categories = await getCategories();
  let works = await getWorks();

  setIntoIndex(categories, works);
}

getInfos();
