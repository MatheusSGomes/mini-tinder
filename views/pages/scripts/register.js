function imgUser() {
  const btnUpload = document.querySelector('#upload-button')
  const imagemUsuario = document.querySelector('.imagem-usuario')

  btnUpload.addEventListener('change', (event) => {
    imagemUsuario.style.backgroundImage = `url('${URL.createObjectURL(event.target.files[0])}')`
  })
}

imgUser()

/* FUNÇÃO MUDAR COR BOTÃO SEXO */
function changeRadioButtonColor() {
  const buttons = document.querySelectorAll('label')

  function handleLink(event) {
    buttons.forEach((btn) => {
      btn.classList.remove('active')
    })
  
    event.currentTarget.classList.add('active')
  }
  
  buttons.forEach((button) => {
    button.addEventListener('click', handleLink)
  })
}

changeRadioButtonColor()