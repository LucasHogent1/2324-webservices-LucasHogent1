const GebruikerRepo = require('../repository/gebruiker')

const getAllGebruiker= async() => {
  const items = await GebruikerRepo.findAllGebruiker();
  return{
    items,
    count: items.length
  }
};

const getGebruikerById = async(id) => {
  const items = await GebruikerRepo.findGebruikerById(id)
  return{
    items,
    count: items.length
  }
};

const createGebruiker = async ({ email,voornaam,achternaam}) => {
  await GebruikerRepo.createGebruiker({ email,voornaam,achternaam,email})
  return 'Nieuwe Gebruiker aangemaakt'
};

const updateGebruikerById = async (id, { email,voornaam,achternaam}) => {
  await GebruikerRepo.updateGebruikerById(id, { email,voornaam,achternaam })

  return `Gebruiker updated to: email: ${email}, naam: ${naam}, achternaam: ${achternaam}`
};

const deleteGebruikerById = async (id) => {
  await GebruikerRepo.deleteGebruikerById(id)
};

module.exports = {
  getAllGebruiker,
  getGebruikerById,
  createGebruiker,
  updateGebruikerById,
  deleteGebruikerById,
};