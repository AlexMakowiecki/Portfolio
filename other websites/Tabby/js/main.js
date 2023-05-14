const navigation = document.getElementsByClassName("navigation")[0];
const navigationTabs = navigation.querySelectorAll(".tab");
const content = document.getElementsByClassName("content")[0];

let previousTab = navigation.querySelector(".eIsSelected");
let previousTabTarget = document.getElementById(previousTab.dataset.target);

navigation.addEventListener("click", (e) => {
  const tab = e.target;
  const tabTarget = document.getElementById(tab.dataset.target);
  previousTab.classList.remove("eIsSelected");
  previousTabTarget.classList.remove("eIsSelected");
  tab.classList.add("eIsSelected");
  tabTarget.classList.add("eIsSelected");
  previousTab = tab;
  previousTabTarget = tabTarget;
})

/*
Array.from(navigationTabs).forEach(tab => {
  tab.addEventListener("click", () =>{
    previousSelectedTab.classList.remove("eIsSelected");
    previousSelectedTabTarget.classList.remove("eIsSelected");
    let currentSelectedTab = tab;
    currentSelectedTab.classList.add("eIsSelected");
    let currentSelectedTabTarget = document.getElementById(currentSelectedTab.dataset.target);
    currentSelectedTabTarget.classList.add("eIsSelected");
    previousSelectedTab = currentSelectedTab;
    previousSelectedTabTarget = currentSelectedTabTarget;
  })
});
*/