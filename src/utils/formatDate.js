/**
 * Mengubah string tanggal (terutama format ISO) menjadi format yang mudah dibaca.
 * Contoh output: "23 Juli 2025"
 *
 * @param {string} dateString - String tanggal yang akan diformat.
 * @returns {string} Tanggal yang sudah diformat dalam Bahasa Indonesia, 
 * atau pesan error jika input tidak valid.
 */
export const formatDate = (dateString) => {
  // 1. Handle jika input kosong, null, atau undefined.
  if (!dateString) {
    return 'Tanggal tidak tersedia';
  }

  try {
    const date = new Date(dateString);

    // 2. Cek jika hasil konversi tanggal tidak valid.
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date value');
    }

    // 3. Tentukan opsi format yang diinginkan.
    const options = {
      day: 'numeric',   // -> 23
      month: 'long',    // -> Juli
      year: 'numeric',  // -> 2025
    };

    // 4. Format tanggal menggunakan locale 'id-ID' (Indonesia).
    return new Intl.DateTimeFormat('id-ID', options).format(date);

  } catch (error) {
    console.error("Error formatting date:", error.message);
    return 'Format tanggal salah'; // Fallback text untuk ditampilkan di UI
  }
};

export default formatDate;