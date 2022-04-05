import { useState, useCallback, useEffect } from "react";
import axios from "axios";

function Fib() {
  const [values, setValues] = useState({});
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [index, setIndex] = useState("");

  const fetchValues = useCallback(async () => {
    const values = await axios.get("/api/values/current");
    setValues(values.data);
  }, []);

  const fetchIndexes = useCallback(async () => {
    const seenIndexes = await axios.get("/api/values/all");
    setSeenIndexes(seenIndexes.data);
  }, []);

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, [fetchValues, fetchIndexes]);

  const displaySeenIndexes = () => {
    return seenIndexes.map(({ number }) => number).join(", ");
  };

  const displayCalculatedValues = () => {
    return Object.keys(values).map((key) => (
      <div key={key}>
        For index {key} I calculated {values[key]}
      </div>
    ));
  };

  const handleInput = (e) => {
    setIndex(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("/api/values", {
      index,
    });

    fetchValues();
    fetchIndexes();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index</label>
        <input value={index} onChange={handleInput} />
        <button>Submit</button>
      </form>
      <h3>Indexes I have seen:</h3>
      {displaySeenIndexes()}
      <h3>Calculated Values:</h3>
      {displayCalculatedValues()}
    </div>
  );
}

export default Fib;
