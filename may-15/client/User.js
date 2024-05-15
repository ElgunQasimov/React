class User{
    constructor(username, email, password, src, role){
        this.username = username;
        this.email = email;
        this.password = password;
        this.src = src;
        this.role = role;
        this.isBanned = false;
        this.banDate = null;
        this.banCount = 0;
        this.favorites = [];
    }
}