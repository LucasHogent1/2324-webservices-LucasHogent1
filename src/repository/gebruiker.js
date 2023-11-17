const {getKnex, tables} = require('../data')


const findAllGebruiker = async() => {
    return getKnex()(tables.gebruiker)
        .select().orderBy('idGebruiker') //TODO: dan voornaam
};

const SELECT_COLUMNS = [
    `${tables.Gebruikers}.idGebruiker`,
    'email',
    'voornaam',
    'achternaam',

]

const formatGebruiker = ({...rest}) => ({
    Gebruiker: {
        ...rest
    }
})

const findGebruikerById = async (id) => {
    const Gebruiker = await getKnex()(tables.Gebruiker)
    .where(`${tables.Gebruiker}.idGebruiker`, id).first(SELECT_COLUMNS)

    return Gebruiker && formatGebruiker(Gebruiker)
}

const createGebruiker = async ({idGebruiker, email,voornaam,achternaam,}) => {
    const [id] = await getKnex()(tables.Gebruiker).insert({
        idGebruiker, 
        email,
        voornaam,
        achternaam, 
    })
    return id
}

const updateGebruikerById = async (id, { email,voornaam,achternaam, }) => {
    await getKnex()(tables.Gebruiker)
    .where(`${tables.Gebruiker}.idGebruiker`, id).update({
        email: email, 
        voornaam: voornaam,
        achternaam: achternaam, 
    })
}

const deleteGebruikerById = async (id) => {
    await getKnex()(tables.gebruiker)
    .where(`${tables.gebruiker}.idGebruiker`, id).del()
}

module.exports = {findAllGebruiker, findGebruikerById, createGebruiker, updateGebruikerById, deleteGebruikerById}