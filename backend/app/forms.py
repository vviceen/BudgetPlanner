from django import forms


class new_user(forms.Form):
    username = forms.CharField(max_length=20, required=True, label="Username")
    password1 = forms.CharField(max_length=20, required=True, label="Password")
    password2 = forms.CharField(
        max_length=20, required=True, label="Confirm password")


class log_user(forms.Form):
    username = forms.CharField(max_length=20, required=True, label="Username")
    password1 = forms.CharField(max_length=20, required=True, label="Password")
