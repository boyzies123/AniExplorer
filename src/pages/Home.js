import Searchbar from '../components/Searchbar';
const Home = () => {
    return (
    
    <div className="App">
        <header className="App-header">
            <h1>AniExplorer</h1>
            <h3>Keep track of your shows the easy way</h3>
            <Searchbar style={{padding:'14px'}}/>
        </header>
        
    </div>
    );
  };
  export default Home;