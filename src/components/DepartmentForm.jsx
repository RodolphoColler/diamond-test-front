import { useState } from "react";
import { validateDepartment } from "../utils/validations";
import { createDepartment } from "../utils/requests";
import PropTypes from 'prop-types';
import FormError from "./FormError";

function DepartmentForm({ setShouldRecallApi }) {
  const [department, setDepartment] = useState('');
  const [formError, setFormError] = useState('');
  

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      validateDepartment(department);

      await createDepartment({ name: department });

      setShouldRecallApi(prev => !prev);
    } catch (error) {
      setFormError(error.message);
    }
  }
  

  return (
    <>
      <form onSubmit={ handleSubmit } className="department-form">

        <label>
          Departamento: <input value={department} onChange={e => setDepartment(e.target.value)} />
        </label>

        <FormError error={ formError } />

        <button type="submit" className="submit-button">Concluido</button>
      </form>
    </>
  )
}

DepartmentForm.propTypes = {
  setShouldRecallApi: PropTypes.func.isRequired,
};

export default DepartmentForm;