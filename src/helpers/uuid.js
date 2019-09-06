import uuidv1 from 'uuid/v4';


export function genereteId() {
  const id = uuidv1();
  return id;
}