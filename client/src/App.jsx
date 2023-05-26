import "./App.css";
import Card from "./components/Card/Card";

const App = () => {
  return (
    <div className="App">
      <h1>Smart Jail System 1.0.0</h1>
      <section>
        <div className="card">
          <div className="card-header">
            <Card title="Alerts" />
            <Card title="Prisoners" />
          </div>
          <div className="card-body"></div>
        </div>
      </section>
    </div>
  );
};

export default App;
