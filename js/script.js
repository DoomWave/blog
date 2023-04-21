var valorParaAnimar = "300";

function orientacionActual(orientacion){
	return window.matchMedia(`(orientation: ${orientacion})`).matches;
}

$(document).ready(()=>{
	
	InicializarAnchoDeCaja()
	estoyEnUnArticulo();
	//Inicializadores
	crearBarraDeNavegacion();
	crearPieDePagina();

	crearPosts();

	/*$("#send").click((e)=>{
		validator();
	});*/

	if(existe("#conForm1")){
		let valMsg = "Completa este campo";
		$("#conForm1").validate({
			messages:{
				name: valMsg,
				subject: valMsg,
				email: valMsg + " e introduce un email válido.",
				mensaje: valMsg
			}
		});
	}

	

	

	$(".post-title").click(function(el){
		guardarDatos("tituloDeLaPagina", $(el.target).text());
		guardarDatos("etiqueta", buscarValorData(el.target, "topic"));
		guardarDatos("fecha", buscarValorData(el.target, "date"));
		irAPagina("articulo.html")

	});

	$("#contactCTA").click(()=>{
		window.location.assign("contacto.html");
	});

	$("#morePostsCTA").click(()=>{
		window.location.assign("blog.html");
	});

	$(".post-img").click(function(el){
		guardarDatos("tituloDeLaPagina", $(el.target).data("title"));
		guardarDatos("etiqueta", buscarValorData(el.target, "topic"));
		guardarDatos("fecha", buscarValorData(el.target, "date"));
		irAPagina("articulo.html");
	});

	$("[data-actor=abrirMenuRespons]").click(function() {  
		$("#menuR").css({"display": "block"}).animate({left: "0%"}, 150, ()=>{
			$(this).fadeOut(150, ()=>{
				$("[data-actor=cerrarMenuRespons]").fadeIn(150);
				$("body").addClass("anularScroll");
				$("#menuR").attr("data-visible", "true");
			});
		});
	});

	$("[data-actor=cerrarMenuRespons]").click(function() {  
		$("#menuR").css({"display": "block"}).animate({left: "0%"}, 150, ()=>{
			$(this).fadeOut(150, ()=>{
				$("[data-actor=abrirMenuRespons]").fadeIn(150);
				$("body").removeClass("anularScroll");
				$("#menuR").attr("data-visible", "false");
			});
		});
	});

	$(document).click(function (event) { 
		$("#menuR").each(function (it, el) {
			if($(event.target).closest(el).length){
				if($(el).attra("data-visible")){
					$("menuR").animate({left: "-50%"}, 150, ()=>{
						$("[data-actor=cerrarMenuRespons]").fadeOut(150, ()=>{
							$("[data-actor=abrirMenuRespons]").fadeIn(150);
							$("body").removeClass("anularScroll");
							$("#menuR").css({"display": "none"}).attr("data-visible", "false");
						});
					});
				}
			}
		});
	});

	function crearBarraDeNavegacion(){
		let parteDerecha = $(".bar-elements-right");
		let cajaDeBusqueda = `
			<a href="#" id=searchButton>
				<svg data-icon="searchBtn" width="100%" height="100%" viewBox="0 0 24 24">
					<g transform="matrix(1.37221,0,0,1.37221,-4.11664,-4.11664)"><path d="M15.5,14L14.71,14L14.43,13.73C15.41,12.59 16,11.11 16,9.5C16,5.91 13.09,3 9.5,3C5.91,3 3,5.91 3,9.5C3,13.09 5.91,16 9.5,16C11.11,16 12.59,15.41 13.73,14.43L14,14.71L14,15.5L19,20.49L20.49,19L15.5,14ZM9.5,14C7.01,14 5,11.99 5,9.5C5,7.01 7.01,5 9.5,5C11.99,5 14,7.01 14,9.5C14,11.99 11.99,14 9.5,14Z"/>
					</g>
				</svg>
			</a>
			<form class="search-box">
				<input id="searchInput" type="text" placeholder="Buscar...">
			</form>
		`
		let enlaces = {
			"titulo": ["Inicio", "Sobre mi", "Blog", "Contacto"],
			"links": ["index.html", "#", "blog.html", "contacto.html"]
		}

		let itBarra = 0;
		while(itBarra < enlaces.titulo.length){
			parteDerecha.append(barraDeNavegacion(enlaces.links[itBarra], enlaces.titulo[itBarra]));
			itBarra++;
		}
		parteDerecha.last().append(cajaDeBusqueda);

		function barraDeNavegacion(link, titulo){
			let platillaBarra = `
				<a href="${link}" class="barLink">${titulo}</a>
			`
			return platillaBarra;
		}
	}

	function crearPieDePagina(){
		let footerMenu = $(".footer-menu");
		let socialIcons = $(".social-icons-svg");
		let topicLinks = $("#topicLinksFooter");
		let copyRibbon = $(".copy-ribbon");

		//crear el footer
		let footerLinks = {
			"titulo": ["Inicio", "Sobre mi", "Blog", "Contacto", "Política de privacidad"],
			"link": ["index.html", "#", "blog.html", "contacto.html", "#"]
		}

		let itFoot = 0;
		while(itFoot < footerLinks.titulo.length){
			footerMenu.append(`<li><a href="${footerLinks.link[itFoot]}" class="footer-link">${footerLinks.titulo[itFoot]}</a></li>`);
			itFoot++;
		}

		//Crear las redes sociales.

		let iconsSvgPath = {
			"pathContent": [`<path d="M633.468 192.038s-6.248-44.115-25.477-63.485c-24.366-25.477-51.65-25.642-64.123-27.118-89.493-6.52-223.904-6.52-223.904-6.52h-.236s-134.352 0-223.893 6.52c-12.52 1.523-39.768 1.63-64.123 27.118-19.24 19.37-25.358 63.485-25.358 63.485S-.012 243.806-.012 295.681v48.509c0 51.768 6.366 103.643 6.366 103.643s6.248 44.114 25.358 63.52c24.355 25.477 56.363 24.65 70.655 27.367 51.237 4.89 217.644 6.366 217.644 6.366s134.529-.237 224.022-6.638c12.52-1.477 39.756-1.63 64.123-27.119 19.24-19.37 25.476-63.532 25.476-63.532S640 396.03 640 344.154v-48.508c-.13-51.769-6.497-103.643-6.497-103.643l-.035.035zm-379.8 211.007V223.173L426.56 313.41l-172.892 89.635z"/>`, `<path d="M380.001 120.001h99.993V0h-99.993c-77.186 0-139.986 62.8-139.986 139.986v60h-80.009V320h79.985v320h120.013V320h99.994l19.996-120.013h-119.99v-60.001c0-10.843 9.154-19.996 19.996-19.996v.012z"/>`, `<path d="M61.45,0C44.76,0,42.66.07,36.11.37A45.08,45.08,0,0,0,21.2,3.23a29.86,29.86,0,0,0-10.88,7.08,30.26,30.26,0,0,0-7.1,10.88A44.92,44.92,0,0,0,.37,36.11C.08,42.66,0,44.75,0,61.44S.07,80.21.37,86.77a45.08,45.08,0,0,0,2.86,14.91,30.12,30.12,0,0,0,7.08,10.88,30.13,30.13,0,0,0,10.88,7.1,45.17,45.17,0,0,0,14.92,2.85c6.55.3,8.64.37,25.33.37s18.77-.07,25.33-.37a45.17,45.17,0,0,0,14.92-2.85,31.54,31.54,0,0,0,18-18,45.6,45.6,0,0,0,2.86-14.91c.29-6.55.37-8.64.37-25.33s-.08-18.78-.37-25.33a45.66,45.66,0,0,0-2.86-14.92,30.1,30.1,0,0,0-7.09-10.88,29.77,29.77,0,0,0-10.88-7.08A45.14,45.14,0,0,0,86.76.37C80.2.07,78.12,0,61.43,0ZM55.93,11.07h5.52c16.4,0,18.34.06,24.82.36a34,34,0,0,1,11.41,2.11,19,19,0,0,1,7.06,4.6,19.16,19.16,0,0,1,4.6,7.06,34,34,0,0,1,2.11,11.41c.3,6.47.36,8.42.36,24.82s-.06,18.34-.36,24.82a33.89,33.89,0,0,1-2.11,11.4A20.35,20.35,0,0,1,97.68,109.3a33.64,33.64,0,0,1-11.41,2.12c-6.47.3-8.42.36-24.82.36s-18.35-.06-24.83-.36a34,34,0,0,1-11.41-2.12,19,19,0,0,1-7.07-4.59,19,19,0,0,1-4.59-7.06,34,34,0,0,1-2.12-11.41c-.29-6.48-.35-8.42-.35-24.83s.06-18.34.35-24.82a33.7,33.7,0,0,1,2.12-11.41,19,19,0,0,1,4.59-7.06,19.12,19.12,0,0,1,7.07-4.6A34.22,34.22,0,0,1,36.62,11.4c5.67-.25,7.86-.33,19.31-.34Zm38.31,10.2a7.38,7.38,0,1,0,7.38,7.37,7.37,7.37,0,0,0-7.38-7.37ZM61.45,29.89A31.55,31.55,0,1,0,93,61.44,31.56,31.56,0,0,0,61.45,29.89Zm0,11.07A20.48,20.48,0,1,1,41,61.44,20.48,20.48,0,0,1,61.45,41Z"/>`],
			"title": ["YouTube", "Facebook", "Instagram"],
			"viewbox": [`viewBox="0 0 640 640"`, `viewBox="0 0 640 640"`, `viewBox="0 0 122.88 122.88"`]
		}

		let itIcon = 0;
		while(itIcon < 3){
			socialIcons.append(`
				<li><a href="#" title="${iconsSvgPath.title[itIcon]}"><span>
					<svg ${iconsSvgPath.viewbox[itIcon]} class="social-icon-svg">
						${iconsSvgPath.pathContent[itIcon]}
					</svg>
				</span></a></li>
			`);
			itIcon++;
		}

		//Crear links de temas
		let topicsArr = ["Viajes", "Platillos", "Cultura", "Opinión", "Destinos"];
		let itTopics = 0;
		while(itTopics < topicsArr.length){
			topicLinks.append(`
			<li><a href="#" class="footer-link" title="${topicsArr[itTopics]}">${topicsArr[itTopics]}</a></li>
			`);
			itTopics++;
		}

		let fechaVigente = new Date();
		copyRibbon.append(`<p>© Lorem Box ${fechaVigente.getFullYear()} Todos los derechos reservados</p>`)
	}

	function crearPosts(){
		let homePosts = $(".home-posts");
		let blogPostsList = $(".blog-posts-list");

		let postsData = {
			"img": ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"],
			"tags": ["Viajes", "Platillos", "Cultura", "Opinion", "Destinos"],
			"titular": ["Viajando a paisajes medievales al este de Europa", "Platillos exoticos en Tokio", "Si vas a Mexico debes saber esto", "Entre a un cuento de hadas...", "El origen de Lorem Box", "Paisajes en el desierto de Sonora"],
			"textoDeRelleno": ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus consequat augue neque, id tempor ipsum mollis vitae...", "Sed quis urna sed diam eleifend tristique. Pellentesque eu orci et ipsum placerat hendrerit. Etiam vitae elit ornare, dignissim...", "Nam laoreet sollicitudin ultricies. Ut hendrerit lectus non nisi laoreet ultricies. Vestibulum dictum...", "Cras accumsan commodo sapien. Curabitur at pellentesque risus. Curabitur commodo ornare lobortis..."]
		}

		let itPosts;
		let randomImg;
		let randomTitular;
		let randomSneak;
		let randomTag;

		const fechaPost = new Date().toLocaleDateString();

		if(existe(homePosts)){
			itPosts = 0;
			while(itPosts < 4){
				randomImg = Math.floor(Math.random() * 4)
				randomTitular = Math.floor(Math.random() * postsData.titular.length)
				randomSneak = Math.floor(Math.random() * postsData.textoDeRelleno.length)
				randomTag = Math.floor(Math.random() * postsData.tags.length)

				homePosts.append(plantillaPosts("index", postsData.img[randomImg], postsData.tags[randomTag], fechaPost, postsData.titular[randomTitular], postsData.textoDeRelleno[randomSneak]));
				itPosts++;
			}
		}
		else if(existe(blogPostsList)){
			itPosts = 0;
			while(itPosts < 4){
				randomImg = Math.floor(Math.random() * 4)
				randomTitular = Math.floor(Math.random() * postsData.titular.length)
				randomSneak = Math.floor(Math.random() * postsData.textoDeRelleno.length)
				randomTag = Math.floor(Math.random() * postsData.tags.length)

				blogPostsList.append(plantillaPosts("blog", postsData.img[randomImg], postsData.tags[randomTag], fechaPost, postsData.titular[randomTitular],postsData.textoDeRelleno[randomSneak]));
				itPosts++;
			}
		}



		function plantillaPosts(origen, img, tagTema, tagFecha, titulo, parrafoSneak){
			let postPlant = `
				${divPrincipal(origen)}
					${divImg(origen)} style="background-image: url('img/${img}');" data-topic="${tagTema}" data-date="${tagFecha}" data-title="${titulo}"></div>
					${postHeader(origen, titulo, tagTema, tagFecha)}
					${ulTemas(origen)}
						<li><a href="#" class="post-link"><span >
							<svg width="100%" height="100%" viewBox="0 0 24 24" class="post-icon">
								<g transform="matrix(1.2,0,0,1.2,-2.4,-2.4)">
									<path d="M21.41,11.58L12.41,2.58C12.05,2.22 11.55,2 11,2L4,2C2.9,2 2,2.9 2,4L2,11C2,11.55 2.22,12.05 2.59,12.42L11.59,21.42C11.95,21.78 12.45,22 13,22C13.55,22 14.05,21.78 14.41,21.41L21.41,14.41C21.78,14.05 22,13.55 22,13C22,12.45 21.77,11.94 21.41,11.58ZM13,20.01L4,11L4,4L11,4L11,3.99L20,12.99L13,20.01Z" style="fill-rule:nonzero;"/>
								</g>
								<g transform="matrix(1.2,0,0,1.2,-2.4,-2.4)">
									<circle cx="6.5" cy="6.5" r="1.5"/>
								</g>
							</svg>
						</span> ${tagTema}</a></li>
						<li><a href="#" class="post-link"><span >
							<svg width="100%" height="100%" viewBox="0 0 24 24" class="post-icon">
								<g transform="matrix(1.09091,0,0,1.09091,-1.09091,-1.09091)">
									<path d="M20,3L19,3L19,1L17,1L17,3L7,3L7,1L5,1L5,3L4,3C2.9,3 2,3.9 2,5L2,21C2,22.1 2.9,23 4,23L20,23C21.1,23 22,22.1 22,21L22,5C22,3.9 21.1,3 20,3ZM20,21L4,21L4,10L20,10L20,21ZM20,8L4,8L4,5L20,5L20,8Z" style="fill-rule:nonzero;"/>
								</g>
							</svg>
						</span> ${tagFecha}</a></li>
						<li><a href="#" class="post-link"><span >
							<svg width="100%" height="100%" viewBox="0 0 24 24" class="post-icon">
								<path d="M12,2.85C13.74,2.85 15.15,4.26 15.15,6C15.15,7.74 13.74,9.15 12,9.15C10.26,9.15 8.85,7.74 8.85,6C8.85,4.26 10.26,2.85 12,2.85M12,16.35C16.455,16.35 21.15,18.54 21.15,19.5L21.15,21.15L2.85,21.15L2.85,19.5C2.85,18.54 7.545,16.35 12,16.35M12,0C8.685,0 6,2.685 6,6C6,9.315 8.685,12 12,12C15.315,12 18,9.315 18,6C18,2.685 15.315,0 12,0ZM12,13.5C7.995,13.5 0,15.51 0,19.5L0,24L24,24L24,19.5C24,15.51 16.005,13.5 12,13.5Z" />
							</svg>
						</span> Taichi</a></li>
					</ul>

					${divShortInfo(origen, tagTema, tagFecha, titulo, parrafoSneak)}
				</div>
			`
			return postPlant;
		}

		function divPrincipal(origen){
			if(origen == "index"){
				return `<div class="home-post">`
			}
			else if(origen == "blog"){
				return `<div class="mini-post">`
			}
		}

		function divImg(origen){
			if(origen == "index"){
				return `<div class="post-img onHomePage"`
			}
			else if(origen == "blog"){
				return `<div class="post-img postImgOnBlogPage"`
			}
		}

		function ulTemas(origen){
			if(origen == "index"){
				return `<ul class="post-tags home-tags">`
			}
			else if(origen == "blog"){
				return `<ul class="post-tags postTagsOnBlogPage">`
			}
		}

		function postHeader(origen, titulo, dataTopic, dataDate){
			if(origen == "index"){
				return ""
			}
			else if(origen == "blog"){
				return `<h3 class="post-title postH3OnBlogPage for-blog-page" data-topic="${dataTopic}" data-date="${dataDate}">${titulo}</h3>`
			}
		}

		function divShortInfo(origen, dataTopic, dataDate, titulo, parrafoSneak){
			if(origen == "index"){
				return `
				<div class="post-short">
					<h3 class="post-title" data-topic="${dataTopic}" data-date="${dataDate}">${titulo}</h3>
					<p class="post-sneak">
						${parrafoSneak}
					</p>
				</div>
				`
			}
			else if(origen == "blog"){
				return `
					<p class="post-sneak postParrOnBlogPage">
							${parrafoSneak}
					</p>
				`
			}
		}
	}

	function estoyEnUnArticulo(){
		const artBlog = $("[data-pageType=post]");

		if(existe(artBlog)){
			$(".hero-title").text(obtenerDatos("tituloDeLaPagina"));
			$(".tags-list").append(plantillaHero(obtenerDatos("etiqueta"), obtenerDatos("fecha")));
		}

		function plantillaHero(tagTema, tagFecha){
			let postInfoPlant = `
			<li><a href="#" class="tag-link"><span >
                            <svg width="100%" height="100%" viewBox="0 0 24 24" class="tag-icon">
                                <g transform="matrix(1.2,0,0,1.2,-2.4,-2.4)">
                                    <path
                                        d="M21.41,11.58L12.41,2.58C12.05,2.22 11.55,2 11,2L4,2C2.9,2 2,2.9 2,4L2,11C2,11.55 2.22,12.05 2.59,12.42L11.59,21.42C11.95,21.78 12.45,22 13,22C13.55,22 14.05,21.78 14.41,21.41L21.41,14.41C21.78,14.05 22,13.55 22,13C22,12.45 21.77,11.94 21.41,11.58ZM13,20.01L4,11L4,4L11,4L11,3.99L20,12.99L13,20.01Z"
                                        style="fill-rule:nonzero;" />
                                </g>
                                <g transform="matrix(1.2,0,0,1.2,-2.4,-2.4)">
                                    <circle cx="6.5" cy="6.5" r="1.5" />
                                </g>
                            </svg>
                        </span> ${tagTema}</a></li>
                 <li><a href="#" class="tag-link"><span >
                            <svg width="100%" height="100%" viewBox="0 0 24 24" class="tag-icon">
                                <g transform="matrix(1.09091,0,0,1.09091,-1.09091,-1.09091)">
                                    <path
                                        d="M20,3L19,3L19,1L17,1L17,3L7,3L7,1L5,1L5,3L4,3C2.9,3 2,3.9 2,5L2,21C2,22.1 2.9,23 4,23L20,23C21.1,23 22,22.1 22,21L22,5C22,3.9 21.1,3 20,3ZM20,21L4,21L4,10L20,10L20,21ZM20,8L4,8L4,5L20,5L20,8Z"
                                        style="fill-rule:nonzero;" />
                                </g>
                            </svg>
                        </span> ${tagFecha}</a></li>
                <li><a href="#" class="tag-link"><span >
                            <svg width="100%" height="100%" viewBox="0 0 24 24" class="tag-icon">
                                <path
                                    d="M12,2.85C13.74,2.85 15.15,4.26 15.15,6C15.15,7.74 13.74,9.15 12,9.15C10.26,9.15 8.85,7.74 8.85,6C8.85,4.26 10.26,2.85 12,2.85M12,16.35C16.455,16.35 21.15,18.54 21.15,19.5L21.15,21.15L2.85,21.15L2.85,19.5C2.85,18.54 7.545,16.35 12,16.35M12,0C8.685,0 6,2.685 6,6C6,9.315 8.685,12 12,12C15.315,12 18,9.315 18,6C18,2.685 15.315,0 12,0ZM12,13.5C7.995,13.5 0,15.51 0,19.5L0,24L24,24L24,19.5C24,15.51 16.005,13.5 12,13.5Z">
                            </svg>
                        </span> Taichi</a></li>
			`
			return postInfoPlant;
		}
	}

	//Funciones asistentes

	function existe(elemento){
		if($(elemento).length > 0){
			return true
		}
		else{
			return false
		}
	}

	function guardarDatos(clave, valor){
		localStorage.setItem(clave, valor);
	}

	function obtenerDatos(clave){
		return localStorage.getItem(clave);
	}

	function irAPagina(pagina){
		window.location.assign(pagina);
	}

	function buscarValorData(yo, valor){
		return $(yo).data(valor);
		
	}

	/*function validator(){
		$("[data-val=required]").each(function (){
			if( $(this).children().val() === "" ){
				$(this).addClass("error");
			}
			if ( $(this).children().val()!= "" && $(this).hasClass("error") ){
				$(this).removeClass("error");
			}
		});
	}*/
});

$(window).resize(()=>{
	InicializarAnchoDeCaja()
});

$(document).on("click touchend", "#SearchButton", ()=>{
	$(".search-box").css({ "display": "block" }).animate({width : valorParaAnimar}, 150, ()=>{
		$("#searchInput").focus();
	});
});

$(document).on("blur", "#searchInput", ()=>{
	$(".search-box").animate({width : 0}, 150, ()=>{
		$(".search-box").css({"display": "none"});
	});
});

$(document).on("keyup", ".search-box", function(k){
	if(k.key == "Escape"){
		$(".search-box").animate({width : 0}, 150, ()=>{
			$(".search-box").css({"display": "none"});
		});
	}
});

function InicializarAnchoDeCaja(){
	if( $(window).width() <= 285.008 && orientacionActual("portrait") || $(window).width() <= 640 && orientacionActual("portrait") ){
		valorParaAnimar = "100";
	}
	else if( $(window).width() <= 640 && orientacionActual("landscape") || $(window).width() <= 960 && orientacionActual("landscape") ){
		valorParaAnimar = "100";
	}
	else if( $(window).width() <= 80 && orientacionActual("portrait") || $(window).width() <= 480 && orientacionActual("portrait") ){
		valorParaAnimar = "100";
	}
	else if( $(window).width() <= 80 && orientacionActual("landscape") || $(window).width() <= 480 && orientacionActual("landscape") ){
		valorParaAnimar = "100";
	}
	else{
		valorParaAnimar = "300"
	}
}