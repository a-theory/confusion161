import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {sendGetOne} from "../../redux/modules/articles";
import {useParams} from "react-router-dom";
import {useWindowDimensions} from "../../utils/windowDimensions";
import DOMPurify from 'dompurify';

function Home() {
    const articles = useSelector(state => state.articles);
    const dispatch = useDispatch();
    const id = useParams().id;
    const { width } = useWindowDimensions();

    const sanitizedHtml=DOMPurify.sanitize(articles?.html)

    const styles = {
        color: "#6d7ab0",
        width: "80%",
        margin: "auto",
        fontSize: "large"
    }

    if (width > 800){
        styles.width = "80%"
    } else {
        styles.width = "95%"
    }

    useEffect(() => {
        dispatch(sendGetOne({query: {id}}))
    },[])

    return (

        <div
            style={styles}
            dangerouslySetInnerHTML={{
                __html: sanitizedHtml
            }}>
        </div>
    )
}

export default Home;
