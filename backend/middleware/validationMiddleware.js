const validateVoterInput = (req, res, next) => {
  const { cnic, name, email, phone, address, dateOfBirth, password } = req.body;

  // Validate CNIC
  if (!/^3\d{4}-\d{7}-\d{1}$/.test(cnic)) {
    return res.status(400).json({ error: 'Invalid CNIC format. Format: 3xxxx-xxxxxxx-x' });
  }

  // Validate name
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ error: 'Name is required and must be a valid string' });
  }

  // Validate email
  if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Validate phone
  if (!/^[0-9]{10,12}$/.test(phone)) {
    return res.status(400).json({ error: 'Phone number must be 10-12 digits' });
  }

  // Validate address
  console.log('Request Body:', req.body);
  const { province, city, constituency } = address || {};
  if (!province || !['Punjab', 'Sindh', 'Balochistan', 'Khyber Pakhtunkhwa', 'Islamabad'].includes(province)) {
    return res.status(400).json({ error: 'Province is required and must be valid' });
  }
  if (!city || typeof city !== 'string' || city.trim().length === 0) {
    return res.status(400).json({ error: 'City is required and must be a valid string' });
  }
  if (!constituency) {
    return res.status(400).json({ error: 'Constituency is required' });
  }

  // Validate date of birth
  const dob = new Date(dateOfBirth);
  const age = new Date().getFullYear() - dob.getFullYear();
  if (isNaN(dob.getTime()) || age < 18) {
    return res.status(400).json({ error: 'Date of birth is required and voter must be at least 18 years old' });
  }

  // Validate password
  if (!password || password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long' });
  }

  next();
};

module.exports = { validateVoterInput };
