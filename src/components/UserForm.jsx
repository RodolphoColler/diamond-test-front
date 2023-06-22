import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { validateUser } from "../utils/validations";
import FormError from "./FormError";
import 'dayjs/locale/pt-br';
import { createUser, getDepartments } from "../utils/requests";
import PropTypes from 'prop-types';

function UserForm({ setShouldRecallApi }) {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('Masculino');
  const [birthDate, setBirthDate] = useState(dayjs('2023-01-01'));
  const [isMarried, setIsMarried] = useState(false);
  const [department, setDepartment] = useState(0);
  const [fetchedDepartments, setFetchedDepartments] = useState([]);
  const [comments, setComments] = useState('');
  const [formError, setFormError] = useState('');

  function phoneMascara(string) {
    const phone = string
      .replace(/\D/g,'')
      .replace(/(\d{2})(\d)/,"($1) $2")
      .replace(/(\d)(\d{4})$/,"$1-$2")

    setPhoneNumber(phone);
  }

  useEffect(() => {
    getDepartments().then((data) => { setFetchedDepartments(data); setDepartment(data[0].id); } );
  }, []);

  useEffect(() => { setFormError(''); }, [ name, phoneNumber, comments ]);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      validateUser(name, phoneNumber, comments);

      const user = { 
        name, 
        phone: phoneNumber, 
        gender, 
        birthDate,
        married: Boolean(isMarried),
        departmentId: Number(department),
        comments
      }

      await createUser(user);

      setShouldRecallApi(prev => !prev);
    } catch (error) {
      setFormError(error.message);
    }
  }

  return (
    <form onSubmit={ handleSubmit }>

      <label>
        Nome: <input value={name} onChange={e => setName(e.target.value)} />
      </label>

      <label>
        Telefone: <input maxLength="15" value={phoneNumber} onChange={e => phoneMascara(e.target.value)} />
      </label>

      <label>
        Sexo:
        <select
          value={gender}
          onChange={e => setGender(e.target.value)} 
        >
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
        </select>
      </label>

      <label> 
        Data de nascimento:
        <LocalizationProvider dateAdapter={AdapterDayjs}  adapterLocale='pt-br'>
          <DemoContainer components={['DatePicker']} locale='pt'>
            <DatePicker
              slotProps={{ textField: { size: 'small' } }}
              format="DD/MM/YYYY"
              value={birthDate}
              onChange={e => setBirthDate(e)}
              />
          </DemoContainer>
        </LocalizationProvider>
      </label>

      <label>
        Casado: 
        <select
          value={isMarried}
          onChange={e => setIsMarried(e.target.value)} 
        >
          <option value={false}>Não</option>
          <option value={true}>Sim</option>
        </select>
      </label>

      <label>
        Departamento: 
        <select
          value={department}
          onChange={e => setDepartment(e.target.value)} 
        >
          { fetchedDepartments.map(({ id, name }) => <option key={ id } value={ id } >{name}</option> )}
        </select>
      </label>

      <label>
        Observação: <textarea value={comments} onChange={e => setComments(e.target.value)} />
      </label>

      <FormError error={ formError } />
      <button type="submit" className="submit-button">Concluido</button>

    </form>
  )
}

UserForm.propTypes = {
  setShouldRecallApi: PropTypes.func.isRequired,
};

export default UserForm;
