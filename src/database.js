import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
  #database = {}

  constructor() {
    fs.readFile(databasePath, 'utf-8')
      .then((data) => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table, query) {
    let data = this.#database[table] ?? []

    if (query) {
      const { title, description } = query

      data = data.filter(row => {
        const editedTitle = title?.replace('%20', ' ')
        const editedDescription = description?.replace('%20', ' ')

        if (editedTitle && editedDescription &&
          row.title.includes(editedTitle) && row.description.includes(editedDescription)) {
            return row
        }

        if (row.title.includes(editedTitle) || row.description.includes(editedDescription)) {
          return row
        }
      })
    }
    
    return data
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()
  }

  update(table, data, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      const { title, description } = data
      const { created_at, completed_at } = this.#database[table][rowIndex]

      this.#database[table][rowIndex] = {
        id,
        title,
        description,
        created_at,
        updated_at: new Date(),
        completed_at,
      }
      
      this.#persist()    
    }
  }

  updateCompleted(table, id, data) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      const { completed_at } = data
      const {
        title,
        description,
        created_at,  
      } = this.#database[table][rowIndex]

      this.#database[table][rowIndex] = {
        id,
        title,
        description,
        created_at,
        updated_at: new Date(),
        completed_at
      }

      this.#persist()
    }
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)

      this.#persist()
    }
  }
}