// Vue.js
var app = new Vue({
    el: '#app',
    data: {
        api: {
            url: 'https://5ee78effffee0c0016a1248e.mockapi.io/api/v1/lizzy',
        },
        anticheat: {},
        config: {},
        featuredMedal: {},
        lobby: {},
        player: {},
        ranked: {},
        reports: {},
        tournaments: {},
        ranks: [
            {
                name: 'Casual',
                minScore: 0,
                maxScore: 25
            },
            {
                name: 'Competitivo',
                minScore: 26,
                maxScore: 50
            },
            {
                name: 'Amador',
                minScore: 51,
                maxScore: 75
            },
            {
                name: 'Pro',
                minScore: 76,
                maxScore: 100
            }
        ],
        modal: {},
        toast: {
            el: null,
            msg: ''
        }
    },
    created() {
        console.log('Vue created !');

        this.login();
    },
    mounted: function () {
        console.log('Vue mounted !');

        document.getElementsByTagName('body')[0].classList.remove('d-none');
    },
    beforeUpdate() {
        console.log('Vue updating...');
    },
    updated() {
        console.log('Vue updated !');
    },
    methods: {
        login: function () {
            var self = this;

            fetch(self.api.url)
            .then(function(response) {
                console.log('API fetch response:', response);

                return response.json();
            })
            .then(function(json) {
                console.log('API fetch json:', json);

                self.anticheat = json.data.anticheat;
                self.config = json.data.config;
                self.featuredMedal = json.data.featuredMedal;
                self.lobby = json.data.lobby;
                self.player = json.data.player;
                self.ranked = json.data.ranked;
                self.reports = json.data.reports;
                self.tournaments = json.data.tournaments;
            });
        },
        openAvatarModal: function (e) {
            this.modal = new bootstrap.Modal(document.getElementById('modalAvatar'), {
                keyboard: false
            });
            this.modal.show();
        },
        changeAvatar: function (e) {
            e.preventDefault();

            const url = URL.createObjectURL(avatarInput.files[0]);

            this.player.avatar = url;

            this.modal.hide();

            this.toast.el = new bootstrap.Toast(document.getElementById('toast'));
            this.toast.msg = 'Avatar alterado com sucesso!';
            this.toast.el.show();

            e.target.reset();
        },
        toggleBanned: function (e) {
            e.target.classList.toggle('active');

            document.getElementsByClassName('banned')[0].classList.toggle('d-none');
        }
    }
})