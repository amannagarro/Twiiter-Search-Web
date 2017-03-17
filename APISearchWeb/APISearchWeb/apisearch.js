var keyword;

function redirectToSearchResult(){
  keyword = document.getElementById("keywordTextbox").value;
  location.href = "searchResult.html?&keyword="+keyword;
}

function redirectToSearchResult(){
    location.href = "searchResult.html?&keyword="+keyword;
}
