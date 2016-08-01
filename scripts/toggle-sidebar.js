
    <!-- Menu Toggle Script -->

        $(document).ready(function () {
            $(".toggle-sidebar").click(function () {
                $("#sidebar").toggleClass("collapsed");
                $("#content").toggleClass("col-md-12 col-md-9");

                return false;
            });
        });
