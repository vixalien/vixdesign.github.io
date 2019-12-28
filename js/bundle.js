/* Menu */
let V = {
	menu: {
		registerAll: function() {
			let menuts = document.getElementsByClassName('menu-trigger');
			for (var i = 0; i < menuts.length; i++) {
				if (menuts[i].classList.contains("menu-hover")) {
					menuts[i].addEventListener("mouseenter",
						function(e) {
							t = document.querySelector(e.target.getAttribute("target"));
							if (t) {
								t.setAttribute("open", "");
								/* calculate if the menu can't fit in the space below */
								V.menu.toporbottom(t, e.target);
								V.menu.leftorright(t, e.target);
							}
						}
					);
					menuts[i].addEventListener("mouseleave",
						function(e) {
							t = document.querySelector(e.target.getAttribute("target"));
							if (t) {
								t.removeAttribute("open", "");
							}
						}
					)
				} else {
					menuts[i].addEventListener("click",
						function(e) {
							t = document.querySelector(e.target.getAttribute("target"));
							if (t) {
								t.toggleAttribute("open");
								/* calculate if the menu can't fit in the space below */
								V.menu.toporbottom(t, e.target);
								V.menu.leftorright(t, e.target);
							}
						}
					)
				}
			}
		},
		toporbottom(t, e) {
			if (screen.availHeight - (e.offsetTop + e.offsetHeight) < t.offsetHeight) {
				t.style.top = (e.offsetTop - t.offsetHeight) + "px";
			} else {
				t.style.top = (e.offsetTop + e.offsetHeight) + "px"
			};
		},
		leftorright(t, e) {
			if (screen.availWidth - (e.offsetLeft + e.offsetWidth) > t.offsetWidth) {
				t.style.left = (e.offsetLeft) + "px";
			} else {
				t.style.left = (e.offsetLeft + e.offsetWidth) + "px"
			};
		}
	},
	dialog: {
		registerAll: function () {
			dialogt = document.getElementsByClassName("dialog-trigger");
			for (var i = 0; i < dialogt.length; i++) {
				dialogt[i].addEventListener("click", 
					function (e) {
						t = document.querySelector(e.target.getAttribute("target"));
						if (t) {
							t.hide =  t.hide || function() {
								t.removeAttribute("open");
							}
							t.showModal = t.showModal || function() {
								t.setAttribute("open", "open");
							}
							if (t.hasAttribute("open")) {
								t.hide();
							} else {
								t.showModal();
							}
						}
					}
				)
			}
		}
	},
	init: function() {
		V.menu.registerAll();
		V.dialog.registerAll();
	}
}
document.addEventListener("load", V.init());