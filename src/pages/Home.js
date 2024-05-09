import '../css/Home.css';
import PriceTable from '../components/PriceTable.js';

function Home() {
    return (
        <>  
            <h1 className="bold">Most Discounted Meals This Week</h1>
            <div class="homefood left">
                <a class="recipelink" href="Recipes/Spaghetti.html"><img src="images/spaghetti.jpeg"/></a>
                <PriceTable />
            </div>
        </>
    )
  }

  export default Home;