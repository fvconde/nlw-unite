let participantes = [
    {
        nome: "Mayk Brito",
        email: "mayk@gmail.com",
        dataInscricao: new Date(2024, 2, 22, 19, 20),
        dataCheckIn: new Date(2024, 2, 25, 22, 0)
    },
    {
        nome: "Ana Silva",
        email: "ana@gmail.com",
        dataInscricao: new Date(2024, 2, 23, 10, 15),
        dataCheckIn: new Date(2024, 2, 25, 20, 30)
    },
    {
        nome: "João Santos",
        email: "joao@gmail.com",
        dataInscricao: new Date(2024, 2, 24, 15, 45),
        dataCheckIn: new Date(2024, 2, 25, 20, 30)
    },
    {
        nome: "Maria Oliveira",
        email: "maria@gmail.com",
        dataInscricao: new Date(2024, 2, 25, 11, 10),
        dataCheckIn: new Date(2024, 2, 26, 9, 30)
    },
    {
        nome: "Pedro Souza",
        email: "pedro@gmail.com",
        dataInscricao: new Date(2024, 2, 26, 14, 20),
        dataCheckIn: new Date(2024, 2, 27, 8, 0)
    },
    {
        nome: "Lucas Almeida",
        email: "lucas@gmail.com",
        dataInscricao: new Date(2024, 2, 27, 9, 45),
        dataCheckIn: new Date(2024, 2, 25, 20, 30)
    },
    {
        nome: "Carla Lima",
        email: "carla@gmail.com",
        dataInscricao: new Date(2024, 2, 28, 16, 30),
        dataCheckIn: new Date(2024, 3, 1, 10, 15)
    },
    {
        nome: "Rafaela Costa",
        email: "rafaela@gmail.com",
        dataInscricao: new Date(2024, 2, 29, 8, 0),
        dataCheckIn: new Date(2024, 3, 2, 12, 45)
    },
    {
        nome: "Marcos Santos",
        email: "marcos@gmail.com",
        dataInscricao: new Date(2024, 2, 30, 13, 20),
        dataCheckIn: new Date(2024, 2, 25, 20, 30)
    },
    {
        nome: "Fernanda Oliveira",
        email: "fernanda@gmail.com",
        dataInscricao: new Date(2024, 2, 31, 17, 10),
        dataCheckIn: new Date(2024, 2, 25, 20, 30)
    }
];

const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
    let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

    if(participante.dataCheckIn == null) {
      dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
      `
    }

    return `
    <tr>
        <td>
            <strong>
                ${participante.nome}
            </strong>
            <br>
            <small>
                ${participante.email}
            <small>
        </td>
        <td>${dataInscricao}</td>
        <td>${dataCheckIn}</td>
    </tr>
    `
}

const atualizarLista = (participantes) => {
    let output = ""
    for(let participante of participantes) {
        output += criarNovoParticipante(participante)
    }
    document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  //verificar se o participante ja existe
  const participanteExiste = participantes.find(
    (p) => 
      p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email já cadastrado')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // limpar o formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  // encontrar o participante dentro da lista
  const participante = participantes.find((p) => p.email == participante.email)
  // atualizar o check-in do participante
  participante.dataCheckIn = new Date()
  // atualizar a lista de participante
  atualizarLista(participantes)
}