/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/**/*.{js,jsx,ts,tsx}"],
   theme: {
      extend: {
         colors: {
            "clr-primary": "#F5426D",
            "clr-secondary": "#FFEB34",
            "clr-tertiary": "#FF9D29",
            "clr-bg": "#FFFCFB",
            "clr-black": "#333333",
            "clr-black-faded": "rgba(51,51,51,.5)",
            "clr-gray": "#E2E2E2",
            "clr-white": "#fff",
         },
         fontSize: {
            "3xs": "0.375rem", // 6px
            "2xs": "0.5625rem", // 9px
            xs: "0.75rem", // 12px
            sm: "0.875rem", // 14px
            base: "1rem", // 16px
            lg: "1.125rem", // 18px
            xl: "1.25rem", // 20px
            "2xl": "1.5rem", //24px
            "3xl": "1.875rem", // 30px
            "4xl": "2.25rem", // 36px
            "5xl": "3rem", // 48px
            "6xl": "3.75rem", // 60px
            "7xl": "4.5rem", // 72px
         },
         fontFamily: {
            body: ["Roboto", '"Playfair Display"'],
         },
         screens: {
            sm: "450px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px",
         },
         container: {
            padding: {
               DEFAULT: "1rem",
               sm: "2rem",
            },
         },
      },
   },
   plugins: [],
};
