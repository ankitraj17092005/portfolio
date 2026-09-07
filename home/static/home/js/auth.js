document.addEventListener("DOMContentLoaded", () => {

    const themeButton =
        document.getElementById("themeToggle");

    const html =
        document.documentElement;


    /* ================================
       THEME
    ================================= */

    const savedTheme =
        localStorage.getItem("portfolio-theme");


    if (savedTheme) {

        html.setAttribute(
            "data-theme",
            savedTheme
        );

    }


    function updateThemeIcon() {

        if (!themeButton) return;

        const currentTheme =
            html.getAttribute("data-theme");

        themeButton.textContent =
            currentTheme === "light"
                ? "🌙"
                : "☀️";
    }


    updateThemeIcon();


    if (themeButton) {

        themeButton.addEventListener(
            "click",
            () => {

                const currentTheme =
                    html.getAttribute("data-theme");


                const newTheme =
                    currentTheme === "light"
                        ? "dark"
                        : "light";


                html.setAttribute(
                    "data-theme",
                    newTheme
                );


                localStorage.setItem(
                    "portfolio-theme",
                    newTheme
                );


                updateThemeIcon();

            }
        );

    }


    /* ================================
       PASSWORD SHOW / HIDE
    ================================= */

    const passwordInputs =
        document.querySelectorAll(
            'input[type="password"]'
        );


    passwordInputs.forEach((input) => {

        const wrapper =
            document.createElement("div");


        wrapper.className =
            "password-wrapper";


        input.parentNode.insertBefore(
            wrapper,
            input
        );


        wrapper.appendChild(input);


        const button =
            document.createElement("button");


        button.type = "button";

        button.className =
            "password-toggle";

        button.textContent = "Show";


        wrapper.appendChild(button);


        button.addEventListener(
            "click",
            () => {

                if (
                    input.type === "password"
                ) {

                    input.type = "text";

                    button.textContent =
                        "Hide";

                } else {

                    input.type = "password";

                    button.textContent =
                        "Show";

                }

            }
        );

    });


    /* ================================
       BUTTON LOADING
    ================================= */

    const forms =
        document.querySelectorAll(
            ".auth-form"
        );


    forms.forEach((form) => {

        form.addEventListener(
            "submit",
            () => {

                const button =
                    form.querySelector(
                        ".primary-btn"
                    );


                if (!button) return;


                button.classList.add(
                    "loading"
                );

            }
        );

    });

});