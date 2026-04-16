export interface User {
  id: number;
  name: string;
  location: string;
  role: string
}

export const getUserAction = async (id: number) => {
  console.log('funcion llamada');
  await new Promise ((res) => setTimeout(res, 2000));
  console.log('funcion resolvio');


  return {
    id: id,
    name: 'Jesus Marquez',
    location: 'London, Canada',
    role: 'Softwware trainer'
  }
}