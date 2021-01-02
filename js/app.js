// Vue.js
var app = new Vue({
    el: '#app',
    data: {
        api: {
            url: 'https://5ee78effffee0c0016a1248e.mockapi.io/api/v1/lizzy',
        },
        result: null,
        modal: {},
        toast: {
            el: null,
            msg: '',
            class: ''
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

                self.result = json.data;

                const storedAvatar = localStorage.getItem('avatar');

                if (storedAvatar) {
                    console.log('Stored avatar:', storedAvatar);

                    self.result.player.avatar = storedAvatar;
                }
            });
        },
        openAvatarModal: function (e) {
            console.log('Avatar modal opened:', e);

            this.modal = new bootstrap.Modal(document.getElementById('modalAvatar'), {
                keyboard: false
            });
            this.modal.show();
        },
        changeAvatar: function (e) {
            console.log('Change avatar action:', e);

            e.preventDefault();

            var self = this;

            const avatarFile = avatarInput.files[0];

            console.log('Avatar input file:', avatarFile);

            if (avatarFile.type.includes('image/')) {
                const form = new FormData(e.target);

                fetch('./server/AvatarUpload.php', {
                    method: 'POST',
                    body: form
                })
                .then(function(response) {
                    console.log('Avatar upload response:', response);

                    return response.json();
                })
                .then(function(avatar) {
                    console.log('Avatar uploaded:', avatar);

                    const url = `./uploads/avatars/${avatar.name}`;

                    self.result.player.avatar = url;

                    localStorage.setItem('avatar', self.result.player.avatar);

                    self.modal.hide();

                    self.toast.msg = 'Avatar alterado com sucesso!';
                    self.toast.class= 'btn-success'; 
                });
            }
            else {
                self.toast.msg = 'Tipo de arquivo inválido!';
                self.toast.class= 'btn-warning';
            }

            self.toast.el = new bootstrap.Toast(document.getElementById('toast'));
            self.toast.el.show();

            e.target.reset();
        },
        toggleBanned: function (e) {
            console.log('Toggle banned action:', e);

            e.target.classList.toggle('active');

            document.getElementsByClassName('banned')[0].classList.toggle('d-none');
        }
    }
})