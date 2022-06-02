// API ni o'zgaruvchiga yuklab olish
let FetchApi = "https://newsapi.org/v2/everything?apiKey=23b7a8c33c5841c8acaaca94327ff30f&q=apple&sortBy=relevancy";

// Form elementlarini chaqirib olish
let elForm = $(".form")
let elSearchInput = $(".search-input", elForm);
let elSortBySelect = $(".sort-by-select", elForm);

// Result listni chaqirish
let elResultList = $(".hero-result-list");

// Templateni chaqirish
let elTemplate = $("#template").content;
let elModalTemplate = $("#modal-template").content;

// Apini fetch qilish
let callFetchApi = function(api){
  fetch(api).then(function(response){
    return response.json();
  }).then(function(data){
    console.log(data.articles);
    renderNews(data.articles)
    return data.articles;
  })
}
callFetchApi(FetchApi);

// Formni eshitish va value larni olish
elForm.addEventListener("submit", function(e){
  e.preventDefault();

  let search = elSearchInput.value.trim();
  let sortBy = elSortBySelect.value;

  let putValueApi = function(api){
    if(!search == ""){
      let api = `https://newsapi.org/v2/everything?q=${search}&sortBy=${sortBy}&apiKey=23b7a8c33c5841c8acaaca94327ff30f`;
      return api;
    }else{
      api = FetchApi;
      return api;
    }
  }
  callFetchApi(putValueApi(FetchApi));
})

// Templatedan clon olib li yaratish
let renderNews = (news) => {
  let elResultFragment = document.createDocumentFragment();
  let createNewsItem = (onlyNew) => {
    elResultList.innerHTML = "";

    let elNewLi = elTemplate.cloneNode(true);
    let elNewModal = elModalTemplate.cloneNode(true);

    $(".news-img", elNewLi).src = onlyNew.urlToImage;
    $(".news-img", elNewLi).alt = onlyNew.title;
    $(".title", elNewLi).textContent = onlyNew.title;
    $(".author", elNewLi).textContent = onlyNew.author;
    $(".date", elNewLi).textContent = onlyNew.publishedAt.split("T").splice(0, 1);
    $(".source",elNewLi).href = onlyNew.url;
    $(".content", elNewLi).textContent = onlyNew.content.split("[").shift();
    $(".more-btn", elNewLi).setAttribute("data-bs-target", `#exampleModal${onlyNew.publishedAt.split(":").shift()}`);

    $(".more-modal", elNewModal).id = `exampleModal${onlyNew.publishedAt.split(":").shift()}`
    $(".title", elNewModal).textContent = onlyNew.title;
    $(".description", elNewModal).textContent = onlyNew.description;
    elNewLi.appendChild(elNewModal);
    return elNewLi;
  }

  news.forEach ((onlyNew) => {
    elResultFragment.appendChild(createNewsItem(onlyNew));
  })

  elResultList.appendChild(elResultFragment);
}