// Login do usuário
const $formLogin = $("#login-form");
$formLogin.on("submit", function(event) {
    event.preventDefault();
    
    const data = {
        email: $("#email").val(),
        password: $("#password").val(),
    };

    console.log(data)
        
    //   $.post("login.php", data, function(data, status) {
    //    console.log(data)
    //   });

    window.localStorage.setItem('username', 'João Victor Cordeiro')

    getAuth()
});

// Retorna a autenticação do usuário
const getAuth = () => {    
    username = window.localStorage.getItem("username")

    if (username != undefined && username != '') {        
        $("#modal-body-logged-in").show()
        $("#username-logged-in").text(username)
        $("#modal-body-logged-out").hide()
        return true
    } else {                
        $("#modal-body-logged-in").hide()
        $("#modal-body-logged-out").show()
        return false
    }    
}