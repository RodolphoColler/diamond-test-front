import PropTypes from 'prop-types';

function SideBar({ setSwitchPage }) {
  return (
    <nav>
      <ul>
        <li>
          <button onClick={ () => setSwitchPage(true)}>Cadastrar departamento</button>
        </li>
        <li>
          <button onClick={ () => setSwitchPage(false)}>Cadastrar usuário</button>
        </li>
      </ul>
    </nav>
  )
}

SideBar.propTypes = {
  setSwitchPage: PropTypes.func.isRequired,
};


export default SideBar;