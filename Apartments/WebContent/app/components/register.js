/**
 * Settings for toastr.
 */
toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

Vue.component("app-register", {
    data() {
        return {
            newUser: {},
            errors: [],
            message: null,
            rePassword: ''
        }
    },
    template: `
    <div class ="forica">

        <form id='register-form' @submit="checkRegistration" method='post'>

            <input type="text" v-model="newUser.userName" placeholder="Username" required>
            <input type="text" v-model="newUser.name" placeholder="Name" >
            <input type="text" v-model="newUser.surname" placeholder="Surname">
            <input type="password" v-model="newUser.password" placeholder="Password" required>
            <input type="password" v-model="rePassword" placeholder="Re Password" required>

            <br><br>
            <button type='submit' class="btn"><i class="fa fa-sign-in" aria-hidden="true"></i> REGISTER </button>
  
        </form>

    </div>
    
    `,
    methods: {
        checkRegistration: function (event) {
            /* Prevent submit if we have errors ! */
            event.preventDefault();

            /**
             * Save errors, and make notification from him.
             */
            this.errors = [];


            /**
             * VALIDATION for frontend !
             * TODO: Make better validation!
             */
            if (!this.newUser.userName) {
                this.errors.push('Field user name is required!');
            }

            if (!this.newUser.password) {
                this.errors.push('Field password is required!');
            }

            if (!this.newUser.name) {
                this.errors.push('Field name is required!');
            }

            if (!this.newUser.surname) {
                this.errors.push('Field surname is required!');
            }

            if(this.rePassword != this.newUser.password){
                this.errors.push('Password & re-password must be same!')
            }

            if (!this.errors.length) {
                axios
                    .post('rest/users/registration', {
                        "username": this.newUser.userName,
                        "password": this.newUser.password,
                        "name": this.newUser.name,
                        "surname": this.newUser.surname,
                        "role": "GUEST"
                    })
                    .then(response => {
                        this.message = response.data;
                        console.log("\n\n ------- PODACI -------\n");
                        console.log(response.data);
                        toastr["success"]("Let's go, Log in !!", "Success registration!");
                        console.log("\n\n ----------------------\n\n");
                        //TODO 10: Napraviti bolju resenje od ovoga, jer je ovo bas HC redirektovanje na login.
                        /**
                         * Opis problema:
                         * Kada se aktivira ovaj zahtev ka bekendu,
                         * pri povratku, bi trebao da nastavi dalje
                         * jer je uspesan, ali zbog event.preventDefault();
                         * koji nam je na ovoj formi, on ostaje na istoj stranici
                         * sto je okej kada je u pitanju greska, ali kada
                         * je uspesno registrovanje, trebalo bi da nekako
                         * deaktiviramo taj prevend default.
                         * 
                         * Posto nisam nasao drugacije resenje od predloga na Stacku
                         * no da simuliram klik misa, simuliram ga i vodim na stranicu
                         * logina.
                         * 
                         * Drugo pitanje je, kako iscitati onu poruku sto smo
                         * nakacili na Responsu[na bekendu kao povratnu vrednost].
                         * Kako bi onda mogli da je ispisemo ovde.
                         * 
                         * author: Vaxi
                         */

                        location.href = response.data; // we get from backend redirection to login with this
                    })
                    .catch(err => {
                        console.log("\n\n ------- ERROR -------\n");
                        console.log(err);
                        toastr["error"]("We have alredy user with same username, try another one", "Fail");
                        console.log("\n\n ----------------------\n\n");
                    })
                return true;
            }

            /**
             * For each error, push notification to user, to inform him about it.
             */
            this.errors.forEach(element => {
                console.log(element)
                toastr["error"](element, "Fail")
            });



        }

    },
    mounted() {
        axios.get('rest/users/getNewUser').then(response => (this.newUser = response.data));
    },

});
