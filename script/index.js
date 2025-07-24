let navList = document.querySelector(".nav > ul");

navList.addEventListener("mouseover", () => {
  navList.querySelectorAll(".submenu").forEach((sub) => {
    sub.style.height = "340px";
  });
  document.getElementById("all_wrap").classList.add("on");
});

navList.addEventListener("mouseout", () => {
  navList.querySelectorAll(".submenu").forEach((sub) => {
    sub.style.height = "0px";
  });
  document.getElementById("all_wrap").classList.remove("on");
});
