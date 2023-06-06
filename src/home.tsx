import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
          <h1 className="flex justify-center text-5xl text-blue-400">ホーム画面</h1>
          <div className="text-lg">
            ●Todo画面は<span className="underline decoration-double decoration-blue-500"><Link to={'/todolist/'}>こちら</Link></span>
          </div>
        </>
    );
};

export default Home;
