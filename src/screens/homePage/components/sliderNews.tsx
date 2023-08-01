import React, {FC} from 'react';
import styles from "../style.module.css";
import Slider from "react-slick";
import {Box} from "@mui/material";
import {NewsItem} from "../../../types/NewsItemProps";

interface SliderNewsProps {
    news: NewsItem[];
    theme: string;
}

const SliderNews: FC<SliderNewsProps> = (props) => {
    const {news, theme} = props;

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <Box className={styles.sliderNews}>
            <Slider {...settings}>
                {news.map((newsItem, index) => (
                    <Box className={styles.sliderNews} key={index}>
                        <Box className={styles.news}>
                            <Box
                                className={`${styles.titleAndDescription} ${
                                    theme === "light"
                                        ? styles.titleAndDescriptionLight
                                        : styles.titleAndDescriptionDark
                                }`}
                            >
                                <h3>{newsItem.title}</h3>
                                <p>{newsItem.description}</p>
                            </Box>
                            <img
                                style={{width: "500px", height: "295px"}}
                                src={newsItem.urlToImage}
                                alt={newsItem.title}
                            />
                        </Box>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default SliderNews;