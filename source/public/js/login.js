const form = document.getElementById("loginForm")

form.addEventListener("submit", evt => {
    evt.preventDefault()

    const data = new FormData(form)
    const obj = {}
    data.forEach((value, key) => obj[key] = value)

    fetch("/api/session/login", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(result=>{
        if(result.status === 200) window.location.href = "/api/products"
    })
})