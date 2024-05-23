/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    flowbite.content()
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    flowbite.plugin(),
  ],
}

