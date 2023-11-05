const routes = ["login-page", "watch-page"]

function resetRouter() {
    routes.forEach((route) => {
        page = document.querySelector(`.${route}`)
        page.style.display = "none"
    })
}

function setRouter(routerName) {
    if (!routerName in routes) {
        console.log("Router invalid!")
        return false
    }

    resetRouter()
    pageSelected = document.querySelector(`.${routerName}`)
    pageSelected.style.display = "block"

    return true
}