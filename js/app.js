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
        tournaments: {}
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
        toggleBanned: function () {
            document.getElementsByClassName('banned')[0].classList.toggle('d-none');
        }
    }
})