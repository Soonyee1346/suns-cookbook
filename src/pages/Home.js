import '../css/Home.css';
import PriceTable from '../components/PriceTable.js';
import { useState, useEffect } from 'react'

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    let shuffleCount = 0;
  
    //We only need the first 3
    while (shuffleCount < 3) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
      shuffleCount++
    }
  
    return array;
}

function Home(props) {
    const [rec1, setRec1] = useState(null)
    const [rec2, setRec2] = useState(null)
    const [rec3, setRec3] = useState(null)
    const length = props.Recipes.length

    useEffect(() => {
        // Create an array of indices [0, 1, 2, ..., length-1]
        const indices = Array.from({ length }, (_, i) => i);
        const shuffledIndices = shuffle(indices);
    
        // Set states based on the shuffled indices
        setRec1(shuffledIndices[0]);
        setRec2(shuffledIndices[1]);
        setRec3(shuffledIndices[2]);
      }, [length]);

    function changeRecipes() {
        var recArr = []
        var same = true;

        var firstRec = Math.floor(Math.random() * length)

        recArr.push(firstRec)

        while(same){
            var secondRec = Math.floor(Math.random() * length)

            if(secondRec !== firstRec){
                recArr.push(secondRec)
                same = false;
            }
        }

        same = true;

        while(same){
            var thirdRec = Math.floor(Math.random() * length)

            if(thirdRec !== firstRec && thirdRec !== secondRec){
                recArr.push(thirdRec)
                same = false;
            }
        }

        setRec1(recArr[0]);
        setRec2(recArr[1]);
        setRec3(recArr[2]);

    }

    if(props.Recipes.length === 0){
        return (
            <>  
                <h1 className="bold">No Recipes In The Book!</h1>
            </>
        )
    }
    else if(props.Recipes.length < 2){
        return (
            <>  
            <h1 className="bold">Suggested Meals This Week</h1>
            <div className="homecontainer">
                <div className="homefood left">
                    <PriceTable recipe={props.Recipes[0]}/>
                </div>
            </div>
            </>
        )
    }
    else if(props.Recipes.length < 3){
        return (
            <>  
            <h1 className="bold">Suggested Meals This Week</h1>
            <div className="homecontainer">
                <div className="homefood left">
                    <PriceTable recipe={props.Recipes[0]}/>
                </div>
                <div className="homefood right">
                    <PriceTable recipe={props.Recipes[1]}/>
                </div>
            </div>
            </>
        )
    }
    else {
        return (
            <>  
                <h1 className="bold">Suggested Meals This Week</h1>
                <button className="refreshHome" onClick={changeRecipes}><i className="fa fa-refresh" aria-hidden="true"></i></button>
                <div className="homecontainer">
                    <div className="homefood left">
                        <PriceTable recipe={props.Recipes[rec1]}/>
                    </div>
                    <div className="homefood right">
                        <PriceTable recipe={props.Recipes[rec2]}/>
                    </div>
                    <div className="homefood left">
                        <PriceTable recipe={props.Recipes[rec3]}/>
                    </div>
                </div>
            
            </>
        )
    }
}

  export default Home;