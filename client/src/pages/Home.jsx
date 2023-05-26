import React from "react";

import Card from "../components/Card";

const Home = () => {
  return (
    <>
      <h1>Smart Jail System 1.0.0</h1>
      <section className="cards">
        <Card title="Alarms" />
        <Card title="Prisoners" />
      </section>
    </>
  );
};

export default Home;
