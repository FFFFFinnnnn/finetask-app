export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Mengaktifkan mode gelap berdasarkan class
  theme: {
    extend: {
      colors: {
        primary: '#6366F1', // Indigo
        accent: '#FACC15',  // Kuning lembut
        light: {
          bg: '#F9FAFB',     // Abu terang
          text: '#111827',
          card: '#FFFFFF',
        },
        dark: {
          bg: '#1F2937',     // Abu tua
          text: '#F9FAFB',
          card: '#374151',
        }
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
