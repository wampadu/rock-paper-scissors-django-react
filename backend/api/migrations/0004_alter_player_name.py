# Generated by Django 4.1.3 on 2022-12-05 14:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_player_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='player',
            name='name',
            field=models.CharField(default='Anonymous195', max_length=180),
        ),
    ]