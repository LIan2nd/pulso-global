const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/ /g, '-') // Ganti spasi dengan strip
    .replace(/[^\w-]+/g, ''); // Hapus karakter non-alfanumerik
};

export default createSlug;