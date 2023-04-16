export default{
    name: 'TheRegisterComponent',

    template:`
    <form class="register-form">
    <img src="images/roku.svg" alt="Roku logo" width="90">
    <div>
      <label for="firstName">First Name:</label>
      <input type="text" id="fname" v-model="fname" required>
    </div>
    <div>
      <label for="lastName">Last Name:</label>
      <input type="text" id="lname" v-model="lname" required>
    </div>
    <div>
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" required>
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required>
    </div>
    <div>
  <label for="avatar">Avatar:</label>
  <select id="avatar" v-model="avatar">
    <option value="captain.jpeg">Captain</option>
    <option value="thor.png">Thor</option>
    <option value="ironman.jpeg">IronMan</option>
    <option value="strange.jpg">Dr.Strange</option>
    <option value="hulk.jpeg">Hulk</option>
  </select>
</div>

    <div>
      <label for="permission">Permission:</label>
      <select id="permission" v-model.number="permission">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>
    <button type="submit" @click.prevent="registerUser">Register</button>
  </form>
  

    
    
    `,
    data() {
        return {
          fname: '',
          lname: '',
          username: '',
          password: '',
          avatar: '',
          permission: 1
        }
      },
      methods: {
        registerUser() {
          // validate form fields
          if (this.fname.trim().length === 0) {
            console.log('First name is required.');
            return;
          }
          if (this.lname.trim().length === 0) {
            console.log('Last name is required.');
            return;
          }
          if (this.username.trim().length === 0) {
            console.log('Username is required.');
            return;
          }
          if (this.password.trim().length === 0) {
            console.log('Password is required.');
            return;
          }
      
          // create user object with form data
          const newUser = {
            fname: this.fname,
            lname: this.lname,
            username: this.username,
            password: this.password,
            avatar: this.avatar,
            permission: this.permission
          };
      
          // send user data to server for registration
          fetch('/ums/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
          })
            .then(res => res.json())
            .then(data => {
              console.log(data);
              // handle response from server (e.g. show success message or errors)
              if (data.message === 'success') {
                // redirect user to login page
                setTimeout(() => {
                    this.$router.push({name: 'login'});
                  }, 2000);
              }
            })
            .catch(error => console.error(error));
        }
      }
      

}