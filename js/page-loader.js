fetch("../../../HTML/components/sidebar.html")
.then(response => {
  return response.text()
})
.then(data => {
  //console.log(data);
  document.getElementById("side-bar-container").innerHTML = data;
}).then(()=>{
    elms = document.getElementById("side-bar-container").getElementsByTagName("li")
    title = document.getElementsByTagName("title")[0];
    console.log(title.id)
    for (var i = 0; i < elms.length; i++) {
      if(elms[i].id == title.id)
      {
          console.log(elms[i])
          elms[i].classList.add("page-selected")
      }
    }
});


fetch("../../../HTML/components/navbar.html")
.then(response => {
  return response.text()
})
.then(data => {
  //console.log(data);
  document.getElementById("nav-bar-container").innerHTML = data;
});

