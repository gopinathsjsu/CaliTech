module.exports = {
    mongoURI:  process.env.PROD ? `productionDbUrl`:`mongodb+srv:`,
}