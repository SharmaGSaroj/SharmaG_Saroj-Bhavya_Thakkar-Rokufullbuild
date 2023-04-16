export default {
    name: 'TheUserComponent',
    props: ['user'],
  
    template: `
      <div @click="navToHome" class="card rounded avatar">
        <div class="card-body text-center">
          <img :src="'images/' + user.avatar" class="rounded-circle img-fluid" alt="user avatar">
          <p>{{user.username}}</p>
        </div>
      </div>
    `,
  
    methods: {
      navToHome() {
        this.$emit('setcurrentuser', this.user);
  
        if (this.user.permission <= 3) {
          this.$router.push({ name: 'kidshome' });
        } else {
          this.$router.push({ name: 'defaulthome' });
        }
      }
    }
  }
  