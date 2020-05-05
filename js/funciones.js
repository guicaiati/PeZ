        $(function() {
            $("input[type=radio]").click(function() {
                calcular();
            })
        });

        function calcular() {
            $radios = $("input[type=radio]:checked");
            var coste_total = 0;
            $radios.each(function() {
                coste_total = coste_total + parseInt($(this).val());
            })
            $(".resultado").html(coste_total);
            // BOTONES ////////
            $("[type=radio]:checked").parents('label').css("background-color", "inherit");
            $("[type=radio]:not(:checked)").parents('label').css("background-color", "#fff");
        }