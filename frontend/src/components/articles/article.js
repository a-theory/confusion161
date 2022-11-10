import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {sendGetOne} from "../../redux/modules/articles";
import {useParams} from "react-router-dom";
import {useWindowDimensions} from "../../utils/windowDimensions";

function Home() {
    const articles = useSelector(state => state.articles);
    const dispatch = useDispatch();
    const id = useParams().id;
    const { width } = useWindowDimensions();

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
                __html: articles?.html
            }}>
        </div>
    )
}

export default Home;
