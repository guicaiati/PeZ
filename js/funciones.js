$(function () {
    // Los datos ahora se cargan instantáneamente desde js/precios.js gracias al script tag
    calcular();

    $("input[type=radio]").click(function () {
        calcular();
    });

    // Intersection Observer para el Fade In al scrollear
    const opcionesFade = {
        threshold: 0.15 // Se activa cuando el 15% de la sección está en pantalla
    };

    const animadorSecciones = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visible');
            } else {
                // Removemos la clase para que el efecto se repita al volver a subir
                entrada.target.classList.remove('visible');
            }
        });
    }, opcionesFade);

    document.querySelectorAll('.fade-seccion').forEach(seccion => {
        animadorSecciones.observe(seccion);
    });
});

function calcular() {
    if (Object.keys(preciosDatos).length === 0) return;

    const $radios = $("input[type=radio]:checked");
    let coste_total = 0;
    let desgloseOpciones = "";

    $radios.each(function () {
        const valueKey = $(this).val();
        const precioItem = preciosDatos[valueKey] || 0;

        coste_total += parseInt(precioItem, 10) || 0;

        const $label = $(this).parents('label');
        const categoria = $label.find('.badge').text().trim();
        const textoPrincipal = $label.find('h3').length ? $label.find('h3').text().trim() : $label.find('p').first().text().trim();

        desgloseOpciones += "✔️ " + categoria + ": " + textoPrincipal + " ($" + parseInt(precioItem, 10).toLocaleString('es-AR') + ")\n";
    });

    $(".resultado").html(coste_total.toLocaleString('es-AR'));

    $("[type=radio]:checked").parents('label').css("background-color", "inherit");
    $("[type=radio]:not(:checked)").parents('label').css("background-color", "#fff");

    const numeroWhatsApp = "5491156533834";
    const textoWP = "Hola! Quiero pedir un presupuesto.\n\nEstas son las opciones seleccionadas:\n" + desgloseOpciones + "\n*Total estimado: $" + coste_total.toLocaleString('es-AR') + "*";
    const mensajeFinal = encodeURIComponent(textoWP);

    $("#btn-whatsapp").attr("href", "https://api.whatsapp.com/send?phone=" + numeroWhatsApp + "&text=" + mensajeFinal);
}