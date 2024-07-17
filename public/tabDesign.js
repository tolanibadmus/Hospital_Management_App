function openRecordTab(tabButton, tabName) {
  let tabContents, tabLinks;

  tabContents = document.getElementsByClassName("tab-pane");
  
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].style.display = "none";
  }

  tabLinks = document.getElementsByClassName("vert-tab-button");

  for (let i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace("active", "");
  }

  document.getElementById(tabName).style.display = "block";

  document.getElementById(tabButton).classList.add('active');
}


function switchPatientDetailTab(tabButton, tabName) {
  let tabContents, tabLinks;

  tabContents = document.getElementsByClassName("tab-panel");

  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].style.display = "none";
  }

  tabLinks = document.getElementsByClassName("tab-button");

  for (let i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace("active", "");
  }

  document.getElementById(tabName).style.display = "block";

  document.getElementById(tabButton).classList.add('active');
}