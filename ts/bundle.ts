import menu from "./menu/menu";
let V = {
	menu: menu
}
window.addEventListener("load", V.menu.registerAll(), false)
V.menu.registerAll();