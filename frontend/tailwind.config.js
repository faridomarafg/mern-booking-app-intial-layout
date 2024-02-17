/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    container:{
      padding:{
        sm:'3rem',
        md:"10",
        DEFAULT:'0.2rem'
      }
    }
  },
  plugins: [],
}