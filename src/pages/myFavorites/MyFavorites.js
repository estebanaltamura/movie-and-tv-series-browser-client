import { useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IsLoadingContext } from "../../contexts/IsLoadingContextProvider";
import { ContentLikedContext } from "../../contexts/ContentLikedContextProvider";
import { LoginContext } from "../../contexts/LoginContextProvider";
import { v4 as randomId } from 'uuid'
import { Card } from '../../components/card/Card'
import { Spinner } from "../../components/spinner/Spinner";
import "./MyFavorites.css";

export const MyFavorites = () => {
  const { isLoading, setIsLoading } = useContext(IsLoadingContext) 
  const { contentLiked } = useContext(ContentLikedContext)  
  const { token } = useContext(LoginContext)
  const history = useNavigate()

  const imagesLoadedCounter = useRef(0)  

  const imgItemLoadHandler = (event)=>{
    const lengthResults = contentLiked.contentLiked.allFavorites.length    
    const quantityImgsToLoadBeforeIsLoadingFalse = lengthResults >= 6 ? 6 : lengthResults
    const imgClasses = event.target.classList.value
    
    if(imgClasses.includes("cardImg")){
      if(event.target.id <= quantityImgsToLoadBeforeIsLoadingFalse){
        imagesLoadedCounter.current += 1
      }      
    }
    if(imagesLoadedCounter.current === quantityImgsToLoadBeforeIsLoadingFalse){
      imagesLoadedCounter.current = 0      
      setIsLoading(false)
    }
  }

  useEffect(()=>{
    if(contentLiked !== null){
      contentLiked.contentLiked.allFavorites.length === 0 ? setIsLoading(false) :  setIsLoading(true)
    }    
  },[contentLiked])

  useEffect(()=>{
    token === null && history('/movies')
  },[token])
  
  
  useEffect(() => {    
    window.scrollTo(0, 0);          
  }, []);

  return (    
    <>
      <Spinner />
      {
        contentLiked !== null &&
          <>
            {
              (contentLiked.contentLiked.allFavorites.length === 0) &&
                <div className={isLoading === true ? "hidden" : "container containerMoviesAndTvSeriesDashboard"}>
                  <h3 className="alertText">{`No results`}</h3>
                </div>
            } 
  
            {
              (contentLiked.contentLiked.allFavorites.length > 0) &&
                <div className={isLoading === true ? "hidden" : "container containerMoviesAndTvSeriesDashboard"} onLoad={imgItemLoadHandler}>
                  <div className="row rowStyles">
                    {[...contentLiked.contentLiked.allFavorites].reverse().map((content, index) => {
                      return <Card content={content} contentType={'favorites'} key={randomId()} index={index + 1} />;
                    })}
                  </div>
                </div>
            }       
          </>        
      }      
    </>
  );
};