function uploader(
  subfolder_path,
  allowed_file_types,
  max_file_size,
  error_msg
) {
  //file upload folder(jodi file upload e kono somosha hoi then ekhane ase check korte hobe)
  const UPLOADS_FOLDER = `${__dirname}/../../public/uploads/${subfolder_path}`;
  return uploader;
}

module.exports = uploader;
