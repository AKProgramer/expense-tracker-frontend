
import StatCards from "../components/StatCards"; // Correct path for StatCards component
import RecentExpenses from "../components/RecentExpenses"; // Correct path for GroupDetailsTable component
import PersonalInformation from "../components/PersonalInformation";
import Nav from "../components/Nav";
import CardSwiper from "../components/CardSwiper";


const Home = () => {
  return (
    <div className="p-4 min-h-screen">
      <div className="row my-4 mt-5 mx-0 gap-4 justify-between">
      <StatCards />
      <CardSwiper/>
      </div>
      <div className="row mx-0 my-4 gap-4 justify-between">
      <PersonalInformation/>
      <RecentExpenses />
      </div>
      <Nav />
    </div>
  );
};

export default Home;
