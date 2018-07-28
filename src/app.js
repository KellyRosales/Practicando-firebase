const btnLogout = document.getElementById('btnLogout')
const btnSignin = document.getElementById("btnSignin");
const register = document.getElementById("register")
const email = document.getElementById("email")
const password = document.getElementById("password")
const logout = document.getElementById('logout')
const btnGoogle= document.getElementById('btnGoogle')
// EL boton register debe tomar el valor de password y email para 
//crear el usuario en firebase.


// cada vez que se recargue,
//esta función guarda tu sesión.
window.onload = () => {
    firebase.auth().onAuthStateChanged((user)=>{
        if (user) {
            login.classList.remove('hiden');
            logout.classList.add('hiden');
            console.log('inicio sesion logueado')
        } else {
            login.classList.add('hiden');
            logout.classList.remove('hiden');
            console.log('No está logueado');
        }
    });
}

// REGISTRA USUARIOS NUEVOS
register.addEventListener('click', () => {
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then(() => {
            console.log("se creo el usuario")
        })
        .catch((error) => {
            console.log(error.code, error.message)
        });
})

// ACCESO DE USUARIOS EXISTENTES
btnSignin.addEventListener('click', () => {
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then(() => {
            console.log('inicia sesión primera vez')
        })
        .catch((error) => {
            console.log(error.code, error.message)
        });

})

//ACCEDIENDO A LA WEB 
btnLogout.addEventListener('click',()=>{
    firebase.auth().signOut()
    .then( ()=>{
        console.log('cerrar sesión');
        login.classList.remove('hiden');
        logout.classList.add('hiden');
    })
    .catch((error)=>{
        console.log('error a cerrar sesión');
    })
})

//Google
btnGoogle.addEventListener('click', ()=>{
    var provider = new firebase.auth.GoogleAuthProvider();
   
    firebase.auth().signInWithPopup(provider)
    .then((result)=> {
        console.log('sesion con google')
        var token = result.credential.accessToken;
        var user = result.user;
        // ...
      }).catch((error) =>{
        // Handle Errors here.
        console.log( error.code);
        console.log(error.message);
        // The email of the user's account used.
        console.log( error.email);
        // The firebase.auth.AuthCredential type that was used.
        console.log( error.credential);
        // ...
      });

})