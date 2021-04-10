// Layouts
fetch("../../../HTML/components/sidebar.html")
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    //console.log(data);
    document.getElementById("side-bar-container").innerHTML = data;
  })
  .then(() => {
    elms = document
      .getElementById("side-bar-container")
      .getElementsByTagName("li");
    title = document.getElementsByTagName("title")[0];
    for (var i = 0; i < elms.length; i++) {
      if (elms[i].id == title.id) {
        elms[i].classList.add("page-selected");
      }
    }
  });

fetch("../../../HTML/components/navbar.html")
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    document.getElementById("nav-bar-container").innerHTML = data;
  });

// /**
//  * Load a component into specific element|s using it's query selector.
//  *
//  * @param {String} component Component name
//  * @param {String} selector Container element|s selector
//  */
// function load(component, selector) {
//   fetch(`../../../HTML/components/${component}.html`)
//     .then((response) => {
//       return response.text();
//     })
//     .then((data) => {
//       const containers = document.querySelectorAll(selector);
//       if (containers) {
//         containers.forEach((container) => {
//           container.innerHTML = data;
//         });
//       }
//     })
//     .catch((err) => {
//       console.log(component, err);
//     });
// }

// // all component names to be loaded
// const components = [
//   // Page Headers
//   "page-header-plain",
//   "page-header-btn",
//   "page-header-mm-lh-switch",
//   // Modals
//   "walkthrough-modal-1",
//   "walkthrough-modal-2",
//   "walkthrough-modal-3",
//   "walkthrough-modal-4",
//   // Group cards
//   "group-card-automation-box",
//   "group-card-device-sensors",
//   "group-card-equipment",
//   "group-card-gateway",
//   "group-card-scene",
//   "group-card-sensor",
//   "group-card-gateway-empty",
//   "group-card-device-sensors-empty",
//   // "group-card-sensors-empty-empty",
//   // Buttons
//   "mm-lh-switch-btn-group",
// ];

// // Automatically load every component in "components const" into an element with the same component class name.
// components.forEach(async (component) => {
//   await load(component, `.${component}`);
// });
