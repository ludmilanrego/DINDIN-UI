import axios from 'axios';


// Para API da Cubos
// export default axios.create({
//   baseURL: 'https://desafio-backend-03-dindin.pedagogico.cubos.academy',
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })

// Para API da Dupla
export default axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})