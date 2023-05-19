/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        epilogue: ['Epilogue', 'sans-serif'],
      },
      boxShadow: {
        primary: '5px 5px 5px rgba(2, 2, 2, 0.25)',
        secondary: '10px 10px 20px rgba(2, 2, 2, 0.25)',
      },
      colors: {

        backgroundColor: 'rgba(251, 251, 253, 0.75)',
        primaryColor: 'rgba(242, 123, 145, 0.75)',
        secondaryColor: 'rgba(255, 216, 88, 0.75)',
        statusBar: 'rgba(154,240,196, 0.75)',
        statusBarBG: 'rgba(224, 224, 234, 0.75)',
        headerText: 'rgba(0, 0, 0, 1)',
        paragraphText: 'rgba(63, 63, 63, 1)',
        highlightText: 'rgba(100, 100, 120, 1)',
        placeholderText: 'rgba(165, 165, 185, 1)',
        window: 'rgba(241, 241, 247, 0.75)',
        insideWindow: 'rgba(251, 251, 253, 0.75)',
        lightWindow: 'rgba(208, 208, 214, 0.75)',
        inputBorder: 'rgba(242, 123, 145, 0.75)',
        primaryColorTransparent: 'rgba(242, 123, 145, 0.75)',
        iconBG: 'rgba(224, 224, 234, 0.75)',
        alertColor: 'rgba(255, 114, 114, 0.75)',
        hoverLink: 'rgba(255, 114, 114, 1)',
        sidebarIconDisabled: 'rgba(202, 202, 202, 0.75)',
      },
    },
  },
  plugins: [],
}
