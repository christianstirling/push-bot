import "./ImpactGraph.css";

export default function ImpactGraph({ name, value }) {
  return (
    <div className="ImpactGraph">
      <h1>Graph</h1>
      <h1>Name of the highest impact input: {name}</h1>
      <h1>Value of the highest impact input: {value}</h1>
    </div>
  );
}
