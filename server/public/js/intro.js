window.onload = () => {
  skipPage()
  // nextPage()
}


function skipPage() {
  const skipBtn = document.querySelector(".skip-container")
  skipBtn.addEventListener(
  "click",
  (e) => {
    const button = e.target
    document.querySelector(".intro-1").hidden = true;
    document.querySelector(".intro-2").hidden = false;
    document.querySelector('.dot-col-1').setAttribute('style', "background-color: #CCCCCC")
    document.querySelector('.dot-col-2').setAttribute('style', "background-color: #000000")
    if (skipBtn.dataset.count === '1') {
      console.log('clicked again')
      window.location = '/moodLogSelection.html'
    }
    skipBtn.setAttribute('data-count', '1')
  }
);
}
// function nextPage() {
//   document.querySelector(".skip-container").addEventListener(
//   "click",
//   (e) => {
//     const button = e.target
//     if (button.dataset.count === 1) {
//       window.location = '/moodLogSelection'
//     }
//   },false
// );
// }