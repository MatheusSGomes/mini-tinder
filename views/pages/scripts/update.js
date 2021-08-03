function imgUser() {
  const btnUpload = document.querySelector('#upload-button')
  const imagemUsuario = document.querySelector('.imagem-usuario')

  btnUpload.addEventListener('change', (event) => {
    imagemUsuario.style.backgroundImage = `url('${URL.createObjectURL(event.target.files[0])}')`
  })
}

imgUser()