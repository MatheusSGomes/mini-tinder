function popUpEntrar() {
  const entrarPopUp = document.querySelector('.entrar')
  const btnEntrar = document.querySelector('#btn-entrar')
  const boxEntrar = document.querySelector('.box-entrar')

  btnEntrar.addEventListener('click', (event) => {
    entrarPopUp.style.display = 'flex'
    
    entrarPopUp.addEventListener('click', (event) => {
      if(event.target.classList.contains('entrar')) {
        entrarPopUp.style.display = 'none'
      } 
    })
  })
}

popUpEntrar()

