import { useEffect, useState } from "react";
import { getUsers } from "../utils/requests";
import PropTypes from 'prop-types';

function Users({ shouldRecallApi }) {
  const [users, setUsers] = useState([]);

  useEffect(() => { getUsers().then((data) => setUsers(data)); }, [shouldRecallApi])

  function dateFormatter(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();

    day = day < 10 ? `0${day}`: day;
    month = month < 10 ? `0${month}`: month;

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  }

  return (
    <div className="fetch-wrapper">
      <h1 className="fetch-description">Usuários cadastrados</h1>

      {
        users.map(({ id, name, phone, gender, birthDate, married, department, comments }) => (
          <div key={ id } id="user-wrapper">
            <h3>{ name }</h3>
            <p>Telefone: { phone }</p>
            <p>Sexo: { gender }</p>
            <p>Data de nascimento: { dateFormatter(new Date(birthDate)) }</p>
            <p>Estado civil: { married ? "Casado(a)" : "Solteiro(a)" }</p>
            <p>Departamento: { department.name }</p>
            <p>Observações: { comments }</p>
          </div>
        ))
      }

    </div>
  )
}

Users.propTypes = {
  shouldRecallApi: PropTypes.func.isRequired,
};

export default Users;