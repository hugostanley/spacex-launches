import { useEffect, useState } from 'react';
import { QUERY } from './constants/api';
import './App.css'
import LaunchItem from './LaunchItem';
import { MoonLoader } from 'react-spinners'

function App() {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [input, setInput] = useState('')
  const [offset, setOffset] = useState(0);
  const limit = 10;

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(QUERY, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            options: {
              offset,
              limit
            }
          })
        });
        const json = await res.json();
        setLaunches([...launches, ...json.docs]);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    })()
  }, [offset]);


  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setOffset(offset + limit);
    }
  }

  const filteredList = launches.filter(item => {
    return item.name.toString().toLowerCase().includes(input.toLowerCase());
  })
  return (
    <div className='main'>
      <h1 className='page-title'>SpaceX Launches</h1>
      {error && <p>{error.message}</p>}
      <input className='search-input' value={input} onChange={handleChange} placeholder='Enter keywords' />
      <div className='lists-outer-con'>
        <div className='lists' onScroll={handleScroll}>
          {filteredList.map((launch) => (
            <LaunchItem
              article={launch.links.article}
              details={launch.details}
              imgsrc={launch.links.patch.small}
              missionName={launch.name}
              flightNumber={launch.flight_number}
              launchYear={new Date(launch.date_local).getFullYear()} />
          ))}
          <div className='spinner'>
            <MoonLoader
              loading={loading}
              color="black"
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App
