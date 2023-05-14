import React, { useEffect, useState } from "react";
import "./HackerNews.css";
import hackerNewLogo from "../assets/hacker-news.svg";
import Select from "react-select";
import { getItems, searchPage } from "../services/getData";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Avatar, Container } from "@mui/material";
function HackerNews() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [pages, setGetPages] = useState(0);
  const [pageItems, setPageItems] = useState([]);
  const [results, setResults] = useState([]);
  const [likedPost, setLikedPost] = useState(JSON.parse(localStorage.getItem("likes")) || []);
  const [filterPost, setFilterPost] = useState("");

  const options = [
    {
      value: 0,
      label: (
        <div>
          <img
            src="./img/image-138.png"
            className="Text-Style"
            alt="news logo"
          />{" "}
          Angular
        </div>
      ),
    },
    {
      value: 1,
      label: (
        <div>
          <img
            src="./img/image-140.png"
            className="Text-Style"
            alt="news logo"
          />{" "}
          React
        </div>
      ),
    },
    {
      value: 2,
      label: (
        <div>
          <img
            src="./img/image-141.jpg"
            className="Text-Style"
            alt="news logo"
          />{" "}
          Vue
        </div>
      ),
    },
  ];
  const handleChangePage = async (e, p) => {
    const getPages = await searchPage(p);
    const filtered = getPages.data.hits.filter(
      (item) =>
        !(
          item.story_title == null ||
          item.author == null ||
          item.story_url == null ||
          item.created_at == null
        )
    );
    setGetPages(getPages.data);
    setResults(filtered);
    
  };
  const handleLiked = (data) => {
    setLikedPost((old) => [...old, data]);
    data.like = true;
    localStorage.setItem("likes",JSON.stringify(likedPost))
  };

  useEffect(() => {
    (async () => {
      const items = await getItems(2);
      setPageItems(items.data);
      const getPages = await searchPage(pages);
      const filtered = getPages.data.hits.filter(
        (item) =>
          !(
            item.story_title == null ||
            item.author == null ||
            item.story_url == null ||
            item.created_at == null
          )
      );
      setGetPages(getPages.data);
      setResults(filtered);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      console.log(likedPost)
    if(filterPost === "All"){
        const getPages = await searchPage(0);
        const filtered = getPages.data.hits.filter(
          (item) =>
            !(
              item.story_title == null ||
              item.author == null ||
              item.story_url == null ||
              item.created_at == null
            )
        );
        setResults(filtered);
      }
    else if(filterPost === "Favs"){
      setResults(likedPost)
    }
    })();
  },[filterPost])
  return (
    <>
      <div className="Front-End-Test---Home-view">
        <div className="Rectangle-2-Copy">
          <span className="HACKER-NEWS Text-Style">
            <img src={hackerNewLogo} className="Text-Style" alt="news logo" />
          </span>
        </div>

        <div className="Rectangle center">
          <span className="All Text-Style-2 center-child">
            <button onClick={() => setFilterPost("All")}>All</button>
          </span>
          <span className="My-faves center-child">
            <button onClick={() => setFilterPost("Favs")}>My faves</button>
          </span>
        </div>

        <div>
          <Select
            className="Rectangle-26-Copy-23"
            options={options}
            key={options.value}
            onChange={setSelectedOption}
          />
        </div>

        {results.map((res) => {
          const rawDate = new Date(res.created_at_i);
          const date =
            rawDate.toLocaleDateString() + " " + rawDate.toLocaleTimeString();

          return (
            <Stack
              spacing={2}
              direction="row"
              alignItems="right"
              key={res.created_at}
            >
              <Stack>
                <div className="Rectangle-articles">
                  <div className="">
                    <img src="img/iconmonstr-time-2.png" />
                    <span className="-hours-ago-by-autho">
                      {date} ago by {res.author}
                    </span>
                    <br />
                    <span className="Text-articles">{res.story_title}</span>
                  </div>
                  <Avatar>
                    <button onClick={() => handleLiked(res)}>
                      <img
                        src={
                          !res?.like
                            ? "./img/iconmonstr-favorite-2.png"
                            : "./img/iconmonstr-favorite-3.png"
                        }
                        alt="heart"
                      />
                    </button>
                  </Avatar>
                </div>
              </Stack>
            </Stack>
          );
        })}
        <Container maxWidth="sm">
          <Stack spacing={2} className="Front-End-Test---Home-view">
            <Pagination
              count={pages.nbPages}
              variant="outlined"
              shape="rounded"
              onChange={handleChangePage}
            />
          </Stack>
        </Container>
      </div>
    </>
  );
}

export default HackerNews;
