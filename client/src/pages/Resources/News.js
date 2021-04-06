import React, { useState, useEffect } from 'react';
import style from './News.module.css';
import axios from 'axios';
import { Card, Container, Col } from 'bootstrap-4-react';
import { Link } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';
import Footer from '../../components/Footer/Footer';
import { rapidKey } from '../../rapidKey.json';
const News = (props) => {
    const [newsList, setNewsList] = useState('');

    const fetchData = () => {
        const options = {
            method: 'GET',
            url: 'https://bing-news-search1.p.rapidapi.com/news/search',
            params: {
                q: 'plastic africa',
                // && 'recycling nigeria',
                freshness: 'Week',
                textFormat: 'Raw',
                safeSearch: 'Off',
                count: 50,
                offset: 0,
                // mkt: 'en-ZA',
            },
            headers: {
                'x-bingapis-sdk': 'true',
                'x-rapidapi-key': rapidKey,
                'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
                'X-Frame': 'SAMEORIGIN',
            },
        };

        axios
            .request(options)
            .then(function (response) {
                // console.log(response.data);
                setNewsList(response.data.value);
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    console.log('newsList', newsList);

    const displayNews = (newsArr) => {
        return newsArr.map((news) => {
            return (
                <Card
                    key={news.url}
                    style={{ width: '18rem', margin: '10% 0' }}
                >
                    {news.image && (
                        <img
                            src={news.image.thumbnail.contentUrl}
                            style={{ maxHeight: '15rem', objectFit: 'contain' }}
                            alt="article-img"
                        />
                    )}
                    <Card.Body>
                        <Card.Title>{news.name}</Card.Title>
                        <Card.Text>{news.description}</Card.Text>
                        <Link
                            to={{
                                pathname: '/resources/website',
                                state: {
                                    url: news.url,
                                    title: news.name,
                                },
                            }}
                        >
                            Read Article
                        </Link>
                    </Card.Body>
                </Card>
            );
        });
    };

    if (!newsList) return <Spinner />;
    return (
        <div className={style.News}>
            <Container fluid={true}>
                <Col className="justify-content-around">
                    {displayNews([...newsList])}
                </Col>
            </Container>
            <Footer />
        </div>
    );
};

export default News;