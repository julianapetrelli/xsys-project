// galery image

document.addEventListener("click",function (e){
    if(e.target.classList.contains("gallery-item")){
        const src = e.target.getAttribute("src");
        document.querySelector(".modal-img").src = src;

        const myModal = new bootstrap.Modal(document.getElementById('gallery-modal'));
        myModal.show();
    }
})


// comments

const content = document.getElementById("content");
const cardTemplate = document.getElementById("card-template");

loadComments(true);

// comment button

const button = document.getElementById("loadAllComments");
const buttonArea = document.querySelector(".button-comments");

button.addEventListener("click", function (event) {
    event.preventDefault();

    loadComments(false);
});


function loadComments(showOnLoad) {
    database.forEach(function (card) {
        
        if (!card.showOnLoad === showOnLoad) {
            return
        }

        let cardClone = document.importNode(cardTemplate.content, true);

        cardClone.querySelector("#photo").setAttribute('src', card.photo);
        cardClone.querySelector("#name").textContent = card.name;
        cardClone.querySelector("#comment").textContent = card.comment;

        content.appendChild(cardClone);
    });

    if (!showOnLoad) {
        buttonArea.classList.add("hidden");
    }
}

// Netlify

const handleSubmit = (e) => {
    e.preventDefault();
    
    let form = document.getElementById('contact-form');
    let formData = new FormData(form);

    let formDataObject = {};
    formData.forEach((value, key) => {
        formDataObject[key] = value;
    });

    if (formDataObject.email === '' || formDataObject.message === '') {
        alert('Preencha todos os campos');
        return;
    }
    
    fetch('/', {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
    }).then(() => {
        alert('Formulario Enviado com Successo!')
        form.getElementsByTagName('input')[0].value = '';
        form.getElementsByTagName('textarea')[0].value = '';
    }).catch((error) => console.error(error))
}

document.getElementById("submit").addEventListener("click", handleSubmit);
