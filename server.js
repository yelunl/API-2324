import express, { json, query } from "express";
import ejs from "ejs";
import 'dotenv/config';

const app = express();

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));

// set templating engine
app.set("views", "./views");
app.set("view engine", "ejs");

const header = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer " + process.env.API_KEY,
  },
};

const getData = async (url) => {
  try {
    const response = await fetch(
      url,
      header
    );
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    }
  } catch (err) {
    console.log(err);
  }
};

app.get('*', async (req, res, next) => {
  if(req.query.query) {
    const { query, include_adult, language, page } = req.query;
    const searchResult = await getData(`https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=${include_adult}&language=${language}&page=${page}`);
    req.searchResult = searchResult;
    next();
  }
  next();
});

app.get('/searchResult', (req, res) => {
  console.log(req.searchResult);
  res.render('results', {searchResult: req.searchResult.results});
})

app.get("/", async (req, res) => {
  const trendingMovies = await getData("https://api.themoviedb.org/3/trending/movie/week?language=en-US");
  const trendingSeries = await getData("https://api.themoviedb.org/3/trending/tv/week?language=en-US");
  res.render("home", {movies: trendingMovies, series: trendingSeries});
});

app.get("/movie/:id", async (req, res) => {
  const movieInfo = await getData(`https://api.themoviedb.org/3/movie/${req.params.id}`)
  res.render('detail', {data: movieInfo});
});

app.get("/serie/:id", async (req, res) => {
  const serieInfo = await getData(`https://api.themoviedb.org/3/tv/${req.params.id}`)
  res.render('detail', {data: serieInfo});
});

const postData = async (url, type, id) => {
  try {
    const response = await fetch(
      url,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          'content-type': 'application/json',
          Authorization:
            "Bearer " + process.env.API_KEY,
          body: JSON.stringify({media_type: type, media_id: id, watchlist: true})
          },
      }
    );
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    }
  } catch (err) {
    console.log(err);
  }
}


app.listen(5500, (req, res) => {
  console.log("listening on port 5500");
});
