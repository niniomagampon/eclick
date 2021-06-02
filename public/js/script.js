let catValue = ""

function changeVal(){
  catValue = document.querySelector("#productCategory").value
}

function gotoCat(){
  if(catValue === "all" || catValue === ""){
    window.location = `/products/all`
  }
  else{
  window.location = `/products/category/${catValue}`
  }
}   