const plugin = require("tailwindcss/plugin");

 const animationDelay = plugin(
    ({ matchUtilities, theme }) => {
        matchUtilities(
            {
                "animation-delay": (value) => {
                    return {
                        animationDelay: value
                    }
                }
            },
            {
                values: theme("animationDelay")
            }
        )
    },
    {
        theme: {
            100: "100ms",
            200: "200ms",
            300: "300ms"
        }
    }
    )

module.exports = animationDelay