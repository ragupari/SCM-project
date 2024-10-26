import NavBar from '../components/NavBar';
import DisplayCard from '../components/PageTitleCard'; 
import SearchBar from '../components/SearchBar';
import AllCategoryCards from '../components/AllCategoryCards';

import '../components/Style.css';

const Home = ({user}) => {
    return (

      <div>
        <NavBar currentPage={'Home'} />
        <DisplayCard title = "Welcome" />
        <SearchBar />
        <AllCategoryCards />
      </div>

    );
  };
export default Home;
