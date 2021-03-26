fetch("../../../HTML/components/sidebar.html")
.then(response => {
  return response.text()
})
.then(data => {
  //console.log(data);
  document.getElementById("side-bar-container").innerHTML = data;
}).then(()=>{
    elms = document.getElementById("side-bar-container").getElementsByTagName("li")
    for (var i = 0; i < elms.length; i++) {
      console.log(elms[i].id)
      if(elms[i].id == "equipment")
      {
          console.log(elms[i])
          elms[i].classList.add("page-selected")
      }
    }
});


