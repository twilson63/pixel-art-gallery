import PouchDB from 'pouchdb-browser'

const db = PouchDB(process.env.REACT_APP_DB)

export default db
