import { LightningElement, track } from 'lwc';

export default class Githubu extends LightningElement {
    @track users;

    connectedCallback() {
        this.fetchUsers();
    }

    fetchUsers() {
        fetch('https://api.github.com/users', {
            headers: {
                'Authorization': 'token YOUR_TOKEN'
            }
        })
        .then(response => response.json())
        .then(data => {
            this.users = data;
        })
        .catch(error => {
            console.log(error);
        });
    }

}