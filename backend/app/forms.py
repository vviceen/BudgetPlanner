from django import forms


class new_user(forms.Form):
    username = forms.CharField(max_length=20, required=True, label="Username")
    password1 = forms.CharField(
        max_length=20, required=True, label="Password", widget=forms.PasswordInput())
    password2 = forms.CharField(
        max_length=20, required=True, label="Confirm password", widget=forms.PasswordInput())


class add_expense(forms.Form):
    currencies = [
        ('USD', 'U$S'),
        ('UYU', 'U$'),
    ]
    categories = [
        ('1', 'Alimentación'),
        ('2', 'Salud'),
    ]

    amount = forms.IntegerField(required=True, label="Amount")
    description = forms.CharField(required=True, max_length=50, label="Description")
    currency = forms.ChoiceField(choices=currencies, label="Currency")
    category_id = forms.ChoiceField(choices=categories, label="Category")

class log_user(forms.Form):
    username = forms.CharField(max_length=20, required=True, label="Username")
    password1 = forms.CharField(
        max_length=20, required=True, label="Password", widget=forms.PasswordInput())
