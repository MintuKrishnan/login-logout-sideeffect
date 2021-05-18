const states = [
  {
    email: {
      value: 'aaa',
      isValid: 'haii',
    },
  },
  {
    password: {
      value: '',
      isValid: null,
    },
  },
];

const { isValid: emailIsValid } = states[0].email;

console.log(states[0].email.value);
