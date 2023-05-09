const themeToggle = ()=>{
    localStorage.setItem("theme", localStorage.getItem("theme")==="dark"?"light":"dark")
    document.querySelector("html").setAttribute("data-bs-theme", localStorage.getItem("theme"))
}
document.querySelector("html").setAttribute('data-bs-theme', localStorage.getItem('theme'))