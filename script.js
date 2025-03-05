let imgElement;
let scale = 1;
let rotation = 0;

document.getElementById("drop-zone").addEventListener("dragover", (e) => {
    e.preventDefault();
});

document.getElementById("drop-zone").addEventListener("drop", (e) => {
    e.preventDefault();
    let file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
        let reader = new FileReader();
        reader.onload = (event) => {
            let container = document.getElementById("image-container");
            container.innerHTML = "";
            imgElement = document.createElement("img");
            imgElement.src = event.target.result;
            imgElement.style.width = "694px";
            imgElement.style.height = "1000px";
            container.appendChild(imgElement);
            scale = 1;
            rotation = 0;
            updateTransform();
        };
        reader.readAsDataURL(file);
    }
});

function zoomIn() {
    if (imgElement) {
        scale += 0.1;
        updateTransform();
    }
}

function zoomOut() {
    if (imgElement && scale > 0.1) {
        scale -= 0.1;
        updateTransform();
    }
}

function rotate180() {
    if (imgElement) {
        rotation += 180;
        updateTransform();
    }
}

function rotateRight() {
    if (imgElement) {
        rotation += 90;
        updateTransform();
    }
}

function rotateLeft() {
    if (imgElement) {
        rotation -= 90;
        updateTransform();
    }
}

function updateTransform() {
    imgElement.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
}

// Atualiza a página ao sair e voltar para a aba
window.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        location.reload();
    }
});
