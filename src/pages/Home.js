import '../css/Home.css';
import PriceTable from '../components/PriceTable.js';
import { useState } from 'react'

function Home(props) {
    const [rec1, setRec1] = useState(0)
    const [rec2, setRec2] = useState(1)
    const [rec3, setRec3] = useState(2)

    function changeRecipes() {
        var recArr = []
        var same = true;

        var firstRec = Math.floor(Math.random() * props.Data.length)

        recArr.push(firstRec)

        while(same){
            var secondRec = Math.floor(Math.random() * props.Data.length)

            if(secondRec != firstRec){
                recArr.push(secondRec)
                same = false;
            }
        }

        same = true;

        while(same){
            var thirdRec = Math.floor(Math.random() * props.Data.length)

            if(thirdRec != firstRec && thirdRec != secondRec){
                recArr.push(thirdRec)
                same = false;
            }
        }

        setRec1(recArr[0]);
        setRec2(recArr[1]);
        setRec3(recArr[2]);

    }

    return (
        <>  
            <h1 className="bold">Suggested Meals This Week</h1>
            <button className="refreshHome" onClick={changeRecipes}><i class="fa fa-refresh" aria-hidden="true"></i></button>
            <div className="homecontainer">
                <div className="homefood left">
                    <PriceTable recipe={props.Data[rec1]}/>
                </div>
                <div className="homefood right">
                    <PriceTable recipe={props.Data[rec2]}/>
                </div>
                <div className="homefood left">
                    <PriceTable recipe={props.Data[rec3]}/>
                </div>
            </div>
        
        </>
    )
}

  export default Home;