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
		V.notifs.registerAll();
	},
	notifs: {
		new: function(value = "Working", type = "default", wait = 5000) {
			notif = document.createElement("div");
			notif.classList.add("notif-float");
			notif.classList.add("notif");
			notif.classList.add("notif-" + type);
			if (!value.startsWith("<")) {
				value = "<span>"+ value + "</span>"
			}
			notif.innerHTML = value;
			document.body.appendChild(notif);
			V.notifs.register(notif, wait);
			setTimeout(function() {
				V.notifs.close(notif);
			}, wait);
			return notif;
		},
		close: function(notif, wait = 0) {
			if (typeof notif == "undefined") {
				return 1
			}
			setTimeout(function() {
				notif.setAttribute("closed", "");
			}, wait + 300);
			setTimeout(function() {
				notif.hidden = true;
			}, wait);
		},
		registerAll: function() {
			notifs = document.getElementsByClassName("notif");
			for (var i = 0; i < notifs.length; i++) {
				V.notifs.register(notifs[i]);
			}
		},
		register: function(notif, wait = Infinity) {
			if (typeof notif == "undefined") {
				return 1
			}
			notif.onclick = function() {
				V.notifs.close(notif);
			}
		}
	}
}
document.addEventListener("load", V.init());