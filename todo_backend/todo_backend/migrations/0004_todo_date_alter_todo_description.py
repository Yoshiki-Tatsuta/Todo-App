# Generated by Django 4.2.1 on 2023-05-30 02:04

from django.db import migrations, models
from django.utils.timezone import now

class Migration(migrations.Migration):

    dependencies = [
        ('todo_backend', '0003_alter_todo_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='date',
            field=models.DateField(),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='todo',
            name='description',
            field=models.TextField(),
        ),
    ]
