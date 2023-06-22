export function validateUser(name, phoneNumber, comments) {
  const maxNameLength = 30;
  const maxCommentsLength = 190;
  const minPhoneNumberLength = 15;

  if (!name) throw new Error('Nome é obrigatório.');
  if (name.length > maxNameLength) throw new Error('Nome pode conter somente 30 caracteres.');

  if (!phoneNumber) throw new Error('Telefone é obrigatório.');
  if (Number(phoneNumber.length) < minPhoneNumberLength) throw new Error('Telefone tem que conter 11 digítos.');

  if (!comments) throw new Error('Observações são obrigatórias.');
  if (comments.length > maxCommentsLength) throw new Error('Observações não pode conter somente 190 caracteres.');
}

export function validateDepartment(department) {
  if (!department) throw new Error('Departamento é obrigatório.');
}