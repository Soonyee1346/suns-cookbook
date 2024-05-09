import '../css/Home.css';
import PriceTable from '../components/PriceTable.js';

function Home() {
    return (
        <>  
            <h1 className="bold">Most Discounted Meals This Week</h1>
            <div class="homefood left">
                <PriceTable />
            </div>
        </>
    )
  }

  export default Home;