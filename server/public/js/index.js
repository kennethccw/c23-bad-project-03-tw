window.onload = async () => {
  const registerAc = document.querySelector('.create-account-container')
  registerAc.addEventListener('click', (e) => {
    window.location = '/register.html'
  })
  const loginAc = document.querySelector('#loginAc')
  loginAc.addEventListener('click', (e) => {
    window.location = '/login.html'
  })
}