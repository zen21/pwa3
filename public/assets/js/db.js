function openConnection() {
  var db_promise = idb.open("pwa-sub2", 1, function (upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains("team")) {
      upgradeDb.createObjectStore("team", {
        keyPath: "id"
      })
    }
  })
  return db_promise
}

window.checkFavorite = (id) => {
  return new Promise(() => {
    openConnection()
      .then(db => {
        const tx = db.transaction("team", "readonly")
        const store = tx.objectStore("team")
        return store.get(id)
      })
      .then(data => {
        if (data == undefined) {
          getTeam(id).then(team => {
            insertDB(team)
          })
        } else {
          deleteDB(id)
        }
      })
  })
}

window.deleteFav = (id, type) => {
  deleteDB(id).then(getFavoriteTeam())
}

function insertDB(data) {
  let item = {}
  item = {
    id: data.id,
    shortName: data.shortName,
    name: data.name,
    crestUrl: data.crestUrl,
    founded: data.founded,
    phone: data.phone,
    address: data.address,
    venue: data.venue
  }

  openConnection().then(db => {
    const tx = db.transaction("team", 'readwrite');
    tx.objectStore("team").put(item)
    return tx.complete;
  }).then(() => {
    M.toast({
      html: 'Data added to fav'
    })
  }).catch(() => {
    M.toast({
      html: 'Error'
    })
  })
}

function deleteDB(id) {
  return new Promise(() => {
    openConnection().then(db => {
      const tx = db.transaction("team", "readwrite")
      const store = tx.objectStore("team")
      store.delete(id)
      return tx.complete
    }).then(() => {
      M.toast({
        html: 'Data delete from fav!'
      })
    }).catch(() => {
      M.toast({
        html: 'Error'
      })
    })
  })
}

function getAllData() {
  return new Promise((resolve, reject) => {
    openConnection().then(db => {
      const tx = db.transaction("team", "readonly");
      const store = tx.objectStore("team");
      return store.getAll();
    })
    .then(data => {
      resolve(data)
    })
  })
}