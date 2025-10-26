export const userData = {
    valid: {
        name: 'João',
        lastName: 'Silva',
        email: 'joao@teste.com',
        phone: '123123123123'
      },
    invalid: {
        name: '',
        lastName: '',
        email: 'joaoteste.com',
        phone: '12123'
    }
}

export const contactUsData = {
  valid: {
    name: 'João da Silva',
    email: 'joao@teste.com',
    subject: 'Reserva de quarto',
    message: 'Gostaria de informações sobre quartos duplos.'
  },
  invalidEmail: {
    name: 'Maria',
    email: 'emailinvalido',
    subject: 'Erro',
    message: 'Mensagem teste com e-mail inválido.'
  },
  emptyName: {
    name: '',
    email: 'teste@teste.com',
    subject: 'Sem nome',
    message: 'Teste sem nome.'
  }
};

export const bookingDates = {
  valid: {
    checkIn: '20/10/2027',
    checkOut: '25/10/2027'
  },
  invalid: {
    checkIn: '25/10/2027',
    checkOut: '20/10/2027'
  },
  //Mudar o numero de noites caso as datas validas de CheckIn e CheckOut forem alteradas
  numberOfNights: {
    single: '£100 x 5 nights',
    double: '£150 x 5 nights',
    suite: '£225 x 5 nights'
  }, 
};

export const invalidPrice = {
  price: '£-460'
};

export const adminCredentials = {
  valid: { username: 'admin', password: 'password' },
  invalid: { username: 'wrong', password: 'wrong' }
};

export const roomInfo = {
    valid:{
        roomNumber: '400',
        Type: 'Single',
        accessible: 'true',
        price: '500',
        roomDetails: {amenities1:'WiFi', amenities2:'Safe'} 
    },
    invalid:{
        roomNumber: '',
        price: '-500',
    }
};
