import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {sendGetOne} from "../../redux/modules/articles";
import {useParams} from "react-router-dom";

function Home() {
    const articles = useSelector(state => state.articles);
    const dispatch = useDispatch();
    const id = useParams().id;

    useEffect(() => {
        dispatch(sendGetOne({query: {id}}))
    },[])

    return (
        <div
            dangerouslySetInnerHTML={{
                __html: articles?.html
            }}>
        </div>
    )
}

export default Home;
