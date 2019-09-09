import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "../Component/Loader";
import { moviesApi, tvApi } from "../api";
import ReactTooltip from "react-tooltip";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 30px 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(2px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  position: relative;
  z-index: 1;
`;

const Cover = styled.div`
  margin-top: 5px;
  width: 34%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 2px;
`;

const Data = styled.div`
  width: 66%;
  margin-left: 30px;
`;

const Title = styled.span`
  margin-right: 20px;
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 80%;
`;

const ContainerTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

const CompanyContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 85px;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
`;

const Companies = styled.img`
  background-color: rgba(100, 100, 100, 0.4);
  border-radius: 2px;
  z-index: 10;
  padding: 5px;
  box-shadow: 0px 1px 5px 2px rgba(20, 20, 20, 0.2);
  margin-left: 5px;
  display: inline-block;
  width: auto;
  height: 58px;
  background-size: cover;
`;

const VideoContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 110px;
`;

const VideoGrid = styled.div`
  display: relative;
  width: auto;
  height: 100px;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
`;
const Video = styled.div`
  display: inline-block;
  margin: 0 5px;
`;
const VideoThumb = styled.img`
  background-color: rgba(100, 100, 100, 0.4);
  border-radius: 2px;
  z-index: 10;
  padding: 5px;
  box-shadow: 0px 1px 5px 2px rgba(20, 20, 20, 0.2);
  display: inline-block;
  width: 150px;
  height: 90px;
  background-size: cover;
`;

const SeriesContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 130px;
`;

const SeriesGrid = styled.div`
  display: relative;
  width: auto;
  height: 150px;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
`;
const Series = styled.div`
  display: inline-block;
  margin: 0 5px;
`;
const SeriesPoster = styled.img`
  background-color: rgba(100, 100, 100, 0.4);
  border-radius: 2px;
  z-index: 10;
  padding: 5px;
  box-shadow: 0px 1px 5px 2px rgba(20, 20, 20, 0.2);
  display: inline-block;
  width: 100px;
  height: 130px;
  background-size: cover;
`;
const SeriesName = styled.div`
  text-align: center;
  opacity: 0.7;
`;

const Detail = props => {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    location: { pathname },
  } = props;
  const isMovie = pathname.includes("/movie/");

  useEffect(() => {
    const getResult = async () => {
      const {
        match: {
          params: { id },
        },
        history: { push },
      } = props;
      const parsedId = parseInt(id);
      if (isNaN(parsedId)) {
        return push("/");
      }
      let result = null;
      try {
        if (isMovie) {
          ({ data: result } = await moviesApi.movieDetail(parsedId));
        } else {
          ({ data: result } = await tvApi.tvDetail(parsedId));
        }
        setResult(result);
        console.log(result);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    getResult();
  }, []);

  return loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          {isMovie && (
            <Item>
              <a
                href={`https://www.imdb.com/title/${result.imdb_id}/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://m.media-amazon.com/images/G/01/imdb/images/plugins/imdb_46x22-2264473254._CB470047279_.png"
                  alt="IMDB"
                />
              </a>
            </Item>
          )}
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            {(result.runtime || result.episode_run_time) && (
              <>
                <Divider>∙</Divider>
                <Item>
                  {result.runtime ? result.runtime : result.episode_run_time[0]}{" "}
                  min
                </Item>
              </>
            )}
            <Divider>∙</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `,
                )}
            </Item>
            {isMovie && (
              <>
                <Divider>∙</Divider>
                <Item>
                  {result.production_countries &&
                    result.production_countries.map((country, index) =>
                      index === result.production_countries.length - 1
                        ? country.name
                        : `${country.name} / `,
                    )}
                </Item>
              </>
            )}
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          {result.production_companies.length !== 0 && (
            <CompanyContainer>
              <ContainerTitle>Production Company</ContainerTitle>
              {result.production_companies.map((company, index) => (
                <Companies
                  key={index}
                  src={
                    company.logo_path
                      ? `https://image.tmdb.org/t/p/original${company.logo_path}`
                      : require("../assets/noPosterSmall.png")
                  }
                  alt={company.name}
                  data-tip={company.name}
                />
              ))}
            </CompanyContainer>
          )}
          {result.videos.results.length !== 0 && (
            <VideoContainer>
              <ContainerTitle>Youtube Videos</ContainerTitle>
              <VideoGrid>
                {result.videos.results &&
                  result.videos.results.map((video, index) => (
                    <Video key={index}>
                      <a
                        href={`https://youtube.com/watch?v=${video.key}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <VideoThumb
                          src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
                          alt={video.name}
                          data-tip={video.name}
                        />
                        <ReactTooltip />
                      </a>
                    </Video>
                  ))}
              </VideoGrid>
            </VideoContainer>
          )}
          {isMovie
            ? result.belongs_to_collection !== null && (
                <SeriesContainer>
                  <ContainerTitle>Collection</ContainerTitle>
                  <SeriesGrid>
                    <Series>
                      <SeriesPoster
                        src={
                          result.belongs_to_collection.poster_path
                            ? `https://image.tmdb.org/t/p/original${result.belongs_to_collection.poster_path}`
                            : require("../assets/noPosterSmall.png")
                        }
                        alt={result.belongs_to_collection.name}
                      />
                      <SeriesName>
                        {result.belongs_to_collection.name}
                      </SeriesName>
                    </Series>
                  </SeriesGrid>
                </SeriesContainer>
              )
            : result.seasons.length !== 0 && (
                <SeriesContainer>
                  <ContainerTitle>Series</ContainerTitle>
                  <SeriesGrid>
                    {result.seasons &&
                      result.seasons.map((season, index) => (
                        <Series key={index}>
                          <SeriesPoster
                            src={
                              season.poster_path
                                ? `https://image.tmdb.org/t/p/original${season.poster_path}`
                                : require("../assets/noPosterSmall.png")
                            }
                            alt={season.name}
                          />
                          <SeriesName>{season.name}</SeriesName>
                        </Series>
                      ))}
                  </SeriesGrid>
                </SeriesContainer>
              )}
        </Data>
      </Content>
    </Container>
  );
};

export default Detail;
