const base_url = "https://api.football-data.org/v2"
const id_liga = "2019"
const api_token = "78f808fb721743e6a81d34488b6cf427"
const standing_url = `${base_url}/competitions/${id_liga}/standings`
const teams_url = `${base_url}/competitions/${id_liga}/teams`
const team_url = `${base_url}/teams/`

function status(response) {
  if (response.status !== 200) {
    console.log(`Error : ${response.status}`);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log(`Error : ${error}`);
  document.querySelector('.load').style.display = 'none'
}

let fetchApi = url => {
  return fetch(url, {
    method: "GET",
    headers: {
      'X-Auth-Token': api_token
    }
  });
}

function getStandings() {
  document.querySelector('.load').style.display = 'block'
  if ("caches" in window) {
    caches.match(standing_url).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          standingsHtml(data)
        });
      }
    });
  }

  fetchApi(standing_url)
    .then(status)
    .then(json)
    .then(data => {
      standingsHtml(data)
    })
    .catch(error)
}

function standingsHtml(data) {
  let standingsHTML = ""
  data.standings[0].table.forEach(team => {
    team = JSON.parse(JSON.stringify(team).replace(/http:/g, 'https:'));
    standingsHTML += `<tr>
      <td class="center-align">${team.position}</td>
      <td>
          <img alt="${team.team.id}" src=${team.team.crestUrl} style="float:left;width:20px;height:20px;margin-right:12px" onError="this.onerror=null;this.src='assets/img/loading.gif';">
          ${team.team.name}
      </td>
      <td class="center-align">${team.playedGames}</td>
      <td class="center-align">${team.won}</td>
      <td class="center-align">${team.draw}</td>
      <td class="center-align">${team.lost}</td>
      <td class="center-align">${team.goalsFor}</td>
      <td class="center-align">${team.goalsAgainst}</td>
      <td class="center-align">${team.goalDifference}</td>
      <td class="center-align">${team.points}</td>
      <td class="center-align">
        <a class="waves-effect waves-light btn-small" onClick="checkFavorite(${team.team.id})">Love</a>
      </td>
    </tr>`
  })
  document.getElementById("standings").innerHTML = standingsHTML
  document.querySelector('.load').style.display = 'none'
}

function getTeams() {
  document.querySelector('.load').style.display = 'block'
  if ("caches" in window) {
    caches.match(teams_url).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          teamsHtml(data)
        });
      }
    });
  }

  fetchApi(teams_url)
    .then(status)
    .then(json)
    .then(data => {
      teamsHtml(data)
    })
    .catch(error)
}

function teamsHtml(data) {
  let teamsHTML = ""
  data.teams.forEach(team => {
    team = JSON.parse(JSON.stringify(team).replace(/http:/g, 'https:'));
    teamsHTML += `<tr>
      <td class="center-align">
          <img alt="${team.id}" src=${team.crestUrl} style="width:20px;height:20px;" onError="this.onerror=null;this.src='assets/img/loading.gif';"><br>
          ${team.shortName}
      </td>
      <td class="center-align">${team.name}</td>
      <td class="center-align">${team.founded}</td>
      <td class="center-align">${team.phone}</td>
      <td class="center-align">${team.address}</td>
      <td class="center-align">${team.venue}</td>
      <td class="center-align">
        <a class="waves-effect waves-light btn-small" onClick="checkFavorite(${team.id})">Love</a>
      </td>
    </tr>`
  })
  document.getElementById("teams").innerHTML = teamsHTML
  document.querySelector('.load').style.display = 'none'
}

function getTeam(id) {
  return new Promise((resolve, reject) => {
    if ("caches" in window) {
      caches.match(team_url + id).then(response => {
        if (response) {
          response.json().then(data => {
            resolve(data)
          })
        }
      })
    }

    fetchApi(team_url + id)
      .then(status)
      .then(json)
      .then(data => {
        resolve(data)
      })
  })
}

function getFavoriteTeam() {
  document.querySelector('.load').style.display = 'block'
  getAllData().then(data => {
    console.log(data);
    console.log(`data`);
    if (data.length === 0) {
      document.querySelector('.load').style.display = 'none'
      document.getElementById("team_fav").innerHTML = `<tr>
        <td colspan="7">
            Data Favorit Kosong
        </td>
      </tr>`
    }else{
      var teamHTML = ""
      data.forEach(team => {
        team = JSON.parse(JSON.stringify(team).replace(/http:/g, 'https:'));
        teamHTML += `<tr>
          <td class="center-align">
              <img alt="${team.id}" src=${team.crestUrl} style="width:20px;height:20px;" onError="this.onerror=null;this.src='assets/img/loading.gif';"><br>
              ${team.shortName}
          </td>
          <td class="center-align">${team.name}</td>
          <td class="center-align">${team.founded}</td>
          <td class="center-align">${team.phone}</td>
          <td class="center-align">${team.address}</td>
          <td class="center-align">${team.venue}</td>
          <td class="center-align">
            <a class="waves-effect waves-light btn-small" onClick="deleteFav(${team.id})">Delete</a>
          </td>
        </tr>`
      })
      document.getElementById("team_fav").innerHTML = teamHTML
      document.querySelector('.load').style.display = 'none'
    }
  })
}