import { login } from './utils';
import './index.css';
import { useState } from 'react';

// Instruções:
// * Você tem um formulário de login INCOMPLETO
// * Não é permitido adicionar novos elementos HTML
// * Não é permitido usar refs
//
// Tarefas:
// todo - O botão de login deve disparar a função login(), importada no topo deste arquivo, e passar os dados necessários.
// todo - Desabilite o botão de Login caso o e-mail esteja em branco OU a senha for menor que 6 dígitos.
// todo - Desabilite o botão de Login equanto você está executando o login.
// todo - Mostre uma mensagem de erro de login() caso o Login falhe. A mensagem deve ser limpa a cada nova tentativa de Login.
// todo - Mostre um alerta caso o login seja efetuado com sucesso (javascript alert). Investigue a função login() para entender como ter sucesso na requisição.

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (event)=>{
    const value = event.target.value
    setEmail(value)
  }


  const handlePasswordChange = (event)=>{
    const value = event.target.value
    setPassword(value)
  }
  
  const disableLogin = ()=>{
    if(email === ""|| password.length < 6 || isLoading){
      return true;
    }
    return false
  }

  const onSubmit = async ()=>{
    setErrorMessage("")
    setIsLoading(true)
    const params = {email,password}
    try{
      await login(params)
      alert('Login successful!')
    }catch(error){
      const errorMessage = error.message
      setErrorMessage(errorMessage)
  }finally{
      setIsLoading(false)
  }
}
 
  return (
    <div className='wrapper'>
      <div className='login-form'>
        <h1>Login Form 🐞</h1>
        {/* Coloque a mensagem de erro de login na div abaixo. Mostre a div somente se houver uma mensagem de erro. */}
        <div className='errorMessage'>{errorMessage && (errorMessage)}</div>
        <div className='row'>
          <label htmlFor={'email'}>Email</label>
          <input id={'email'} type={'email'} value={email} onChange={handleEmailChange} autoComplete='off' />
        </div>
        <div className='row'>
          <label htmlFor={'password'}>Password</label>
          <input id={'password'} type={'password'} value={password} onChange={handlePasswordChange} autoComplete='off' />
        </div>

        <div className='button'>
          <button onClick={onSubmit} disabled={disableLogin()}>Login</button>
        </div>
      </div>
    </div>
  );
}
