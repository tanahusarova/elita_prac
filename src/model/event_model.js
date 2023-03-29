const { Pool } = require('pg');
 
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'heslo1234',
  port: 5432,
});

const getEventById = (id_of_event, id_of_user) => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM event WHERE id = $1', [id_of_event], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

//potrebujem overit ci ma dany clovek pravo vidiet dany plan a ci chce svoje alebo spolocne
const getEventByDate = (id_of_user, id_of_owner, date, property) => {
  if (id_of_user === id_of_owner) {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM event e, type t, participants p WHERE e.date = $1 AND e.id_of_type = t.id AND t.id_of_property = $2 AND p.id_of_event = e.id AND p.id_of_user = $3', 
              [date, property, id_of_user], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) }

  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM event e, observers o, participants p WHERE e.date = $1 AND e.id = p.id_of_event AND p.id_of_user = $2 AND o.id_of_event = e.id AND o.id_of_user = $3 AND o.visible = TRUE', 
              [date, id_of_owner, id_of_user], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })


}

const createEvent = (body) => {
  return new Promise(function(resolve, reject) {
    const {id, id_of_type, name, from, to,  id_of_colour } = body
    pool.query('INSERT INTO event (id, id_of_type, name, from, to, id_of_colour) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [id, id_of_type, name, from, to,  id_of_colour ], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new event ${name} has been added`)
    })
  })
}
const deleteEvent = (id) => {
  return new Promise(function(resolve, reject) {
//    const id = parseInt(request.params.id)
    pool.query('DELETE FROM event WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Event deleted`)
    })
  })
}



module.exports = {
  createEvent,
  deleteEvent,
}
