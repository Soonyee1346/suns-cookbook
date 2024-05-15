import '../css/Home.css';
import PriceTable from '../components/PriceTable.js';

function Home() {
    const spaghetti = {
        name: "Spaghetti"
    }
    const recipeArr = [spaghetti]
    return (
        <>  
            <h1 className="bold">Most Discounted Meals This Week</h1>
            <div class="homefood left">
                <PriceTable recipe={recipeArr[0]}/>
            </div>
        </>
    )
  }

  export default Home;