//You can edit ALL of the code here
const searchFilteredEpisode = (value) => {
  return allEpisodes.filter(
    (episode) =>
      episode.summary.toLowerCase().includes(value) ||
      episode.name.toLowerCase().includes(value)
  );
};
//const allEpisodes = getAllEpisodes();
let allEpisodes;
function setup() {
  //makePageForEpisodes(allEpisodes);
  getAllEpisodesApi();
}

const formatTitleNumbers = (number) => {
  return number < 10 ? `0${number}` : `${number}`;
};
let searchInput = document.getElementById("search");
searchInput.addEventListener("input", (e) => {
  let value = e.target.value.toLowerCase();

  makePageForEpisodes(searchFilteredEpisode(value));
});

function displayNumber(allEpisodes, filteredEpisode) {
  let currentEpisode = document.getElementById("display-episode-number");
  currentEpisode.innerHTML = `Displaying ${filteredEpisode}/${allEpisodes} episodes`;
}

function createSelectFunctionality() {
  let select = document.getElementById("select-episode");
  let option = document.createElement("option");
  option.value = "";
  option.innerHTML = "Select Episodes";
  select.add(option);
  allEpisodes.forEach((episode) => {
    let option = document.createElement("option");
    option.value = episode.id;
    option.innerHTML = `S${formatTitleNumbers(
      episode.season
    )}E${formatTitleNumbers(episode.number)} - ${episode.name}`;
    select.add(option);
  });
  const filteredEpisodeById = (id) => {
    return allEpisodes.filter((episode) => episode.id.toString() === id);
  };
  select.addEventListener("change", (e) => {
    if (e.target.value === "") {
      makePageForEpisodes(allEpisodes);
    } else {
      let selectedEpisode = filteredEpisodeById(e.target.value);
      makePageForEpisodes(selectedEpisode);
    }
  });
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";
  episodeList.forEach((episode) => {
    let episodeContainer = document.createElement("div");
    episodeContainer.classList.add("episode-container");
    let title = document.createElement("p");
    title.innerText = `${episode.name} - S${formatTitleNumbers(
      episode.season
    )}E${formatTitleNumbers(episode.number)}`;
    title.classList.add("episode-title");
    let episodeImage = document.createElement("img");
    episodeImage.src = episode.image.medium;
    episodeImage.classList.add("img");
    let episodeSummary = document.createElement("p");
    episodeSummary.innerHTML = episode.summary;
    episodeSummary.classList.add("episode-summary");
    episodeContainer.appendChild(title);
    episodeContainer.appendChild(episodeImage);
    episodeContainer.appendChild(episodeSummary);
    displayNumber(allEpisodes.length, episodeList.length);
    rootElem.appendChild(episodeContainer);
  });
}

window.onload = setup;

function getAllEpisodesApi() {
  return fetch("https://api.tvmaze.com/shows/82/episodes")
    .then((response) => response.json())
    .then((data) => {
      allEpisodes = data;
      makePageForEpisodes(allEpisodes);
      createSelectFunctionality();
    })
    .catch((error) => {
      console.log(error);
    });
}
