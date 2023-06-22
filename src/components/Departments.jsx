import { useEffect, useState } from "react";
import { getDepartments } from "../utils/requests";
import PropTypes from 'prop-types';

function Departments({ shouldRecallApi }) {
  const [departments, setDepartments] = useState([]);

  useEffect(() => { getDepartments().then((data) => setDepartments(data)); }, [shouldRecallApi])

  return (
    <div className="fetch-wrapper">
      <h1 className="fetch-description">Departamentos cadastrados</h1>

      {
        departments.map(({ id, name }) => (
          <div key={ id } id="department-wrapper">
            <p>{ name }</p>
          </div>
        ))
      }

    </div>
  )
}

Departments.propTypes = {
  shouldRecallApi: PropTypes.func.isRequired,
};


export default Departments;