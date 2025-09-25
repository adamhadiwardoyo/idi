/** @type {import('tailwindcss').Config} */
module.exports = {
  // ... content & plugins
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            p: {
              
              marginTop: '0.75rem',
              marginBottom: '1.25rem',
              
              // --- CONTOH PENGATURAN LAINNYA ---
              
              // 1. Mengubah Ukuran Font Paragraf
              fontSize: '1.1rem', 
              
              // 2. Mengubah Jarak Antar Baris (agar lebih mudah dibaca)
              lineHeight: '1.8',
              
              // 3. Mengubah Warna Teks Paragraf
              color: '#374151', 
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}