import { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function Table() {
  const { planets } = useContext(PlanetContext);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {planets.map(((element) => (
            <tr key={ element.name }>
              <td>{ element.name }</td>
              <td>{ element.rotation_period }</td>
              <td>{ element.orbital_period }</td>
              <td>{ element.diameter }</td>
              <td>{ element.cliamte }</td>
              <td>{ element.gravity }</td>
              <td>{ element.terrain }</td>
              <td>{ element.surface_water }</td>
              <td>{ element.population }</td>
              <td>{ element.films }</td>
              <td>{ element.created }</td>
              <td>{ element.edited }</td>
              <td>{ element.url }</td>
            </tr>
          )))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;