function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

window.onload = function () {
  var appParam = getParameterByName("app");
  var loadingBar = document.getElementById("loadingBar");
  var modalDiv = document.getElementById("modal");

  if (appParam === "true") {
    loadingBar.style.width = "100%";
    setTimeout(function () {
      window.location.href = "../lottery-draw/";
    }, 500);
  } else {
    modalDiv.style.display = "flex";
  }

  document.getElementById("closeModal").addEventListener("click", function () {
    window.location.href = "../lottery-blank/";
  });
};
