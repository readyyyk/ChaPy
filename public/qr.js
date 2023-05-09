const qrModal = new bootstrap.Modal("#qr-modal")
new QRCode(document.getElementById("qr"), {
    text: document.location.toString(),
    width: 256,
    height: 256,
    colorDark : "#000",
    colorLight : "#fff",
    correctLevel : QRCode.CorrectLevel.H
});
const toggleQr = () => qrModal.toggle()
