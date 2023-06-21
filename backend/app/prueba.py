import requests

new_user = {
    'username': 'vicente',
    'password1': '123',
    'password2': '123'
}
response = requests.request(
    method="POST", url='http://127.0.0.1:8000/users/register', json=new_user)
